# DOCENTE · Sesión 6 — Laboratorio de Rendimiento Web

> **Esta guía contiene la solución.** No compartir con los estudiantes.

---

## 🎯 Objetivo

Que el estudiante aplique los conceptos de la Sesión 5 (LCP, INP, CLS, TTFB,
DevTools, Lighthouse) a un sitio real, identificando problemas, proponiendo
mejoras, comprobando resultados y documentando el proceso.

**Modalidad:** práctica de aprendizaje. NO es examen. No hay rúbrica con puntaje.

---

## 📋 Preparación previa

### Antes de clase

1. Verificar que el sitio está desplegado:
   `https://krizrome.github.io/web-performance-lab/`
2. Tener el repo abierto en una pestaña:
   `https://github.com/KrizRoMe/web-performance-lab/issues/new/choose`
3. Los estudiantes deben tener cuenta de GitHub.
4. Hoja de cálculo abierta para anotar métricas iniciales.

### Comandos para levantar localmente (respaldo)

```bash
git clone https://github.com/KrizRoMe/web-performance-lab
cd web-performance-lab
python3 -m http.server 8080
# http://localhost:8080
```

### URLs verificadas

- **Repositorio:** https://github.com/KrizRoMe/web-performance-lab
- **Demo Pages:** https://krizrome.github.io/web-performance-lab/
- **Issue templates:** https://github.com/KrizRoMe/web-performance-lab/issues/new/choose

---

## 🔧 Comprobación del deployment

```bash
gh repo view KrizRoMe/web-performance-lab
gh run list --limit 5
gh run view --job deploy
gh api repos/KrizRoMe/web-performance-lab/pages
```

---

## 🐛 Los 7 problemas intencionales

| # | Problema | Archivo/Ubicación | Métrica que afecta |
|---|---|---|---|
| 1 | Imágenes sin comprimir (~3-5 MB) | `assets/img/*.jpg` | Total bytes, LCP |
| 2 | JS bloqueante en `<head>` sin defer | `index.html` líneas 31-33 | FCP, LCP |
| 3 | Múltiples JS no concatenados | `index.html` (4 `<script>`) | TTFB, requests |
| 4 | Imágenes sin width/height | `index.html` (cards cursos) | CLS |
| 5 | CSS no optimizado (50 KB sin minificar) | `assets/css/styles.css` | Total bytes |
| 6 | Sin srcset / formato moderno | `index.html` (todas las `<img>`) | Total bytes |
| 7 | @import de Google Fonts + preload de fuentes no usadas | `index.html` líneas 17-24 | Render-blocking, TTFB |

Para respuestas detalladas (evidencia específica, causa, solución), ver
`docs/solucion-docente.md`.

---

## 📚 Conceptos a vincular con la Sesión 5

Cada hallazgo debería vincularse con al menos uno de estos conceptos:

- **LCP** (Largest Contentful Paint)
- **INP** (Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- **TTFB** (Time to First Byte)
- **Critical rendering path**
- **Render-blocking resources**
- **Network waterfall**

---

## ❓ Preguntas para discusión

Durante la puesta en común:

1. ¿Cuál problema afecta más al usuario en una conexión 3G?
2. ¿Por qué el CSS debe estar en el `<head>` pero el JS no?
3. ¿Qué pasa si solo optimizamos imágenes pero no concatenamos JS?
4. ¿Por qué width/height ayuda aunque la imagen aún no haya cargado?
5. ¿Cómo sabrías si una mejora realmente funcionó?

---

## ✅ Lo que se espera del estudiante

Esta es una **práctica de aprendizaje**, no una evaluación con nota. Lo que se busca:

1. **Identifica** al menos 5 problemas reales (de los 7 implementados).
2. **Documenta** cada uno en un Issue con evidencia (captura, métrica).
3. **Vincula** el problema con una métrica (LCP, CLS, total bytes, etc.).
4. **Propone** soluciones razonables (no necesita ser perfecta).
5. **Aplica** al menos 2-3 mejoras en el código del sitio.
6. **Vuelve a medir** y compara antes/después.
7. **Comunica** sus hallazgos en la puesta en común.

No hay puntaje. La calidad se discute en clase.

---

## 🔁 Verificación final

Al terminar la sesión, el estudiante debe tener:

- [ ] Sitio publicado en GitHub Pages (URL funcional)
- [ ] Repositorio en GitHub con los cambios
- [ ] Captura de Lighthouse inicial
- [ ] Al menos 5 Issues documentados con la plantilla
- [ ] Al menos 2 mejoras aplicadas en el código
- [ ] Captura de Lighthouse después de las mejoras
- [ ] Comparación antes/después anotada

---

## ⚠️ Posibles problemas durante la clase

1. **Estudiantes sin GitHub CLI instalado**: guiar con `gh auth login` o让他们 usar el repo manualmente.
2. **No pueden clonar**: verificar que tienen acceso al repo público.
3. **Lighthouse no aparece en DevTools**: actualizar Chrome a la última versión.
4. **Páginas no se ven similares entre estudiantes**: recordar que la versión live es la referencia.
5. **Cambios no se ven en Pages**: el workflow tarda 30-60s después del push.

---

## 🛡️ Recordatorio ético

Esta aplicación NO contiene vulnerabilidades reales. Los problemas son
exclusivamente de **rendimiento y optimización**, no de seguridad ni privacidad.
Si un estudiante reporta un problema de seguridad, explicar que esta es una
práctica de rendimiento y redirigir el análisis a la capa de optimización.