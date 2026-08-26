# Solución Docente — Problemas Intencionales en TechLearn

> **Esta es la respuesta oficial.** Documenta los 7 problemas implementados
> para que el docente pueda verificar los hallazgos de los estudiantes.

---

## Problema 1 — Imágenes sin comprimir

- **Hallazgo:** JPGs de 3-5 MB cada una.
- **Ubicación:** `assets/img/course-1.jpg` a `course-6.jpg` (2.9 MB c/u), `hero-bg.jpg` (4.6 MB), `hero-bg-2.jpg` (3.9 MB), `instructor.jpg` (3.3 MB).
- **Evidencia:** Pestaña Network en DevTools muestra el tamaño de cada transferencia. Lighthouse marca "Properly size images" y "Efficiently encode images" como oportunidades.
- **Métrica afectada:** **Total bytes transferidos** (el sitio pesa >25 MB), **LCP** (la imagen del hero tarda en cargar), **TTFB** se ve afectado por el ancho de banda.
- **Causa:** Imágenes generadas con Pillow sin compresión (`quality=95`), resolución 3000x2000 sin optimización.
- **Solución:** Comprimir las imágenes (quality 75-85), convertir a WebP (`cwebp -q 80 input.jpg -o output.webp`), reducir resolución a 1200x800, usar responsive images con `srcset`.

---

## #2 — JavaScript bloqueante

- **Hallazgo:** Los `<script>` están en el `<head>` sin `defer` ni `async`.
- **Ubicación:** `index.html` líneas 31-33.
- **Evidencia:** En Network, los JS se cargan ANTES de que se renderice el body. Lighthouse marca "Render-blocking resources".
- **Métrica afectada:** **FCP** (First Contentful Paint), **LCP**, **TTFB** se ve forzado a esperar.
- **Causa:** HTML parser encuentra `<script src>` y bloquea hasta descargar y ejecutar.
- **Solución:** Agregar `defer` a todos los scripts del head (`<script src="..." defer></script>`). `defer` permite que el HTML se siga parseando mientras el JS descarga, ejecutándose antes del `DOMContentLoaded`.

---

## #3 — Múltiples archivos JS no concatenados

- **Hallazgo:** 4 archivos JS separados.
- **Ubicación:** `index.html` (4 tags `<script>`), `assets/js/app.js` (6.5 KB), `analytics.js` (32 KB), `chat.js` (43 KB), `carousel.js` (45 KB).
- **Evidencia:** Pestaña Network muestra 4 requests adicionales para JS. Lighthouse marca "Reduce unused JavaScript" y "Avoid enormous network payloads".
- **Métrica afectada:** **Número de requests**, **Total bytes**, **TTFB** acumulado.
- **Causa:** Cada `<script>` es una solicitud HTTP separada, cada una con su propio handshake TLS y tiempo de transferencia.
- **Solución:** Concatenar los 4 archivos en uno solo (`bundle.js`), o usar un bundler como esbuild/Vite, o al menos mover los scripts al final del `<body>`.

---

## #4 — Imágenes sin width/height

- **Hallazgo:** Las imágenes de los cursos no tienen atributos width/height.
- **Ubicación:** `index.html` en las cards de cursos, `hero-bg-2.jpg`.
- **Evidencia:** Lighthouse marca "Image elements without explicit width/height" como oportunidad. Visualmente se nota que el contenido salta cuando cargan las imágenes.
- **Métrica afectada:** **CLS** (Cumulative Layout Shift).
- **Causa:** Sin reservar espacio, el navegador no sabe cuánto ocupará la imagen y reorganiza el layout cuando llega.
- **Solución:** Agregar `width="400" height="250"` a cada `<img>`, o usar CSS con `aspect-ratio: 16/10` y `width: 100%`.

---

## #5 — CSS no optimizado

- **Hallazgo:** Archivo CSS de ~50 KB sin minificar.
- **Ubicación:** `assets/css/styles.css` (49,833 bytes).
- **Evidencia:** Lighthouse marca "Reduce unused CSS" y "Minify CSS". Pestaña Network muestra el tamaño.
- **Métrica afectada:** **Total bytes transferidos**, **FCP** (CSS bloquea el primer render).
- **Causa:** CSS con selectores no usados (ej: `.legacy-utility-*`, clases deprecadas), comentarios, espacios en blanco.
- **Solución:** Minificar con `csso` o `clean-css-cli`, eliminar selectores no usados con PurgeCSS, dividir CSS crítico del resto.

---

## #6 — Sin responsive images / sin formato moderno

- **Hallazgo:** Las imágenes JPG se sirven a TODOS los dispositivos, incluido móvil con conexión lenta.
- **Ubicación:** Todas las `<img>` del sitio.
- **Evidencia:** Network muestra la misma imagen pesada servida a mobile (375px de ancho). Lighthouse marca "Serve images in next-gen formats" y "Properly size images".
- **Métrica afectada:** **Total bytes** (móvil descarga lo mismo que desktop), **LCP** (imagen tarda más en llegar).
- **Causa:** No se usa `<picture>` ni `srcset`, formato JPG pesado.
- **Solución:** Usar `<picture>` con `<source srcset="..." media="..." type="image/webp">` y fallback JPG. Generar versiones en 400w, 800w, 1200w.

---

## #7 — Carga ineficiente de fuentes

- **Hallazgo:** Dos problemas combinados.
- **Ubicación:** `index.html` líneas 17-24.
- **Evidencia:** Network muestra `@import` de Google Fonts (CSS adicional que bloquea), preload de `opensans-regular.woff2` y `montserrat-bold.woff2` que NO se usan en el sitio (solo se usa Roboto).
- **Métrica afectada:** **Render-blocking** (el `@import` bloquea el render hasta cargar el CSS remoto), **Total bytes** (descarga fuentes innecesarias), **TTFB** (depende de Google Fonts).
- **Causa:** Decisiones de diseño inconsistentes: se importan Poppins de Google, se precargan 2 fuentes locales no usadas, y el sitio usa Roboto de otra fuente.
- **Solución:** Eliminar el `@import` y usar solo fuentes locales (`@font-face` con `font-display: swap`), eliminar los `<link rel="preload">` de fuentes no usadas, asegurar coherencia entre lo que se declara y lo que se usa.