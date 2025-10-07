# Aplicación de Streaming de Música + TikTok 🎶📱

## Descripción
Una aplicación que combina las funciones de TikTok y streaming de música, permitiendo a los usuarios crear, compartir y disfrutar de contenido musical y de video.

## Tecnologías Usadas
- Flutter
- Node.js
- PostgreSQL
- MongoDB
- Redis
- AWS S3

## Prerequisitos
- **Flutter SDK**: Asegúrate de tener la última versión de Flutter instalada.
- **Node.js**: Necesitas tener instalado Node.js para el backend.
- **Docker**: Para contenedores y orquestación.
- **Android Studio/Xcode**: Para el desarrollo móvil.

## Pasos de Instalación
### Backend
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Daniel24k543/Create-Repl-Bot.git
   cd Create-Repl-Bot/backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno creando un archivo `.env`.

### Frontend
1. Navegar al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Ejecutar:
   ```bash
   flutter pub get
   ```

## Configuración de Variables de Entorno
Crea un archivo `.env` en el directorio del backend y añade las variables necesarias como:
```
DB_HOST=localhost
DB_USER=usuario
DB_PASS=contraseña
```

## Comandos de Docker
Para iniciar la aplicación usando Docker:
```bash
docker-compose up
```

## Cómo Ejecutar la Aplicación
- Inicia el backend:
   ```bash
   node server.js
   ```
- Inicia el frontend:
   ```bash
   flutter run
   ```

## Descripción de la Estructura del Proyecto
- `/backend`: Código del servidor Node.js.
- `/frontend`: Código de la aplicación Flutter.
- `/docker`: Archivos de configuración de Docker.

## Documentación de Endpoints de la API
- `GET /api/musica`: Obtener lista de música.
- `POST /api/video`: Subir un video.

## Guía de Contribución
1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función:
   ```bash
   git checkout -b feature/nueva-funcion
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m 'Añadir nueva funcion'
   ```
4. Envía un pull request.
