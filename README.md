# API REST - PROYECTO FINAL

Una API REST completa construida con Node.js, Express.js y Firebase Firestore que incluye autenticación JWT y manejo de productos.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Middlewares](#middlewares)
- [Modelos de Datos](#modelos-de-datos)
- [Manejo de Errores](#manejo-de-errores)
- [Scripts Disponibles](#scripts-disponibles)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 🚀 Características

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ CRUD completo para productos
- ✅ Registro y login de usuarios
- ✅ Middleware de verificación de tokens
- ✅ Manejo centralizado de errores
- ✅ Validación de datos
- ✅ Integración con Firebase Firestore
- ✅ Configuración CORS personalizable
- ✅ Encriptación de contraseñas con bcrypt

## 🛠️ Tecnologías Utilizadas

### Dependencias de Producción

- **express** (^5.2.1) - Framework web para Node.js
- **firebase** (^12.6.0) - SDK de Firebase para integración con Firestore
- **jsonwebtoken** (^9.0.3) - Implementación de JWT para autenticación
- **bcrypt** (^6.0.0) - Librería para hash de contraseñas
- **cors** (^2.8.5) - Middleware para configurar CORS
- **dotenv** (^17.2.3) - Carga variables de entorno desde .env
- **morgan** (^1.10.1) - Logger de HTTP requests

### Dependencias de Desarrollo

- **nodemon** (^3.1.11) - Reinicio automático del servidor durante desarrollo

## 📋 Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta de Firebase con proyecto configurado
- Base de datos Firestore habilitada

## 📦 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/Ariel-1979/Proyecto-Final.git
cd Proyecto-Final
```

2. **Instala las dependencias**

```bash
npm install
```

## ⚙️ Configuración

1. **Crea un archivo `.env` en la raíz del proyecto** con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# JWT Secret Key (genera una clave segura)
JWT_SECRET=tu-clave-secreta-jwt-muy-segura

# Firebase Configuration
FIREBASE_API_KEY=tu-api-key
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

2. **Configura Firebase Firestore**
   - Ve a la [Consola de Firebase](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita Firestore Database
   - Obtén las credenciales de configuración

## 📁 Estructura del Proyecto

```
Proyecto-Final/
├── index.js                           # Archivo principal del servidor
├── package.json                       # Dependencias y scripts
├── README.md                          # Documentación del proyecto
└── src/
    ├── middlewares/                   # Middlewares personalizados
    │   ├── error-handler.js          # Middleware para manejo de errores
    │   ├── not-found.js              # Middleware para rutas 404
    │   └── verify-token.js           # Middleware de verificación JWT
    ├── modules/                      # Módulos de la aplicación
    │   ├── auth/                     # Módulo de autenticación
    │   │   ├── auth.controller.js    # Controlador de auth
    │   │   ├── auth.model.js         # Modelo de usuario
    │   │   ├── auth.routes.js        # Rutas de auth
    │   │   ├── auth.service.js       # Servicios de auth
    │   │   └── utils/
    │   │       ├── jwt.js            # Utilidades JWT
    │   │       ├── password-hash.js  # Hash de contraseñas
    │   │       └── validate-user.js  # Validación de usuarios
    │   └── products/                 # Módulo de productos
    │       ├── products.controller.js # Controlador de productos
    │       ├── products.model.js     # Modelo de producto
    │       ├── products.routes.js    # Rutas de productos
    │       ├── products.service.js   # Servicios de productos
    │       └── utils/
    │           └── validate-product-data.js # Validación de productos
    ├── routes/
    │   └── index.js                  # Configuración principal de rutas
    └── utils/
        ├── cors-options.js           # Configuración CORS
        ├── firebase.js              # Configuración Firebase
        └── http-error.js            # Utilidades de errores HTTP
```

## 🛣️ API Endpoints

### 🔐 Autenticación

Todas las rutas de autenticación están bajo el prefijo `/auth`

| Método | Endpoint         | Descripción             | Autenticación |
| ------ | ---------------- | ----------------------- | ------------- |
| POST   | `/auth/register` | Registrar nuevo usuario | No            |
| POST   | `/auth/login`    | Iniciar sesión          | No            |

### 📦 Productos

Todas las rutas de productos están bajo el prefijo `/api` y requieren autenticación

| Método | Endpoint              | Descripción                 | Autenticación |
| ------ | --------------------- | --------------------------- | ------------- |
| GET    | `/api/products`       | Obtener todos los productos | Sí            |
| GET    | `/api/product/:id`    | Obtener producto por ID     | Sí            |
| POST   | `/api/product/create` | Crear nuevo producto        | Sí            |
| PUT    | `/api/product/:id`    | Actualizar producto         | Sí            |
| DELETE | `/api/product/:id`    | Eliminar producto           | Sí            |

## 🔑 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. **Registro/Login**: El usuario se registra o inicia sesión
2. **Token**: Se devuelve un JWT en la respuesta
3. **Autorización**: Incluir el token en el header `Authorization: Bearer <token>`
4. **Verificación**: El middleware `verifyToken` valida el token en rutas protegidas

### Flujo de Autenticación:

```
Cliente → POST /auth/login → Servidor valida credenciales → Devuelve JWT
Cliente → Incluye JWT en headers → Servidor verifica token → Acceso permitido
```

## 🛡️ Middlewares

### 1. **verifyToken** - Verificación JWT

- **Ubicación**: `src/middlewares/verify-token.js`
- **Función**: Valida tokens JWT en rutas protegidas
- **Uso**: Aplicado automáticamente a todas las rutas `/api/*`

### 2. **errorHandlerMiddleware** - Manejo de Errores

- **Ubicación**: `src/middlewares/error-handler.js`
- **Función**: Captura y maneja errores de la aplicación
- **Respuesta**: JSON con mensaje de error estructurado

### 3. **notFoundMiddleware** - Rutas 404

- **Ubicación**: `src/middlewares/not-found.js`
- **Función**: Maneja rutas que no existen
- **Respuesta**: Error 404 con mensaje apropiado

### 4. **CORS** - Cross-Origin Resource Sharing

- **Ubicación**: `src/utils/cors-options.js`
- **Función**: Configura políticas CORS personalizadas

### 5. **Morgan** - HTTP Logger

- **Función**: Registra todas las peticiones HTTP en consola
- **Configuración**: Modo 'dev' para desarrollo

## 📊 Modelos de Datos

### Usuario (Auth Model)

```javascript
{
  username: String,    // Nombre de usuario único
  password: String     // Contraseña hasheada con bcrypt
}
```

### Producto (Product Model)

```javascript
{
  id: String,         // ID único del producto
  name: String,       // Nombre del producto
  description: String, // Descripción del producto
  price: Number,      // Precio del producto
  category: String,   // Categoría del producto
  stock: Number       // Cantidad en stock
}
```

## ⚠️ Manejo de Errores

La API implementa un sistema centralizado de manejo de errores:

### Tipos de Errores:

- **400** - Bad Request (datos inválidos)
- **401** - Unauthorized (token inválido/ausente)
- **404** - Not Found (recurso no encontrado)
- **500** - Internal Server Error (error del servidor)

### Estructura de Respuesta de Error:

```json
{
  "error": "Descripción del error"
}
```

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor con nodemon para recarga automática

### Producción

```bash
npm start
```

Inicia el servidor en modo producción

### Instalación

```bash
npm install
```

Instala todas las dependencias

## 💡 Ejemplos de Uso

### 1. Registro de Usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "miPassword123"
  }'
```

**Respuesta:**

```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Inicio de Sesión

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "miPassword123"
  }'
```

**Respuesta:**

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "usuario123"
  }
}
```

### 3. Obtener Todos los Productos

```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta:**

```json
[
  {
    "id": "IhtdckySPhsXnWwXtRw0",
    "name": "Camiseta de Boca",
    "categories": ["ropa", "deportes"],
    "price": 1490
  }
]
```

### 4. Crear Nuevo Producto

```bash
curl -X POST http://localhost:3000/api/product/create \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Camiseta de Futbol",
    "price": 899.99,
    "categories": ["deportes"],
  }'
```

### 5. Actualizar Producto

```bash
curl -X PUT http://localhost:3000/api/product/prod123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Camiseta de Futbol",
    "price": 899.99,
    "categories": ["deportes"],
  }'
```

### 6. Eliminar Producto

```bash
curl -X DELETE http://localhost:3000/api/product/prod123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔧 Configuración Avanzada

### Variables de Entorno (.env)

```env
# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_API_KEY=AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=mi-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=mi-proyecto-12345
FIREBASE_STORAGE_BUCKET=mi-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# CORS (opcional)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Configuración CORS

El archivo [src/utils/cors-options.js](src/utils/cors-options.js) permite configurar:

- Orígenes permitidos
- Métodos HTTP permitidos
- Headers personalizados
- Credenciales

### Configuración Firebase

1. **Crear proyecto en Firebase Console**
2. **Habilitar Firestore Database**
3. **Configurar reglas de seguridad:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Ajustar según necesidades
    }
  }
}
```

## 🔒 Seguridad

### Medidas Implementadas:

- ✅ **Hash de contraseñas**: bcrypt con salt rounds
- ✅ **JWT tokens**: Autenticación sin estado
- ✅ **Validación de entrada**: Sanitización de datos
- ✅ **CORS configurado**: Control de orígenes
- ✅ **Middleware de errores**: No exposición de stack traces
- ✅ **Variables de entorno**: Credenciales protegidas

## 👨‍💻 Autor

**Ariel Leopoldo Dominguez**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 📝 Notas de Desarrollo

### Estructura de Archivos Importantes:

#### [index.js](index.js) - Servidor Principal

- Configuración de Express
- Middlewares globales
- Configuración de rutas
- Inicialización del servidor

#### [src/routes/index.js](src/routes/index.js) - Router Principal

- Configuración de rutas principales
- Aplicación de middleware de autenticación
- Distribución a módulos específicos

#### Módulos:

- **[auth/](src/modules/auth/)**: Manejo completo de autenticación
- **[products/](src/modules/products/)**: CRUD de productos
- Cada módulo sigue el patrón MVC

#### Middlewares:

- **[verify-token.js](src/middlewares/verify-token.js)**: Verificación JWT
- **[error-handler.js](src/middlewares/error-handler.js)**: Manejo centralizado de errores
- **[not-found.js](src/middlewares/not-found.js)**: Manejo de rutas inexistentes

Este README proporciona una guía completa para entender, instalar, configurar y usar la API REST del proyecto final.
