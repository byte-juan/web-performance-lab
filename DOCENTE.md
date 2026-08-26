# DOCENTE · Sesión 6 — Tu primera página web

> **Esta guía es para el docente.**

---

## 🎯 Objetivo

Que el estudiante **publique su primera página web personal** en internet,
usando git, gh CLI y GitHub Pages. La sesión es 80% práctica y 20% demostración.

**Modalidad:** práctica de aprendizaje. NO es examen. No hay rúbrica.

---

## 📋 Preparación previa

### Antes de clase

1. Verificar que el repo está desplegado y accesible:
   - `https://krizrome.github.io/web-performance-lab/`
2. El docente debe tener `gh auth status` activo.
3. Los estudiantes deben tener cuenta de GitHub.
4. Bloc de notas para cada estudiante (la actividad NO usa Issues).
5. Proyector mostrando la URL en vivo.

### URLs clave

- **Repo del docente:** https://github.com/KrizRoMe/web-performance-lab
- **Demo en vivo:** https://krizrome.github.io/web-performance-lab/
- **Para los alumnos:** cada uno creará SU PROPIO repo con el mismo nombre

### Comandos que el docente debe tener listos

```bash
# 1. Clonar
git clone https://github.com/KrizRoMe/web-performance-lab.git
cd web-performance-lab

# 2. Modificar (el alumno edita con VS Code, nano, etc.)
# Cambiar [TU NOMBRE AQUÍ] por su nombre real

# 3. Crear SU propio repo en github.com (interfaz web)
# 4. Conectar el remote
git remote add origin https://github.com/USUARIO/web-performance-lab.git

# 5. Subir
git add .
git commit -m "feat: publicar mi primera página"
git push -u origin main

# 6. Activar Pages en Settings → Pages → branch: main, / (root)
# Esperar 30-60 segundos
# URL pública: https://USUARIO.github.io/web-performance-lab/
```

---

## 🧑‍🏫 Flujo de la clase (90 minutos)

| Min | Bloque | Actividad |
|---|---|---|
| 0-20 | Demo del docente | Abrir una página real, mostrar código fuente, DevTools, Network. Los alumnos observan y apuntan en su bloc. |
| 20-35 | Práctica - clonar | `git clone` del repo del docente. Verificar que se descargó. |
| 35-50 | Práctica - modificar | Editar `index.html` con su nombre. Cambiar `<title>`, `<h1>`, secciones "Sobre mí" y "Gustos". |
| 50-65 | Práctica - publicar | Crear repo en github.com, conectar remote, `git push`. |
| 65-80 | Práctica - Pages | Configurar GitHub Pages en Settings. Esperar 30-60s. Probar URL. |
| 80-90 | Cierre | Compartir URLs entre todos. Reflexión: "tu nombre está en internet". |

---

## 📋 Lo que se espera del estudiante

Esta es una **práctica de aprendizaje**, no una evaluación con nota. Lo que se busca:

1. Clona el repositorio correctamente.
2. Modifica su HTML (título, encabezado, secciones).
3. Crea su propio repositorio en github.com.
4. Conecta el remote origin a SU repo.
5. Hace push sin errores.
6. Habilita GitHub Pages.
7. Verifica que su página carga en internet con su nombre visible.

No hay puntaje. Lo importante es que su nombre quede en internet.

---

## 🔁 Estructura del proyecto para los alumnos

El repo `web-performance-lab` es ahora una **plantilla simple** que el alumno personaliza:

```
web-performance-lab/
├── index.html              # Página principal con marcadores [TU NOMBRE AQUÍ]
├── favicon.svg
├── assets/
│   └── css/
│       └── styles.css      # Estilos simples
├── .github/
│   └── workflows/
│       └── deploy.yml      # Para GitHub Pages
├── DOCENTE.md
└── README.md
```

Marcadores a personalizar en `index.html`:
- `<title>...</title>` → "Mi primera página - [Nombre]"
- `<h1>Hola, soy [TU NOMBRE AQUÍ]</h1>`
- Sección "Sobre mí" → sus datos
- Lista "Gustos" → sus intereses
- Footer con su nombre

---

## 🔧 Resolución de problemas comunes

### 1. `git clone` falla con "Repository not found"
- Verificar que la URL es correcta
- Verificar que tienen acceso a internet

### 2. `git push` pide usuario y contraseña pero falla
- GitHub ya no acepta contraseñas. Necesitan un **Personal Access Token (PAT)**.
- El docente debe mostrar cómo crearlo: Settings → Developer settings → Personal access tokens → Generate new token (classic) → seleccionar `repo` y `workflow` → Generate → copiar el token

### 3. `git push` dice "remote: Permission denied"
- El token no tiene permisos, o el repo no es suyo
- Verificar que crearon SU propio repo

### 4. GitHub Pages no aparece / dice "There is no Pages site here"
- Verificar que la rama es `main` (no `master`)
- Verificar que el folder es `/ (root)`
- Esperar más tiempo (hasta 5 min la primera vez)

### 5. La página carga pero sale 404
- El `index.html` debe estar en la raíz del repo
- Verificar que el push incluyó el archivo: `git ls-files`

### 6. Conflict: "Updates were rejected because the tip of your current branch is behind"
- El repo remoto tiene un commit que el local no (puede pasar si inicializaron con README)
- Solución: `git pull origin main --rebase` y luego `git push`

---

## ✅ Verificación final

Al terminar, el estudiante debe:

- [ ] Tener un repo público en su cuenta con el nombre `web-performance-lab`
- [ ] El `remote origin` apunta a SU repo (verificar con `git remote -v`)
- [ ] El `index.html` tiene su nombre real
- [ ] GitHub Pages está activo
- [ ] La URL `https://USUARIO.github.io/web-performance-lab/` carga con su página

---

## 🛡️ Notas

- Esta sesión es de **publicación**, no de auditoría ni Issues.
- Los Issues NO son parte de la entrega.
- El bloc de notas sí es parte de la entrega (lo que apuntó durante la demo).
- La práctica es exitosa cuando el estudiante ve su nombre en internet.