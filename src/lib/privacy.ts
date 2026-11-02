export const PRIVACY_VERSION = "2026-11-01";
export const CONTACT_CONSENT_TEXT = "Autorizo a Fábrica Chile a tratar mi nombre, correo, organización y mensaje para responder esta consulta y gestionar la relación que solicito, según la Política de privacidad. Puedo retirar mi consentimiento escribiendo a contacto@fabricachile.cl. Esta autorización no incluye publicidad ni suscripción al boletín.";
export const legalIdentity = {
  name: process.env.LEGAL_ENTITY_NAME || "Fábrica Chile (identificación legal pendiente de publicación)",
  rut: process.env.LEGAL_ENTITY_RUT || "Pendiente de publicación",
  address: process.env.LEGAL_ENTITY_ADDRESS || "Pendiente de publicación",
};
