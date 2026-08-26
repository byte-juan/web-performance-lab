# Solución Docente — Sesión 6: Publicación de la primera página

> Documento de referencia para el docente. No compartir con los estudiantes.

---

## Comandos exactos que el docente debe mostrar

### Paso 1: Clonar
```bash
git clone https://github.com/KrizRoMe/web-performance-lab.git
cd web-performance-lab
```

Verificar con:
```bash
ls
# Debe verse: index.html, favicon.svg, assets/, .github/, etc.
```

### Paso 2: Modificar
Editar `index.html` con VS Code, nano, o cualquier editor:

```bash
# Opción con VS Code (si está instalado)
code index.html

# Opción con nano
nano index.html
```

Buscar y reemplazar:
- `<title>Mi primera página — Sesión 6 IIC</title>` → `<title>Mi primera página - [Nombre]</title>`
- `<h1>Hola, soy [TU NOMBRE AQUÍ]</h1>` → `<h1>Hola, soy [Nombre Real]</h1>`
- Sección "Sobre mí" → información real
- Lista "Gustos" → gustos reales
- Footer → nombre y año

### Paso 3: Crear repo en github.com (UI)

1. Abrir https://github.com/new
2. Repository name: `web-performance-lab`
3. Description: "Mi primera página web" (opcional)
4. Visibility: **Public** ⚠️
5. NO marcar "Add a README file"
6. Click "Create repository"
7. **Copiar la URL HTTPS** que muestra (ej: `https://github.com/juan-perez/web-performance-lab.git`)

### Paso 4: Conectar remote
```bash
git remote add origin https://github.com/TU-USUARIO/web-performance-lab.git
git remote -v
# Debe mostrar:
# origin  https://github.com/juan-perez/web-performance-lab.git (fetch)
# origin  https://github.com/juan-perez/web-performance-lab.git (push)
```

### Paso 5: Primer push
```bash
git add .
git status
# Debe mostrar los archivos modificados en verde

git commit -m "feat: publicar mi primera página"
git push -u origin main
```

> Si pide username y password:
> - Username: su-usuario-de-github
> - Password: su **Personal Access Token** (NO la contraseña)

**Cómo crear un Personal Access Token** (mostrar al alumno si no tiene):
1. https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Note: "Sesion 6 Admin Web"
4. Expiration: 30 days (o lo que el docente indique)
5. Scopes: marcar `repo` (todo) y `workflow`
6. "Generate token"
7. **Copiar el token inmediatamente** (no se vuelve a mostrar)

### Paso 6: Activar GitHub Pages

1. En el repo → tab **Settings**
2. Menú lateral → **Pages**
3. Source: **"Deploy from a branch"**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**
6. Esperar 30-60 segundos
7. Aparece un banner: "Your site is live at https://USUARIO.github.io/web-performance-lab/"
8. Click en la URL → debería verse la página con el nombre del alumno

---

## Errores comunes y soluciones

| Error | Causa | Solución |
|---|---|---|
| `git clone` falla con "Repository not found" | URL mal escrita o sin internet | Verificar URL, probar con `curl github.com` |
| `git push` pide password normal | GitHub ya no acepta contraseñas | Crear Personal Access Token (ver paso 5) |
| `git push` dice "remote: Permission denied" | Token sin permisos o repo no es del alumno | Verificar scope `repo` en el token; verificar que el repo es de su cuenta |
| `git push` dice "Updates were rejected" | El repo remoto tiene commits que el local no | `git pull origin main --rebase` y luego `git push` |
| GitHub Pages dice "There is no Pages site here" | La rama o folder están mal | Settings → Pages → branch: main, folder: / (root) |
| La página carga pero da 404 | `index.html` no está en la raíz | Verificar `git ls-files` incluya `index.html` |
| La página carga pero el alumno no ve sus cambios | Caché del navegador | Forzar recarga con Ctrl+Shift+R |

---

## Lista de verificación al final

- [ ] El repo es público
- [ ] El `git remote -v` apunta a SU cuenta
- [ ] El `index.html` tiene su nombre real
- [ ] El workflow de GitHub Actions terminó con éxito
- [ ] La URL pública carga y muestra su nombre

---

## Notas pedagógicas

- La práctica es **exitosa** cuando el estudiante ve su nombre en internet. No medir nada más.
- Los errores con el token PAT son la causa #1 de fricción. Tener un tutorial impreso o impreso en pizarra.
- Si un estudiante no puede hacer push por credenciales, depurar antes de seguir. No avanzar al Pages sin push exitoso.
- El docente debe **abrir su propia página** primero para mostrar a los alumnos que funciona.
