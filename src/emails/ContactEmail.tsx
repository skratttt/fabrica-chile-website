import * as React from "react";
import {
    Html,
    Body,
    Container,
    Section,
    Text,
    Hr,
    Head,
    Preview,
} from "@react-email/components";

interface ContactEmailProps {
    nombre: string;
    organizacion: string;
    email: string;
    servicio: string;
    mensaje: string;
}

export const ContactEmail = ({
    nombre,
    organizacion,
    email,
    servicio,
    mensaje,
}: ContactEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Nuevo mensaje de contacto de {nombre}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={headerText}>Fábrica Chile - Nuevo Contacto</Text>
                    </Section>
                    <Section style={content}>
                        <Text style={paragraph}>
                            Has recibido un nuevo mensaje desde el formulario web:
                        </Text>

                        <table style={table}>
                            <tbody>
                                <tr>
                                    <td style={tdLabel}><strong>Nombre:</strong></td>
                                    <td style={tdValue}>{nombre}</td>
                                </tr>
                                <tr>
                                    <td style={tdLabel}><strong>Email:</strong></td>
                                    <td style={tdValue}><a href={`mailto:${email}`}>{email}</a></td>
                                </tr>
                                <tr>
                                    <td style={tdLabel}><strong>Organización:</strong></td>
                                    <td style={tdValue}>{organizacion || "No especificada"}</td>
                                </tr>
                                <tr>
                                    <td style={tdLabel}><strong>Servicio de Interés:</strong></td>
                                    <td style={tdValue}>{servicio || "No especificado"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Hr style={hr} />
                        <Text style={paragraph}><strong>Mensaje:</strong></Text>
                        <Text style={messageBlock}>{mensaje}</Text>

                    </Section>
                    <Section style={footer}>
                        <Text style={footerText}>
                            Este correo fue generado automáticamente por el formulario de
                            contacto de Fabrica Chile.
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
    backgroundColor: "#880E4F",
};

const headerText = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0",
};

const content = {
    padding: "24px",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#424242",
};

const table = {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    borderCollapse: "collapse" as const,
};

const tdLabel = {
    padding: "8px 0",
    width: "30%",
    color: "#424242",
};

const tdValue = {
    padding: "8px 0",
    color: "#424242",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const messageBlock = {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    borderRadius: "4px",
    color: "#424242",
    fontSize: "15px",
    lineHeight: "24px",
    whiteSpace: "pre-wrap" as const,
};

const footer = {
    padding: "0 24px",
};

const footerText = {
    fontSize: "12px",
    color: "#a8a8a8",
    textAlign: "center" as const,
};

export default ContactEmail;
