Aplicación de Menú con 3 Pestañas (Inicio, Perfil, Contacto)
📋 Descripción del Proyecto
Esta es una aplicación móvil híbrida desarrollada con Ionic Framework 7 y React 18. La aplicación cuenta con un sistema de navegación por pestañas que incluye tres pantallas principales:

Inicio - Pantalla de bienvenida con mensaje introductorio

Información Personal - Datos de perfil del usuario con avatar y lista de contactos

Contacto - Enlaces a redes sociales y medio de contacto

🛠️ Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu computadora:

Herramienta Versión Requerida Comando para verificar
Node.js 18.x o superior node -v
npm 9.x o superior npm -v
Ionic CLI 7.x o superior ionic --version
Instalación de requisitos (si no los tienes)
bash

# Instalar Node.js (descargar desde https://nodejs.org)

# Instalar Ionic CLI globalmente

npm install -g @ionic/cli
📥 Instalación del Proyecto
Opción 1: Si ya tienes la carpeta del proyecto
bash

# Navegar a la carpeta del proyecto

cd C:\Users\admin\mis-tabs-app

# Instalar dependencias (solo la primera vez)

npm install
Opción 2: Crear el proyecto desde cero
bash

# Crear nuevo proyecto SIN Capacitor (solo versión web)

ionic start mis-tabs-app tabs --type=react --no-capacitor

# Entrar al proyecto

cd mis-tabs-app

# Instalar dependencias adicionales

npm install @ionic/react @ionic/react-router react-router-dom ionicons
🚀 Cómo Ejecutar la Aplicación
Paso 1: Abrir terminal en la carpeta del proyecto
bash
cd C:\Users\admin\mis-tabs-app
Paso 2: Iniciar el servidor de desarrollo
bash
ionic serve
Paso 3: Ver la aplicación
El navegador se abrirá automáticamente en http://localhost:8100

✅ ¡La aplicación ya está funcionando!

🌐 Acceder desde diferentes dispositivos
En la misma computadora
Abre tu navegador y ve a http://localhost:8100

En tu celular (misma red WiFi)
En la terminal, busca la línea que dice:

text
External: http://192.168.x.x:8100
Copia esa dirección (ejemplo: http://192.168.1.35:8100)

Ábrela en el navegador de tu celular

📁 Estructura del Proyecto
text
mis-tabs-app/
│
├── src/
│ ├── pages/
│ │ ├── Home.tsx # Pantalla de inicio
│ │ ├── Profile.tsx # Información personal
│ │ └── Contact.tsx # Pantalla de contacto
│ │
│ ├── App.tsx # Configuración principal y rutas
│ │
│ ├── theme/
│ │ └── variables.css # Colores y estilos globales
│ │
│ └── components/
│ └── ExploreContainer.tsx # Componente auxiliar
│
├── public/ # Archivos estáticos
├── package.json # Dependencias del proyecto
└── ionic.config.json # Configuración de Ionic
🎨 Personalización
Cambiar el color principal
Edita el archivo src/theme/variables.css:

css
:root {
/_ Cambia este valor por el color que prefieras _/
--ion-color-primary: #ff5722; /_ Naranja _/
/_ Otros ejemplos: #4caf50 (verde), #e91e63 (rosa), #2194f3 (azul) _/
--ion-color-primary-rgb: 255,87,34;
--ion-color-primary-contrast: #ffffff;
}
Modificar la información personal
Edita src/pages/Profile.tsx y cambia los datos:

tsx
<IonLabel>

  <h2>Tu Nombre</h2>  {/* Cambia por tu nombre */}
  <p>Tu profesión</p>  {/* Cambia por tu título */}
</IonLabel>

<IonItem>
  <IonIcon icon={mail} slot="start" />
  <IonLabel>Email: tucorreo@ejemplo.com</IonLabel>  {/* Tu email */}
</IonItem>
Actualizar enlaces de contacto
Edita src/pages/Contact.tsx:

tsx
<IonItem button={true} href="https://wa.me/TUNUMERO" target="_blank">
<IonIcon icon={logoWhatsapp} slot="start" color="success" />
<IonLabel>WhatsApp: +58 XXX XXX XXXX</IonLabel>
</IonItem>
🧪 Comandos Útiles
Comando Descripción
ionic serve Inicia el servidor de desarrollo
ionic serve --port 3000 Inicia en un puerto específico
ionic build Genera la versión de producción
ionic build --prod Genera versión optimizada para producción
npm install Instala/actualiza dependencias
Ctrl + C Detiene el servidor
🐛 Solución de Problemas Comunes
Error: "No se pudo resolver la importación './Tab3.css'"
Solución: Asegúrate de que todos los archivos de páginas tengan el contenido correcto y no referencien archivos CSS antiguos.

bash

# Eliminar archivos CSS que ya no se usan

rm src/pages/Tab\*.css
Error: "Capacitor requires NodeJS >=22.0.0"
Solución: Este error aparece si intentaste instalar Capacitor. Para tu evaluación no lo necesitas. Vuelve a crear el proyecto sin Capacitor:

bash
ionic start mis-tabs-app tabs --type=react --no-capacitor
La página no se actualiza automáticamente
Solución: Recarga forzada en el navegador con Ctrl + Shift + R o reinicia el servidor:

bash

# Detener con Ctrl + C

ionic serve # Iniciar de nuevo
Error "ionic no se reconoce como comando"
Solución: Instalar Ionic CLI nuevamente:

bash
npm install -g @ionic/cli
El puerto 8100 está ocupado
Solución: Usar un puerto diferente:

bash
ionic serve --port 3000
📦 Generar Versión para Producción
Cuando termines el desarrollo y quieras entregar la aplicación:

bash

# Generar build optimizado

ionic build --prod

# Los archivos listos para subir a un servidor estarán en:

# mis-tabs-app/dist/

📱 Probar en Modo Móvil (Herramientas de Desarrollador)
Abre la aplicación en el navegador (http://localhost:8100)

Presiona F12 para abrir las herramientas de desarrollador

Haz clic en el ícono de "Dispositivo móvil" (📱)

Selecciona un dispositivo (iPhone, Pixel, Galaxy, etc.)

La aplicación ahora se verá como en un teléfono real

📄 Licencia
Este proyecto fue desarrollado con fines educativos como parte de una evaluación académica.

👨‍💻 Contacto del Desarrollador
Si tienes preguntas sobre este proyecto:

GitHub: [tuusuario]

Email: tucorreo@ejemplo.com

WhatsApp: +58 XXX XXX XXXX

🙏 Agradecimientos
Ionic Framework - Por facilitar el desarrollo de aplicaciones híbridas

React - Por su elegante forma de construir interfaces

Node.js - Por permitirnos usar JavaScript en el servidor

🔄 Versiones Utilizadas (Verificadas)
text
Node.js: v18.20.8
npm: 10.9.7
Ionic CLI: 7.2.1
React: 18.2.0
Ionic React: 7.0.0
Última actualización: 26 de abril de 2026

⚡ Inicio Rápido (Comandos Esenciales)
bash

# 1. Entrar al proyecto

cd C:\Users\admin\mis-tabs-app

# 2. Ejecutar la app

ionic serve

# 3. Abrir navegador en http://localhost:8100
