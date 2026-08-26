# web-performance-lab — Sesión 6 · Admin Sitios Web

Aplicación web educativa con **problemas intencionales de rendimiento** para
que los estudiantes los descubran usando Chrome DevTools y Lighthouse.

**Curso:** Administración de Sitios Web · Sesión 6 (laboratorio) · IIC

> Aplicación 100% estática. Sin backend, sin base de datos, sin tracking.
> Funciona completamente offline.

---

## 🚀 Demo en vivo

**GitHub Pages:** https://krizrome.github.io/web-performance-lab/

---

## 🛠️ Stack

- HTML5 + CSS3 + JavaScript vanilla
- Sin frameworks (sin React, Vue, Next.js)
- Funciona con cualquier servidor estático

---

## 💻 Ejecución local

```bash
git clone https://github.com/KrizRoMe/web-performance-lab
cd web-performance-lab
python3 -m http.server 8080
# Abrir http://localhost:8080
```

O con Node:
```bash
npx serve .
```

---

## 🧪 Actividad (90 minutos)

1. Publica el sitio en GitHub Pages (instrucciones del docente).
2. Abre el sitio en Chrome.
3. Abre DevTools (F12).
4. Ejecuta Lighthouse (pestaña Lighthouse → Performance → Analyze).
5. Revisa la pestaña Network.
6. Encuentra al menos **5 problemas** de rendimiento.
7. Aplica al menos **2-3 mejoras**.
8. Vuelve a medir y compara.
9. Documenta cada hallazgo como Issue de GitHub usando la plantilla
   **"Reporte de Rendimiento"**.

---

## ⚠️ Problemas intencionales

Esta aplicación contiene **7 problemas de rendimiento implementados a propósito**
para que los estudiantes los detecten:

1. Imágenes JPG sin comprimir (~3-5 MB cada una)
2. JavaScript bloqueante (sin defer/async)
3. Múltiples archivos JS no concatenados
4. Imágenes sin width/height (CLS)
5. CSS no optimizado (~50 KB sin minificar)
6. Sin srcset / formato moderno
7. Carga ineficiente de fuentes

Para la lista completa con ubicación y métricas afectadas, ver
`docs/solucion-docente.md`.

---

## 📂 Estructura

```
web-performance-lab/
├── index.html
├── favicon.svg
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── analytics.js
│   │   ├── chat.js
│   │   └── carousel.js
│   ├── img/      (9 imágenes pesadas)
│   └── fonts/    (4 woff2)
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── reporte-rendimiento.md
│   └── workflows/
│       └── deploy.yml
├── docs/
│   └── solucion-docente.md
├── DOCENTE.md
└── README.md
```

---

## 📜 Licencia

Material educativo de uso libre para fines académicos.
IIC · Instituto Isabel La Católica · Huánuco, Perú · 2026