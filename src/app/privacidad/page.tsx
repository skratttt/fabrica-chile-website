import LegalPage from "../components/LegalPage";
import { legalIdentity } from "@/lib/privacy";
export const metadata = { title: "Política de privacidad | Fábrica Chile" };
export default function PrivacyPage() {
  return <LegalPage title="Política de privacidad">
    <h2>Responsable y contacto</h2>
    <p>Responsable del sitio: {legalIdentity.name}. RUT: {legalIdentity.rut}. Domicilio: {legalIdentity.address}. La atención de las solicitudes está a cargo del coordinador de Fábrica Chile. Canal de consultas y derechos: <a href="mailto:contacto@fabricachile.cl">contacto@fabricachile.cl</a>.</p>
    <h2>Datos, fines y bases del tratamiento</h2>
    <p>En el formulario solicitamos nombre, correo y mensaje; organización y servicio son opcionales. Con tu autorización los utilizamos para responder y dar seguimiento a tu solicitud. La negativa impide enviar el formulario, pero puedes navegar libremente. No usamos estas consultas para publicidad ni para suscribirte a boletines.</p>
    <p>La prestación y seguridad del sitio implica el tratamiento técnico de direcciones IP y registros de conexión por los proveedores de infraestructura, en la medida necesaria para entregar el servicio y prevenir incidentes. Deben limitarse a esos fines. No solicitamos datos sensibles ni datos de menores. Evita incluir información personal de terceros en tus mensajes.</p>
    <p>La analítica opcional de Vercel solo se activa con tu autorización e informa sobre visitas y uso del sitio. Se eliminan los parámetros y fragmentos de las URL antes de enviar los eventos. No implementamos publicidad comportamental ni decisiones automatizadas con efectos jurídicos.</p>
    <h2>Proveedores y servicios externos</h2>
    <p>Resend procesa el contenido del formulario y tu correo para entregar la consulta al equipo y, cuando está habilitada, una confirmación. Sanity sirve las publicaciones y archivos; Vercel aloja el sitio y proporciona la herramienta de analítica opcional. Estos servicios pueden implicar tratamiento fuera de Chile. La entidad responsable debe verificar los países, subencargados, contratos y garantías de transferencia aplicables antes de habilitar su uso en producción.</p>
    <p>El boletín está inactivo y este sitio no recibe nuevas suscripciones. Si te suscribiste anteriormente, puedes solicitar información o eliminación de tus datos por el canal de privacidad. Los enlaces a redes sociales y YouTube abren plataformas externas sujetas a sus propias condiciones.</p>
    <h2>Conservación y seguridad</h2>
    <p>El formulario envía correos y no crea una base de contactos en este sitio. Los mensajes y la constancia de autorización quedan en el correo del equipo y en el proveedor de envío. Las consultas sin contratación se conservan durante seis meses desde su cierre, con revisión mensual para su eliminación o anonimización. Si la consulta da lugar a un contrato, reclamo u obligación legal de conservación, los antecedentes necesarios se separan y quedan sujetos al plazo y finalidad que corresponda; no se utilizan para publicidad. Esta eliminación debe ejecutarse también en el buzón y los proveedores que conserven copias. La preferencia de analítica caduca a los 180 días en este navegador.</p>
    <h2>Ejercicio de derechos</h2>
    <p>Consulta las instrucciones y prepara tu solicitud desde <a href="/derechos">Ejercer mis derechos</a>. Este canal es gratuito y no requiere consentimiento comercial.</p>
    <p>Escribe a <a href="mailto:contacto@fabricachile.cl?subject=Solicitud%20de%20derechos%20de%20datos">contacto@fabricachile.cl</a> indicando tu solicitud y un medio de respuesta. Puedes solicitar acceso, rectificación y eliminación, retirar el consentimiento y, cuando corresponda conforme a la normativa aplicable, oposición, portabilidad y bloqueo. No envíes tu cédula por defecto: solo se solicitará la información proporcional que resulte necesaria para verificar tu identidad.</p>
    <p>Retirar la autorización no afecta el tratamiento lícito anterior. Las solicitudes sobre datos de antiguas suscripciones también se atienden por este canal. La analítica se puede retirar inmediatamente desde «Configurar cookies» en el pie de página. Puedes presentar las reclamaciones ante las autoridades competentes según el régimen vigente.</p>
    <h2>Normativa y cambios</h2>
    <p>Esta política se prepara para la Ley 21.719, cuya vigencia general comienza el 1 de diciembre de 2026. Hasta entonces se aplica el régimen vigente de la Ley 19.628. Publicaremos las modificaciones aquí y solicitaremos una nueva autorización cuando cambien las finalidades que la requieran.</p>
  </LegalPage>;
}
