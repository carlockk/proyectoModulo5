
# Proyecto Módulo 5 - LlamarAPI

Este es un proyecto realizado como parte del **Módulo 5** del bootcamp de desarrollo web. El sistema permite **consultar recetas de cocina** haciendo un llamado a una API pública. Las recetas son mostradas dinámicamente en pantalla con su información correspondiente.

---

## Puede ver el proyecto en Netlify

El proyecto se despliega utilizando:
- Comando de build: `npm run build`
- Carpeta publicada: `dist`

Se agrego _redirects para evitar el error 404 entre URLs

URL:
[https://68220fc14690e10450f78ba6--llamarapi.netlify.app/](https://llamarapi.netlify.app/)

---

## API utilizada

El proyecto consume datos desde la API pública de [TheMealDB](https://www.themealdb.com/), usando el siguiente endpoint:

```
https://www.themealdb.com/api/json/v1/1/search.php?s=
```
Es un sitio web que muestra un Home con un slider de imágenes deslizantes, unas tarjetas con productos destacados, un sobre nosotros, un historial de compra que funciona, un carrito de compra que recibe las recetas y se puede finalizar la compra pudiendo revisar en mis compras el historial.
Se muestran las recetas en productos y son llamadas desde la API con su imagen, nombre, instrucciones y abre un modal con todos los datos de cada receta.
De las tarjetas, solo funciona el boton de agregar al carrito, los otros 2 iconos son de adorno.
La compra se guarda en localStorage
---

## Tecnologías utilizadas

- **React**
- **Vite**
- **Material UI**
- **Axios**
- HTML / CSS / JS
- skeleton
---

## puede ver el proyecto de manera local:

1. Clonar el repositorio en:

git clone https://github.com/carlockk/proyectoModulo5.git
cd proyectoModulo5

2. Instalar las dependencias:
npm install

3. Ejecutar el proyecto:
npm run dev

4. Abrir el navegador:
http://localhost:5173 (aveces me ha tocado que me abre con otro puerto)

---
## Estructura

```txt
public
  ├── _redirects
  └── vite.svg

src
  ├── assets
  │   └── react.svg
  ├── components
  │   ├── ErrorBoundary.jsx
  │   ├── FormularioCompra.jsx
  │   ├── FormularioContacto.jsx
  │   ├── Layout.jsx
  │   └── NavbarComponent.jsx
  ├── context
  │   └── CarritoContext.jsx
  ├── pages
  │   ├── About.jsx
  │   ├── Carrito.jsx
  │   ├── HistorialCompras.jsx
  │   ├── Home.jsx
  │   ├── RecipeDetail.jsx
  │   └── RecipeList.jsx
  ├── App.css
  ├── App.jsx
  ├── Router.jsx
  ├── index.css
  └── main.jsx

.gitignore  
README.md  
eslint.config.js  
index.html  
package-lock.json  
---
```
---
Se agrego un formulario de contacto que se muestra a traves de una ventana modal desde el boton Contáctanos ubicado en la parte superior del navbar.
Se utilizo Material UI para el formulario y  <Box sx= con estilos responsive para el modal.
El boton enviar no funciona, es solo visual
---

