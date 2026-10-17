# Núria Ruiz Font · Portfolio

Portfolio personal de **Núria Ruiz Font**, desarrolladora web y diseñadora UI/UX.

Web estática hecha con HTML, CSS y JavaScript, sin dependencias ni proceso de build. Incluye tres secciones (Inicio, Proyectos y Currículum), menú adaptado a móvil y descarga del CV en PDF.

## Estructura

```
.
├── index.html              # Página principal (todas las secciones)
├── css/styles.css          # Estilos
├── js/main.js              # Navegación entre secciones y menú móvil
├── assets/
│   ├── img/                # Retrato, fondos y capturas de proyectos
│   └── cv/Nuria-Ruiz-Font-CV.pdf
└── .nojekyll               # Evita que GitHub Pages procese el sitio con Jekyll
```

## Verlo en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
npx serve .
# o
python3 -m http.server
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `portfolio` o `<tu-usuario>.github.io`).
2. Sube el contenido de esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Portfolio Núria Ruiz"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<repo>.git
   git push -u origin main
   ```
3. En el repositorio, ve a **Settings › Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`, y guarda.
4. En un par de minutos estará en `https://<tu-usuario>.github.io/<repo>/` (o en `https://<tu-usuario>.github.io/` si el repo se llama así).

## Actualizar contenido

- **CV:** sustituye `assets/cv/Nuria-Ruiz-Font-CV.pdf` por la nueva versión con el mismo nombre.
- **Capturas:** reemplaza las imágenes de `assets/img/` manteniendo el nombre del archivo.
- **Textos:** están directamente en `index.html`.

## Contacto

- Email: [nuriaruizfont@gmail.com](mailto:nuriaruizfont@gmail.com)
- LinkedIn: [linkedin.com/in/nuriaruizfont](https://www.linkedin.com/in/nuriaruizfont/)
