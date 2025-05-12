
# Proyecto Módulo 5 - LlamarAPI

Este es un proyecto realizado como parte del **Módulo 5** del bootcamp de desarrollo web. El sistema permite **consultar recetas de cocina** haciendo un llamado a una API pública. Las recetas son mostradas dinámicamente en pantalla con su información correspondiente.

---

## Demo en:

Puede ver el proyecto en:  
https://68220fc14690e10450f78ba6--llamarapi.netlify.app/

---

## API utilizada

El proyecto consume datos desde la API pública de [TheMealDB](https://www.themealdb.com/), usando el siguiente endpoint:

```
https://www.themealdb.com/api/json/v1/1/search.php?s=
```

Se realiza una búsqueda de recetas por nombre y se muestran los resultados con su imagen, nombre, instrucciones y otros datos relevantes.
De las tarjetas, solo funciona el boton de agregar al carrito
Se puede hacer una compra la cual se guarda en localStorage
Permite ver el historial de la compra en mis compras
---

## ⚙️ Tecnologías utilizadas

- **React**
- **Vite**
- **Material UI**
- **Axios**
- HTML / CSS / JS

---

## 🚀 Cómo ejecutar el proyecto localmente

---
---
1. Clonar el repositorio en:


git clone https://github.com/carlockk/proyectoModulo5.git
cd proyectoModulo5


2. Instalar las dependencias:
npm install

3. Ejecutar el proyecto:
npm run dev


4. Abrir el navegador:

http://localhost:5173

---
---
## Estructura

- `/src`: Código fuente principal
  - `App.jsx`: Componente principal
  - `components/`: Componentes reutilizables
  - `services/`: Lógica de llamada a la API
- `public/`: Archivos estáticos
- `.gitignore`: Ignora `node_modules`, `dist`, `.env`
- `vite.config.js`: Configuración del bundler



## Netlify

El proyecto está desplegado en Netlify, utilizando:
- Comando de build: `npm run build`
- Carpeta publicada: `dist`

---
