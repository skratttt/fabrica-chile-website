import LegalPage from "../components/LegalPage";
import { legalIdentity } from "@/lib/privacy";
export const metadata = { title: "Términos de uso | Fábrica Chile" };
export default function TermsPage() {
  return <LegalPage title="Términos de uso y servicios">
    <p>Este sitio es operado por {legalIdentity.name}, RUT {legalIdentity.rut}, domicilio {legalIdentity.address}. Contacto: <a href="mailto:contacto@fabricachile.cl">contacto@fabricachile.cl</a>.</p>
    <h2>Objeto del sitio</h2><p>Publicamos estudios, opiniones e información sobre nuestros servicios. Navegar o enviar una consulta no constituye contratación ni genera cobros. El sitio no ofrece un proceso de compra o pago en línea.</p>
    <h2>Contratación de servicios</h2><p>Las solicitudes se evalúan individualmente. Antes de contratar se debe entregar una propuesta con identificación del proveedor, alcance, entregables, precio total e impuestos, condiciones de pago, plazos, soporte y condiciones de término. La contratación requiere aceptación expresa de esa propuesta.</p>
    <p>Se respetan los derechos irrenunciables que correspondan conforme a la Ley 19.496, incluidas garantías y retracto cuando procedan. No se establece aquí una exclusión general de esos derechos. Cualquier condición particular debe informarse antes de contratar y ajustarse a la ley.</p>
    <h2>Contenidos y uso</h2><p>Respeta la autoría y las licencias indicadas en cada publicación. Las opiniones y análisis se presentan con fines informativos. Los enlaces externos permiten acceder a servicios de otros operadores, sujetos a sus respectivas condiciones.</p>
    <h2>Consultas y reclamos</h2><p>Para aclaraciones sobre servicios o reclamos escribe al correo de contacto. Estos términos no limitan tu derecho a acudir al SERNAC o a los tribunales competentes. El tratamiento de datos se explica en la <a href="/privacidad">Política de privacidad</a>.</p>
  </LegalPage>;
}
