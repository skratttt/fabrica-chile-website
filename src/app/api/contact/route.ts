import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";
import AutoReplyEmail from "@/emails/AutoReplyEmail";


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { nombre: 100, organizacion: 200, email: 254, servicio: 200, mensaje: 5000 };
const ALLOWED_ORIGINS = ["https://fabricachile.cl", "https://www.fabricachile.cl"];

export async function POST(request: Request) {
    // CSRF: verificar origin
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const body = await request.json();
        const { nombre, organizacion, email, servicio, mensaje } = body;

        if (!nombre || !email || !mensaje) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: "Formato de email inválido" }, { status: 400 });
        }

        if (nombre.length > MAX_LENGTHS.nombre) {
            return NextResponse.json({ error: "Nombre demasiado largo" }, { status: 400 });
        }
        if (email.length > MAX_LENGTHS.email) {
            return NextResponse.json({ error: "Email demasiado largo" }, { status: 400 });
        }
        if (mensaje.length > MAX_LENGTHS.mensaje) {
            return NextResponse.json({ error: "Mensaje demasiado largo" }, { status: 400 });
        }
        if (organizacion && organizacion.length > MAX_LENGTHS.organizacion) {
            return NextResponse.json({ error: "Organización demasiado larga" }, { status: 400 });
        }
        if (servicio && servicio.length > MAX_LENGTHS.servicio) {
            return NextResponse.json({ error: "Servicio demasiado largo" }, { status: 400 });
        }

        // El remitente se configura por variable de entorno para no tocar código.
        // - Dominio NO verificado: usar "onboarding@resend.dev" (solo envía a tu correo de Resend).
        // - Dominio verificado en Resend: cambiar RESEND_FROM_EMAIL a "contacto@fabricachile.cl".
        const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        // Destinatario interno de los avisos (configurable por env).
        const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "contacto@fabricachile.cl";

        // 1. Enviar el correo al equipo (interno)
        const { data: internalEmail, error: internalError } = await resend.emails.send({
            from: `Fabrica Chile Contacto <${senderEmail}>`,
            to: [recipientEmail],
            replyTo: email,
            subject: `Nuevo mensaje de web: ${nombre}`,
            react: ContactEmail({ nombre, organizacion, email, servicio, mensaje }),
        });

        if (internalError) {
            console.error("Error enviando correo interno:", internalError);
            return NextResponse.json({ error: internalError }, { status: 400 });
        }

        // 2. Enviar la autorespuesta al cliente (externo).
        // Nota: solo funcionará con el dominio verificado; con onboarding@resend.dev
        // Resend únicamente permite enviar a tu propio correo de registro.
        let replyEmail = null;
        if (senderEmail !== "onboarding@resend.dev") {
            const { data, error: replyError } = await resend.emails.send({
                from: `Fabrica Chile <${senderEmail}>`,
                to: [email],
                subject: "Hemos recibido tu mensaje",
                react: AutoReplyEmail({ nombre, servicio }),
            });
            replyEmail = data;
            // Aunque la autorespuesta falle, si el correo interno se envió es un éxito parcial
            if (replyError) {
                console.error("Error enviando auto-respuesta:", replyError);
            }
        }

        return NextResponse.json({
            success: true,
            data: { internalEmail, replyEmail },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error en el servidor al enviar correo" },
            { status: 500 }
        );
    }
}
