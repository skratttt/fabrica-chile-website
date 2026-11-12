# Observatorio de Fábrica Chile

Acceso: `/observatorio`, enlace «Observatorio» en la navegación de escritorio y móvil. No se desplegó a producción.

## Estructura

- `src/lib/observatorio/measurements.json`: única fuente de las 126 mediciones (archivo exacto del ZIP).
- `src/lib/observatorio/model.ts`: funciones puras de fechas UTC, promedio, evolución, variaciones y CSV.
- `src/app/observatorio/`: página Next.js, controles React, gráfico SVG adaptable al ancho real (ResizeObserver) y estilos locales. Reutiliza Navbar, Footer, Playfair Display e Inter. Sin nuevas dependencias.
- `public/observatorio/`: Excel original y 100 promedios históricos originales como descarga de procedencia. Estos promedios no alimentan los gráficos nuevos.

La fecha de matriz es 02-11-2026; última medición 01-11-2026. Fecha de corte seleccionable entre el primer registro y la fecha de matriz. No hay actualizaciones automáticas. No se ejecutó `import_excel.py`: fue revisado como referencia y contiene rutas absolutas y reemplazos del HTML.

## Decisiones de cálculo

Para cada corte: última observación por fuente en [corte − 29 días, corte], peso igual por fuente, denominador propio por indicador no nulo. Todas las fuentes participan si tienen datos vigentes, independientemente de los controles de exploración. El promedio vacío es nulo. Nunca se deduce NS/NR.

La evolución se calcula diariamente, con la misma regla y sin datos futuros; se etiqueta como estimación diaria, no como nuevas mediciones. Esto permite reflejar también vencimientos en fechas sin publicaciones. Las líneas se interrumpen si no hay datos. El gráfico conjunto muestra solo observaciones originales, con todas las fuentes en un único plano. Cinco colores contrastantes y símbolos por encuestadora; indicadores diferenciados con trazos continuo, rayas y puntos y eje Y fijo de 0 a 100. Incluye enfoque de fuente desde la leyenda, aislamiento con «Solo», presets de comparación, promedio superpuesto opcional, inspección por proximidad del cursor, fijación por clic/toque y recorrido de fechas mediante deslizador o teclado (← →, Inicio, Fin y Escape). La inspección usa únicamente observaciones de la fecha exacta. El resumen es texto breve sin recuadro ni tabla: omite fuentes sin medición ese día e indicadores sin cambio; compara con la observación anterior original, aunque quede fuera del período visible. Valores absolutos en los títulos de los puntos. Participantes y denominadores del promedio se consultan en un desplegable compacto.

Se mantienen los períodos 30, 90 días y todo el registro, agregando 15 días. Los intervalos numéricos son inclusivos. Se mantienen las opciones de antigüedad 30, 60 y sin límite como filtro de las observaciones por fuente, sin modificar la vigencia fija del promedio. Al restablecer se muestran todo el historial y todas las series. CSV: selección de encuestadoras y registros hasta el corte, como en el demo; se explica que no recorta por período visible.

El demo admitía promedio sobre fuentes seleccionadas con antigüedad variable, usaba `edad <= 30` (31 días inclusivos), y mostraba una evolución independiente con los valores cacheados del Excel. Ahora el resumen y la curva aplican la misma regla fija.

Ejemplo al 01-11-2026: cuatro fuentes vigentes; Panel Ciudadano excluida (última 10-06-2026). Promedios: 24,525 / 64,875 / 10,625 %. Cinco últimas mediciones sin límite: 27,62 / 62,10 / 10,30 %. Último NS/NR histórico cacheado del Excel: 10,28 %. Los valores se conservan en sus archivos de origen; la interfaz redondea para lectura sin modificar cálculos ni descargas.

Variaciones: últimas dos observaciones de la misma fuente hasta el corte, sin filtro de intervalo. Fecha y estado de vigencia explícitos. Flechas neutrales y diferencia en pp; faltantes o ausencia de anterior no se reemplazan por cero.

## Verificación

```
node scripts/observatorio/check.cjs /ruta/FabricaChile_codigo_original.zip
npx tsc --noEmit
npm run build
npm run start -- --port 3100
```

261 comprobaciones automatizadas con el ZIP: cantidades por fuente (65, 34, 13, 8, 6), comparación byte a byte de los tres archivos originales, ventanas inclusivas y filtros de períodos, promedio contra cálculo independiente en cada fecha, exclusión de futuro y caducidad, indicadores faltantes y cero real, promedio vacío, variaciones positivas/negativas/sin cambio/sin anterior y exportación CSV. Se verifica también el render React de un único SVG con las cinco fuentes, los cinco colores de fuente y los estados sin fuentes o sin indicadores.

También se cotejaron directamente las 126 fechas y ternas de porcentajes contra las cinco hojas del XLSX mediante lectura XML sin modificarlo. TypeScript y build de producción pasan. El build con acceso a red muestra advertencias existentes de Sanity y token de Instagram inválido en la portada; el observatorio no usa servicios externos.

Pendiente: revisión visual interactiva en escritorio y móvil. El navegador disponible estaba siendo usado por el usuario y no se pudo completar esa revisión. El diseño adapta el ancho del SVG sin reducir el tamaño del texto, apila controles y cifras en móvil y permite desplazar horizontalmente las tablas. Foco visible, controles etiquetados, tooltips por foco/toque y animación desactivada con prefers-reduced-motion.

## Ajuste de presentación solicitado

La evolución se divide ahora en tres gráficos de ancho completo, uno por indicador, con todas las fuentes seleccionadas en cada gráfico y colores consistentes por encuestadora. Los controles «Gráficos visibles» permiten ocultarlos y el promedio se puede superponer en cada uno. Cada deslizador tiene una etiqueta e identificador únicos.

Se retiraron de la interfaz el párrafo largo bajo los gráficos, la sección de metodología, la comparación con el demo y todos los controles de descarga (Excel, CSV y JSON). El cierre muestra solo una referencia discreta a fuentes y fecha de la matriz. Los archivos originales se conservan en el repositorio para trazabilidad; los cálculos no cambian.

La presentación final vuelve a un único gráfico conjunto a pedido del usuario: colores por encuestadora, trazo por indicador (continuo/rayas/puntos), con los tres indicadores activos por defecto. Se conservan el resumen breve, las fuentes discretas y la eliminación de descargas.

La selección final de encuestadoras está integrada en la leyenda del gráfico: botones grandes con nombre, símbolo y color; clic, Enter o Espacio alternan la fuente. Las fuentes ocultas permanecen en la leyenda con menor opacidad para reactivarlas. Se retiraron los checks y botones «Solo» externos. La selección no reinicia el componente ni pierde el foco de teclado; sí limpia la fecha fijada para evitar detalles de una fuente recién ocultada.

Nombre público final: **Ecosistema**. Ruta `/ecosistema`, navegación y título actualizados. `/observatorio` redirige permanentemente a `/ecosistema` para conservar enlaces anteriores.

El banner de Ecosistema reutiliza AnimatedPageTitle, AnimatedWord, FadeInScroll y HeroPixelTrail del sitio; reproduce la escala tipográfica, pesos, colores, espaciado y tuerca `/assets/gear.png` del banner de Nosotros. Con movimiento reducido se muestra el título estático y no se monta la estela.
