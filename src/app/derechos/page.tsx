import LegalPage from "../components/LegalPage";
export const metadata = { title: "Ejercer derechos de privacidad | Fábrica Chile" };
const requests = [
  ["Acceso", "Quiero conocer si tratan mis datos y obtener acceso e información sobre su tratamiento."],
  ["Rectificación", "Quiero corregir o completar los siguientes datos:"],
  ["Supresión", "Solicito eliminar los siguientes datos e indico el motivo:"],
  ["Oposición", "Me opongo al siguiente tratamiento e indico el motivo:"],
  ["Portabilidad", "Solicito una copia de los datos que corresponda entregar en formato electrónico estructurado."],
  ["Bloqueo temporal", "Solicito el bloqueo temporal de los siguientes datos o tratamiento e indico el fundamento:"],
  ["Retiro de consentimiento", "Retiro mi consentimiento para el siguiente tratamiento:"],
  ["Datos de antiguas suscripciones", "Solicito información o eliminación de mis datos de una antigua suscripción:"],
];
export default function RightsPage() {
  return <LegalPage title="Ejercer tus derechos">
    <p>Envía tu solicitud gratuitamente a <a href="mailto:contacto@fabricachile.cl">contacto@fabricachile.cl</a>. No necesitas aceptar publicidad ni autorizar nuevos tratamientos para ejercer tus derechos.</p>
    <h2>Cómo solicitarlo</h2>
    <p>Indica tu nombre, el derecho que deseas ejercer, los datos o tratamiento al que se refiere y un correo para responder. Si actúas en representación de otra persona, indícalo. Para acceso basta individualizarte; explica la corrección, el motivo o el fundamento cuando corresponda a tu petición.</p>
    <p>No adjuntes tu cédula ni datos sensibles de entrada. Cuando sea necesario verificar tu identidad o representación, solicitaremos antecedentes proporcionales por un canal adecuado. No entregaremos datos de otras personas.</p>
    <div className="grid sm:grid-cols-2 gap-3">{requests.map(([title, text]) => <a key={title} className="block border border-[#880E4F] rounded p-4 text-[#880E4F]" href={`mailto:contacto@fabricachile.cl?subject=${encodeURIComponent(`Privacidad: ${title}`)}&body=${encodeURIComponent(`Nombre:\nMedio de respuesta:\n\n${text}\n\nDatos o tratamiento relacionado:\n`)}`}>{title}: preparar correo</a>)}</div>
    <p>Estos enlaces solo preparan un mensaje en tu aplicación de correo: revisa y envíalo para presentar la solicitud. Si no se abre una aplicación, escribe directamente a la dirección indicada.</p>
    <h2>Respuesta y seguimiento</h2>
    <p>Te confirmaremos la recepción y comunicaremos el resultado o los antecedentes necesarios. La normativa aplicable determina los requisitos y plazos. Desde la vigencia general de la Ley 21.719, el 1 de diciembre de 2026, el plazo general será de 30 días corridos, con la prórroga legal que corresponda; las solicitudes fundadas de bloqueo temporal tienen un plazo especial de dos días hábiles.</p>
    <p>El retiro del consentimiento no afecta la licitud del tratamiento anterior. Si debemos conservar determinados antecedentes por una obligación legal, explicaremos la razón y limitaremos su uso. Puedes consultar los detalles en la <a href="/privacidad">Política de privacidad</a>.</p>
  </LegalPage>;
}
