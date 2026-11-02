# Preparación para privacidad y operación comercial

Implementado el 01-11-2026. No constituye certificación de cumplimiento.

## Antes de publicar

- Configurar LEGAL_ENTITY_NAME, LEGAL_ENTITY_RUT y LEGAL_ENTITY_ADDRESS en el despliegue. Las páginas muestran expresamente los datos pendientes si faltan. Confirmar la titularidad y atención efectiva de contacto@fabricachile.cl.
- Validar con el responsable jurídico las políticas, bases de licitud, plazos y procedimientos. Ley 19.628 vigente; vigencia general de Ley 21.719 desde 01-12-2026.
- Inventariar hosting, correo, Resend, Sanity, Vercel, Google Apps Script y WhatsApp: países, finalidades, subencargados, medidas de seguridad y contratos. Establecer garantías para transferencias internacionales. El repositorio no acredita estos acuerdos.
- Definir plazos concretos de retención por finalidad; configurar borrado en buzones, proveedor de correo, logs y copias. El sitio no automatiza el borrado en estos sistemas externos.
- Boletín confirmado inactivo: retiradas sección y enlaces de alta en Google y WhatsApp. Revisar listas históricas y cerrar la captura en el Apps Script externo si aún está accesible. No es necesario implementar nuevas altas o campañas mientras siga inactivo.
- Habilitar un registro restringido de solicitudes de acceso, rectificación, supresión, oposición, portabilidad y bloqueo; verificar identidad proporcionalmente, aplicar los plazos legales vigentes y documentar respuesta, derivaciones y excepciones. El canal actual es el correo; no existe un sistema automático de gestión de derechos.
- Documentar registro de tratamientos, responsables, permisos mínimos, revisión de accesos, incidentes y notificaciones conforme a la normativa. Evaluar riesgos y si procede una evaluación de impacto.
- Antes de vender, validar individualización del proveedor, precios totales, impuestos, condiciones y confirmación del contrato, retracto y garantías. Actualmente no hay checkout.

## Implementación y límites

Analítica desactivada por defecto. Elección local versionada con validez de 180 días, rechazo y aceptación equivalentes, revocación desde pie de página y recarga para detener runtime. Sin almacenamiento disponible no se activa analítica. Se sincronizan pestañas y se revisa caducidad cada minuto. Se eliminan query strings y fragmentos de eventos. No añadir datos personales a rutas ni eventos de analítica.

La constancia del consentimiento del formulario se genera en servidor y se incluye en el correo interno: fecha UTC, versión, texto y canal. No registra IP ni pretende verificar identidad. Mantener accesos restringidos y una política de conservación de esta evidencia. No se modifica la lista externa de suscriptores.

## Verificación manual en despliegue

1. Navegador limpio: no debe cargar /_vercel/insights antes de aceptar. Rechazar debe persistir tras recargar.
2. Aceptar activa analítica; retirar desde el pie recarga y deja de enviar eventos. Verificar CSP y recepción en Vercel: la configuración actual puede bloquear herramientas externas; no ampliar orígenes sin comprobar los necesarios.
3. Comprobar preferencias en móvil y teclado, enlaces legales, almacenamiento bloqueado, caducidad y otra pestaña.
4. POST sin consentimiento, con versión antigua o campos de tipo incorrecto debe responder 400 y no enviar correo. En staging verificar envío autorizado y evidencia; no usar datos reales para pruebas.
5. Revisar cookies y solicitudes de red en producción tras cada integración, incluidos infraestructura y área administrativa.

Fuentes oficiales consultadas:
- https://nuevo.leychile.cl/navegar?idNorma=1209272
- https://www.bcn.cl/leychile/Navegar?dt=open&idLey=19628
- https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html
- https://www.bcn.cl/leychile/navegar?idNorma=1165504

## Validación realizada

- `npx tsc --noEmit`: correcto.
- `npm run build`: correcto, incluidas las tres páginas legales. Avisos existentes: API de imagen de Sanity deprecada y consulta de Instagram sin resolución de red; el sitio usa su fallback.
- API probada con proveedor de correo simulado: cuatro entradas inválidas rechazadas sin enviar correo (consentimiento ausente, versión anterior, tipo incorrecto y cuerpo nulo); autorización vigente permite un envío simulado.
- Pendiente comprobar interacción visual y solicitudes de red en un navegador de producción. No había navegador disponible en la sesión; la conexión HTTP local de la herramienta estaba restringida.

## Avance posterior

- Página `/derechos` con solicitudes por correo, sin consentimiento comercial y sin crear una base adicional.
- Retención aprobada: consultas sin contratación durante seis meses desde su cierre, revisión mensual. Se refleja en la política y en los correos internos nuevos. La configuración y eliminación en servicios externos sigue pendiente.
- Procedimiento en `privacidad/OPERACION.md`; registros vacíos de solicitudes, incidentes y proveedores en `privacidad/`. Copiar a un sistema interno con acceso restringido antes de usarlos: no registrar datos personales reales en este repositorio.
- Pruebas repetibles: `node scripts/check-privacy.cjs`, sin llamadas de red ni correos reales. Cubren preferencias inválidas, caducidad, versión y tipos, rechazo del servidor y evidencia de consentimiento/retención.
- Cierre del boletín y revisión de datos históricos: `privacidad/BOLETIN.md`.

## Configuración confirmada por el usuario

- Alojamiento: Vercel.
- Buzón administrado internamente por Fábrica Chile; el coordinador atiende las solicitudes. Proveedor técnico de correo pendiente de identificar para configurar eliminación y revisar transferencias.
- Boletín inactivo. Retiradas las invitaciones y enlaces de suscripción del sitio. No se ha accedido ni borrado ninguna lista externa.
