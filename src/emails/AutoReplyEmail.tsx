import * as React from "react";
import {
    Html,
    Body,
    Container,
    Section,
    Text,
    Head,
    Preview,
} from "@react-email/components";

interface AutoReplyEmailProps {
    nombre: string;
    servicio: string;
}

export const AutoReplyEmail = ({ nombre, servicio }: AutoReplyEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Hemos recibido tu consulta - Fabrica Chile</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={headerText}>Fábrica Chile</Text>
                    </Section>
                    <Section style={content}>
                        <Text style={title}>¡Hola {nombre}!</Text>

                        <Text style={paragraph}>
                            Muchas gracias por ponerte en contacto con nosotros. Hemos recibido
                            tu mensaje correctamente.
                        </Text>

                        {servicio && servicio !== "Otro / Consulta General" && (
                            <Text style={paragraph}>
                                Nuestro equipo está revisando tu interés en <strong>{servicio}</strong> y
                                nos comunicaremos contigo a la mayor brevedad posible para conversar
                                más al respecto.
                            </Text>
                        )}

                        {!servicio || servicio === "Otro / Consulta General" ? (
                            <Text style={paragraph}>
                                Nuestro equipo está revisando tu consulta y nos pondremos en contacto
                                contigo a la mayor brevedad posible.
                            </Text>
                        ) : null}

                        <Text style={paragraph}>
                            Si tienes alguna información adicional que creas que debamos saber,
                            puedes responder directamente a este correo.
                        </Text>

                        <Text style={signature}>
                            Saludos cordiales,<br />
                            <strong>El equipo de Fabrica Chile</strong>
                        </Text>

                    </Section>
                    <Section style={footer}>
                        <Text style={footerText}>
                            Este es un mensaje automático. Por favor no respondas a menos que necesites añadir información a tu consulta original.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};

const header = {
    padding: "20px",
    backgroundColor: "#424242",
};

const headerText = {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0",
    letterSpacing: "4px",
    textTransform: "uppercase" as const,
};

const content = {
    padding: "40px 24px",
};

const title = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#D81B60",
    marginBottom: "20px",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#424242",
    marginBottom: "16px",
};

const signature = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#424242",
    marginTop: "32px",
};

const footer = {
    padding: "0 24px",
    marginTop: "24px",
};

const footerText = {
    fontSize: "12px",
    color: "#a8a8a8",
    textAlign: "center" as const,
    lineHeight: "18px",
};

export default AutoReplyEmail;
