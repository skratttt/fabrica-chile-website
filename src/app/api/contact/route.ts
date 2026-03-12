import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";
import AutoReplyEmail from "@/emails/AutoReplyEmail";

export const runtime = "edge";

export async function POST(request: Request) {
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

        // Nota: Para que los correos lleguen con el dominio @fabricachile.cl
        // este debe estar verificado en Resend. Si no lo está, los mensajes 
        // solo se pueden enviar desde 'onboarding@resend.dev' a tu correo registrado.
        const senderEmail = "onboarding@resend.dev";
        // const senderEmail = "contacto@fabricachile.cl"; // Usar esto cuando el dominio esté verificado

        // 1. Enviar el correo al equipo (interno)
        const { data: internalEmail, error: internalError } = await resend.emails.send({
            from: `Fabrica Chile Contacto <${senderEmail}>`,
            to: ["contacto@fabricachile.cl"], // Modificar con el correo que debe recibir los avisos
            subject: `Nuevo mensaje de web: ${nombre}`,
            react: ContactEmail({ nombre, organizacion, email, servicio, mensaje }),
        });

        if (internalError) {
            return NextResponse.json({ error: internalError }, { status: 400 });
        }

        // 2. Enviar la autorespuesta al cliente (externo)
        const { data: replyEmail, error: replyError } = await resend.emails.send({
            from: `Fabrica Chile <${senderEmail}>`,
            to: [email],
            subject: "Hemos recibido tu mensaje",
            react: AutoReplyEmail({ nombre, servicio }),
        });

        // Aunque la autorespuesta falle, si el correo interno se envió es un éxito parcial
        if (replyError) {
            console.error("Error enviando auto-respuesta:", replyError);
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
