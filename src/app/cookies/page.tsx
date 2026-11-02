import LegalPage from "../components/LegalPage";
import { CookieSettingsButton } from "../components/PrivacyControls";
export const metadata = { title: "Cookies y preferencias | Fábrica Chile" };
export default function CookiesPage() {
  return <LegalPage title="Cookies y almacenamiento local">
    <p>Las cookies y el almacenamiento local permiten guardar información en tu navegador. No activamos analítica opcional antes de que la autorices. Continuar navegando o cerrar una página no constituye aceptación.</p>
    <h2>Inventario del sitio público</h2>
    <p><strong>fabrica-privacy-preferences</strong>: almacenamiento local propio, necesario para recordar tu elección. Contiene la versión del aviso, la decisión sobre analítica y la fecha. Su validez es de 180 días; después solicitamos una nueva elección. Puedes borrarlo desde tu navegador. No se utiliza para publicidad.</p>
    <p><strong>Vercel Web Analytics</strong>: medición opcional de visitas, sin cookies de analítica. Solo se carga tras aceptar la categoría correspondiente. Rechazarla no afecta las funciones del sitio. No hay categorías publicitarias activas.</p>
    <p>El área administrativa de Sanity es un servicio separado que puede requerir almacenamiento de autenticación para sus usuarios autorizados. Los enlaces externos de redes sociales y YouTube pueden utilizar sus propias cookies cuando visites sus plataformas.</p>
    <h2>Control de tu elección</h2>
    <p><CookieSettingsButton />. Puedes rechazar todas las opcionales o guardar una selección. Retirar el permiso recarga la página para detener la herramienta ya cargada; no elimina los eventos que se hayan enviado previamente. La elección corresponde a este navegador, no a otros dispositivos.</p>
  </LegalPage>;
}
