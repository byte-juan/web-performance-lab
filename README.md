# web-performance-lab — Sesión 6 · Admin Sitios Web

Plantilla web educativa para que los estudiantes **publiquen su primera
página personal** en internet usando git, gh CLI y GitHub Pages.

**Curso:** Administración de Sitios Web · Sesión 6 (laboratorio) · IIC

> **100% frontend estático.** Sin backend, sin base de datos. Funciona
> completamente offline.

---

## 🚀 Demo en vivo (del docente)

**GitHub Pages:** https://krizrome.github.io/web-performance-lab/

---

## 🛠️ Stack

- HTML5 + CSS3
- Sin frameworks (sin React, Vue, Next.js)
- Sin JavaScript (sitio estático puro)
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

> **No se crean Issues.** Esta sesión es de publicación, no de auditoría.

### Parte 1 — Demo del docente (20 min)

El docente abre una página web real y muestra:
- Código fuente (clic derecho → "Ver código fuente")
- Chrome DevTools (F12)
- Pestaña Network (qué se descarga)
- Pestaña Elements (cómo está estructurado el HTML)
- Pestaña Console (errores de JavaScript)

Los estudiantes **observan y apuntan en su bloc de notas**.

### Parte 2 — Tu primera página (55 min)

1. **Clonar** el proyecto del docente:
   ```bash
   git clone https://github.com/KrizRoMe/web-performance-lab.git
   cd web-performance-lab
   ```

2. **Modificar** el archivo `index.html`:
   - Cambiar `<title>` por tu nombre
   - Cambiar el `<h1>` "Hola, soy [TU NOMBRE AQUÍ]"
   - Personalizar las secciones "Sobre mí" y "Mis gustos"
   - Personalizar el footer

3. **Crear tu propio repositorio** en https://github.com/new
   - Nombre: `web-performance-lab`
   - Visibility: **Public**
   - NO inicialices con README

4. **Conectar el remote**:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/web-performance-lab.git
   ```

5. **Subir tus cambios**:
   ```bash
   git add .
   git commit -m "feat: publicar mi primera página"
   git push -u origin main
   ```
   > Te pedirá usuario y contraseña. Usa tu **Personal Access Token**,
   > no tu contraseña de GitHub.

6. **Activar GitHub Pages**:
   - En tu repo → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` · Folder: `/ (root)`
   - Save
   - Espera 30-60 segundos

7. **Ver tu página**:
   `https://TU-USUARIO.github.io/web-performance-lab/`

### Parte 3 — Cierre (15 min)

- Compartir las URLs entre todos
- Reflexión: ¿cómo se siente ver tu nombre en internet?

---

## 📋 Lo que entregas

1. Tu página publicada en internet
2. Tu URL personal de GitHub Pages
3. Tu repositorio en GitHub (público)
4. Tu `index.html` con tu nombre
5. Tus apuntes en el bloc de notas

---

## 📂 Estructura del proyecto

```
web-performance-lab/
├── index.html              # Página principal (con marcadores a personalizar)
├── favicon.svg
├── assets/
│   └── css/
│       └── styles.css      # Estilos simples
├── .github/
│   └── workflows/
│       └── deploy.yml      # Workflow para GitHub Pages
├── DOCENTE.md              # Guía completa del docente
└── README.md               # Este archivo
```

---

## 📜 Licencia

Material educativo de uso libre para fines académicos.
IIC · Instituto Isabel La Católica · Huánuco, Perú · 2026