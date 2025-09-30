# 📚 Documentación del Proyecto - Control Sanitario Next

## 🏗️ Arquitectura General del Proyecto

**Huella Segura** es una aplicación web desarrollada en Next.js con TypeScript que permite la gestión de control sanitario de animales, adopciones y organizaciones. La aplicación cuenta con tres tipos de roles principales: **Admin**, **Usuario** y **Organización**.

### 📁 Estructura de Carpetas y Organización Modular

```
control-sanitario-next/
├── 📁 docs/                    # 📚 Documentación técnica y de usuario
│   ├── a11y.md                # Guías de accesibilidad web
│   ├── casos-de-uso.md        # Especificación de casos de uso
│   ├── componentes.md         # Arquitectura de componentes
│   ├── estandares-desarrollo.md # Estándares y convenciones
│   ├── guia-frontend.md       # Guía específica del frontend
│   ├── manual-usuario.md      # Manual para usuarios finales
│   └── notificaciones.md      # Sistema de notificaciones
├── 📁 prisma/                 # 🗄️ Gestión de base de datos
│   ├── schema.prisma          # Esquema completo de PostgreSQL
│   ├── seed.ts               # Datos iniciales y de prueba
│   └── migrations/           # Historial de cambios en BD
├── 📁 public/                # 🌐 Recursos estáticos públicos
│   └── *.png, *.ico          # Imágenes, iconos, assets
├── 📁 src/                   # 💻 Código fuente principal
│   ├── 📁 components/        # 🧩 Componentes React reutilizables
│   │   ├── ui/              # Componentes base de UI (Button, Modal, etc.)
│   │   ├── Navbar.tsx       # Navegación principal
│   │   ├── Footer.tsx       # Pie de página
│   │   ├── UserTable.tsx    # Tabla avanzada de usuarios
│   │   ├── *Modal.tsx       # Modales específicos
│   │   └── *Form.tsx        # Formularios especializados
│   ├── 📁 context/          # 🌍 Estado global de la aplicación
│   │   ├── NotificationContext.tsx # Sistema de notificaciones
│   │   └── userMock.ts      # Mock de usuario (desarrollo)
│   ├── 📁 hooks/            # 🪝 Lógica reutilizable de React
│   │   └── useNotification.ts # Hook para notificaciones
│   ├── 📁 pages/            # 🗂️ Páginas y routing de Next.js
│   │   ├── 📁 admin-*/      # Módulo de administración
│   │   ├── 📁 org-*/        # Módulo de organizaciones  
│   │   ├── index.tsx        # Página de inicio
│   │   ├── login.tsx        # Autenticación
│   │   ├── *.tsx           # Páginas específicas por funcionalidad
│   │   └── _app.tsx        # Configuración global de la app
│   ├── 📁 services/         # 🔧 Lógica de negocio y APIs
│   │   ├── api.ts          # Cliente HTTP base (Axios)
│   │   ├── prismaExamples.ts # Ejemplos de operaciones DB
│   │   └── mock*.ts        # Datos de prueba
│   ├── 📁 styles/           # 🎨 Estilos CSS modulares
│   │   ├── *.module.css    # Estilos específicos por página
│   │   └── globals.css     # Estilos globales
│   └── 📁 utils/            # 🛠️ Utilidades y helpers
│       ├── validators.ts   # Validaciones de datos
│       └── helpers.ts      # Funciones auxiliares
├── next.config.js           # ⚙️ Configuración de Next.js
├── tailwind.config.js       # 🎨 Configuración de Tailwind CSS
├── tsconfig.json           # 📝 Configuración de TypeScript
└── package.json            # 📦 Dependencias y scripts
```

## 🏗️ Arquitectura Modular por Funcionalidad

### **🎯 Principios de Organización**

#### **1. Separación por Responsabilidad**
Cada carpeta tiene una **función específica y bien definida**:

- **`/components`** → Elementos reutilizables de UI
- **`/pages`** → Páginas específicas y routing
- **`/services`** → Lógica de negocio y comunicación con APIs
- **`/utils`** → Funciones puras y helpers
- **`/context`** → Estado global compartido
- **`/hooks`** → Lógica de estado reutilizable

## 🛠️ Stack Tecnológico

### **Frontend**
- **Next.js 14.2.3** - Framework React con SSR/SSG
- **React 18.2.0** - Biblioteca para interfaces de usuario
- **TypeScript 5.9.2** - Tipado estático
- **Tailwind CSS 4.1.13** - Framework CSS utilitario
- **React Hook Form 7.62.0** - Manejo de formularios
- **React Icons 5.5.0** - Iconografía
- **React Toastify 8.2.0** - Notificaciones

### **Backend & Base de datos**
- **Prisma 6.14.0** - ORM para bases de datos
- **PostgreSQL** - Base de datos relacional
- **Axios 1.11.0** - Cliente HTTP

#### **2. Modularización por Roles**
El sistema está **organizado por módulos funcionales** según roles de usuario:

```
📁 pages/
├── � Páginas Públicas
│   ├── index.tsx              # Landing page principal
│   ├── login.tsx              # Autenticación
│   ├── register.tsx           # Registro de usuarios
│   ├── quienes-somos.tsx      # Información institucional
│   └── forgot-password.tsx    # Recuperación de contraseña
├── 👑 Módulo Admin (admin-*)
│   ├── admin-home.tsx         # Dashboard administrativo
│   ├── admin-users.tsx        # Gestión completa de usuarios
│   ├── admin-campaigns.tsx    # Supervisión de campañas
│   └── 📁 admin-users/        # Submódulo de usuarios
│       └── [id].tsx          # Página detalle de usuario específico
│   └── 📁 admin-orgs/         # Submódulo de organizaciones
│       ├── index.tsx         # Lista de organizaciones
│       └── [id].tsx          # Detalle de organización específica
├── 👤 Módulo Usuario (user-*)
│   ├── edit-profile.tsx       # Gestión de perfil personal
│   ├── adopcion.tsx          # Proceso de adopción
│   ├── report.tsx            # Reportes de avistamientos
│   ├── animals.tsx           # Catálogo de animales
│   ├── donations.tsx         # Sistema de donaciones
│   └── alerts.tsx            # Alertas y notificaciones
└── 🏢 Módulo Organización (org-*)
    ├── org-home.tsx          # Panel organizacional
    ├── org-campaigns.tsx     # Gestión de campañas propias
    ├── org-publish-adoption.tsx # Publicar adopciones
    └── org-stats.tsx         # Estadísticas organizacionales
```

#### **3. Escalabilidad del Sistema de Módulos**

**🔄 Para agregar un nuevo módulo:**
```typescript
// 1️⃣ Crear estructura de páginas
pages/
├── nuevo-modulo-home.tsx        # Dashboard del módulo
├── nuevo-modulo-feature1.tsx    # Funcionalidad específica 1
├── nuevo-modulo-feature2.tsx    # Funcionalidad específica 2
└── 📁 nuevo-modulo-detalle/     # Submódulo si es necesario
    ├── index.tsx               # Lista principal
    └── [id].tsx               # Página de detalle

// 2️⃣ Agregar componentes específicos
components/
├── NuevoModuloTable.tsx        # Tabla especializada
├── NuevoModuloForm.tsx         # Formulario del módulo
└── NuevoModuloModal.tsx        # Modal específico

// 3️⃣ Crear servicios relacionados
services/
├── nuevoModuloApi.ts           # API calls
└── nuevoModuloValidation.ts    # Validaciones

// 4️⃣ Estilos modulares
styles/
└── nuevo-modulo.module.css     # Estilos específicos
```

## 🎭 Sistema de Roles y Arquitectura de Permisos

### 👑 **Módulo Administrativo (Admin)**
**Prefijo:** `admin-*` | **Acceso:** Solo administradores

#### **Páginas y Funcionalidades:**
- **`/admin-home`** - Dashboard central con métricas generales
  - 📊 Estadísticas del sistema
  - 🎛️ Accesos rápidos a funciones principales
  - 📈 Indicadores de performance

- **`/admin-users`** - Gestión completa de usuarios
  - 👥 Lista paginada con filtros avanzados
  - ✏️ CRUD completo de usuarios
  - 🔍 Búsqueda en tiempo real por nombre/email
  - 📋 Exportación de reportes

- **`/admin-campaigns`** - Supervisión de campañas
  - 📢 Aprobación/rechazo de campañas
  - 📊 Métricas de efectividad
  - 🎯 Gestión de contenido

- **`/admin-orgs/`** - Gestión de organizaciones
  - 🏢 Lista y detalle de organizaciones
  - ✅ Verificación y validación
  - 📈 Estadísticas organizacionales

### 👤 **Módulo Usuario (User)**
**Acceso:** Usuarios registrados estándar

#### **Páginas y Funcionalidades:**
- **`/edit-profile`** - Gestión de perfil personal
  - 👤 Actualización de datos personales
  - 🔐 Cambio de contraseña
  - 📱 Preferencias de notificación

- **`/adopcion`** - Sistema de adopciones
  - 🐕 Explorar animales disponibles
  - 📝 Formulario de solicitud
  - 📋 Seguimiento de solicitudes

- **`/report`** - Reportes ciudadanos
  - 📍 Geolocalización de avistamientos
  - 📸 Subida de evidencia fotográfica
  - 🏥 Clasificación de urgencia sanitaria

- **`/animals`** - Catálogo público
  - 🔍 Búsqueda y filtros avanzados
  - 📊 Información detallada de cada animal
  - ❤️ Sistema de favoritos

### 🏢 **Módulo Organización (Org)**
**Prefijo:** `org-*` | **Acceso:** Organizaciones verificadas

#### **Páginas y Funcionalidades:**
- **`/org-home`** - Panel organizacional
  - 📊 Dashboard específico de la organización
  - 📈 Métricas de impacto y alcance
  - 🎯 Objetivos y metas

- **`/org-campaigns`** - Gestión de campañas propias
  - ➕ Crear nuevas campañas
  - ✏️ Editar campañas existentes
  - 📊 Análisis de resultados

- **`/org-publish-adoption`** - Publicación de adopciones
  - 📝 Formulario de registro de animales
  - 📸 Gestión de galería fotográfica
  - 🔄 Estados de proceso de adopción

- **`/org-stats`** - Análisis y estadísticas
  - 📈 KPIs organizacionales
  - 📊 Reportes de impacto
  - 📋 Exportación de datos

## 🏗️ Organización Detallada por Carpetas

### 📁 **`/src/components` - Componentes Reutilizables**

#### **🎨 `/ui` - Componentes Base de UI**
```typescript
// Componentes fundamentales del design system
components/ui/
├── Button.tsx              # Botón base con variantes
├── Modal.tsx               # Sistema modal reutilizable
├── Input.tsx               # Input con validaciones
├── Card.tsx                # Contenedor de información
├── LoadingSpinner.tsx      # Indicador de carga
└── Alert.tsx               # Componente de alertas
```

**Propósito:** Proveer elementos básicos consistentes en toda la aplicación.
**Escalabilidad:** Nuevos componentes UI siguen el mismo patrón.

#### **🧩 Componentes Específicos por Funcionalidad**
```typescript
components/
├── 🧭 Navegación
│   ├── Navbar.tsx          # Barra de navegación adaptativa por rol
│   └── Footer.tsx          # Pie de página con enlaces útiles
├── 📊 Tablas y Datos
│   ├── UserTable.tsx       # Tabla avanzada con filtros y paginación
│   ├── AnimalList.tsx      # Lista de animales con card layout
│   └── CampaignList.tsx    # Lista de campañas organizacionales
├── 📝 Formularios
│   ├── AdoptionForm.tsx    # Formulario multi-paso de adopción
│   ├── AuthModal.tsx       # Modal de autenticación
│   └── LoginModal.tsx      # Modal específico de login
├── 🔐 Protección y Seguridad
│   └── ProtectedRoute.tsx  # Wrapper para protección por roles
├── 📍 Mapas y Ubicación
│   └── Map.tsx            # Integración con mapas (Temuco)
├── 🔔 Notificaciones
│   └── NotificationProvider.tsx # Provider de sistema de notificaciones
└── 📊 Métricas y Analytics
    ├── UserMetricsCards.tsx # Cards de métricas de usuario
    └── InfoBox.tsx         # Caja informativa con estadísticas
```

### 📁 **`/src/pages` - Páginas y Routing**

#### **🗂️ Estructura de Routing de Next.js**
```typescript
pages/
├── 🌍 Páginas Públicas (Sin autenticación)
│   ├── index.tsx           # Landing page con hero section
│   ├── quienes-somos.tsx   # Página institucional
│   ├── login.tsx           # Página de autenticación
│   ├── register.tsx        # Registro de nuevos usuarios
│   └── forgot-password.tsx # Recuperación de contraseña
├── 🚫 Control de Acceso
│   ├── access-denied.tsx   # Página de acceso denegado
│   ├── denied.tsx          # Página de permisos insuficientes
│   └── _app.tsx           # Configuración global de Next.js
├── 👑 Módulo Admin (Protegido: solo admin)
│   ├── admin-home.tsx      # Dashboard administrativo principal
│   ├── admin-users.tsx     # Gestión de usuarios con filtros avanzados
│   ├── admin-campaigns.tsx # Supervisión de todas las campañas
│   └── 📁 admin-users/     # Rutas dinámicas de usuarios
│       └── [id].tsx       # Detalle específico de usuario (/admin-users/123)
│   └── 📁 admin-orgs/      # Rutas dinámicas de organizaciones
│       ├── index.tsx      # Lista de organizaciones (/admin-orgs)
│       └── [id].tsx       # Detalle de organización (/admin-orgs/456)
├── 👤 Módulo Usuario (Protegido: usuarios autenticados)
│   ├── edit-profile.tsx    # Edición de perfil personal
│   ├── adopcion.tsx        # Proceso de adopción de mascotas
│   ├── report.tsx          # Sistema de reportes ciudadanos
│   ├── animals.tsx         # Catálogo público de animales
│   ├── donations.tsx       # Sistema de donaciones
│   ├── alerts.tsx          # Centro de alertas y notificaciones
│   └── publications.tsx    # Publicaciones del usuario
└── 🏢 Módulo Organización (Protegido: solo organizaciones)
    ├── org-home.tsx        # Dashboard organizacional
    ├── org-campaigns.tsx   # Gestión de campañas propias
    ├── org-publish-adoption.tsx # Publicar nuevas adopciones
    ├── org-stats.tsx       # Estadísticas y métricas organizacionales
    └── org.tsx            # Perfil público de la organización
```

### � **`/src/services` - Lógica de Negocio**

```typescript
services/
├── 🌐 API y Comunicación
│   ├── api.ts              # Cliente HTTP base (Axios configurado)
│   ├── prismaExamples.ts   # Ejemplos de queries con Prisma
│   └── prismaUser.ts       # Operaciones específicas de usuario
├── 🧪 Datos de Prueba
│   └── mockCampaigns.ts    # Datos mock para desarrollo
└── 🎨 Estilos de Servicios
    └── admin-orgs.module.css # Estilos específicos para admin de orgs
```

**Propósito:** Centralizar la lógica de negocio y comunicación con APIs.
**Escalabilidad:** Cada módulo puede tener su propio archivo de servicios.

### 📁 **`/src/utils` - Utilidades y Helpers**

```typescript
utils/
├── validators.ts           # Funciones de validación de datos
│   ├── isValidEmail()     # Validación de formato de email
│   ├── isNotEmpty()       # Validación de campos requeridos
│   └── validatePassword() # Validación de contraseñas seguras
└── helpers.ts             # Funciones auxiliares generales
    ├── formatDate()       # Formateo de fechas a español chileno
    ├── capitalizeString() # Capitalización de texto
    └── sanitizeInput()    # Limpieza de inputs de usuario
```

### 📁 **`/src/context` - Estado Global**

```typescript
context/
├── NotificationContext.tsx # Sistema centralizado de notificaciones
│   ├── NotificationProvider # Provider para toda la app
│   ├── useNotification()   # Hook para consumir notificaciones
│   └── Toast management    # Gestión de mensajes toast
└── userMock.ts            # Mock de usuario para desarrollo
    └── role simulation    # Simulación de roles (admin/user/org)
```

### 📁 **`/src/hooks` - Lógica Reutilizable**

```typescript
hooks/
├── useNotification.ts     # Hook para sistema de notificaciones
├── usePagination.ts       # Hook para paginación (ejemplo futuro)
├── useAuth.ts            # Hook para autenticación (ejemplo futuro)
└── useApi.ts             # Hook para llamadas API (ejemplo futuro)
```

## 🔄 **Cómo Escalar el Sistema Modular**

### **1️⃣ Agregando un Nuevo Rol (ej: Veterinario)**

```typescript
// Paso 1: Crear módulo de páginas
pages/
└── vet-*/                 # Nuevo módulo veterinario
    ├── vet-home.tsx       # Dashboard veterinario
    ├── vet-appointments.tsx # Gestión de citas
    ├── vet-reports.tsx    # Reportes médicos
    └── vet-animals.tsx    # Seguimiento de animales

// Paso 2: Componentes específicos
components/
├── VetAppointmentForm.tsx # Formulario de citas
├── VetReportModal.tsx     # Modal de reportes médicos
└── VetAnimalCard.tsx      # Card especializada para veterinarios

// Paso 3: Servicios del módulo
services/
├── vetApi.ts              # API calls específicas
└── vetValidations.ts      # Validaciones médicas

// Paso 4: Actualizar navegación
components/Navbar.tsx:
// Agregar enlaces específicos para rol 'vet'
if (userMock.role === 'vet') {
  links = [
    { href: '/vet-home', label: 'Panel Veterinario' },
    { href: '/vet-appointments', label: 'Citas' },
    { href: '/vet-reports', label: 'Reportes' }
  ];
}
```

### **2️⃣ Agregando una Nueva Funcionalidad Transversal**

```typescript
// Ejemplo: Sistema de Chat en tiempo real
├── 📁 components/
│   ├── ChatWindow.tsx     # Ventana de chat
│   ├── ChatMessage.tsx    # Componente de mensaje
│   └── ChatUserList.tsx   # Lista de usuarios conectados
├── 📁 services/
│   ├── chatApi.ts         # WebSocket y API de chat
│   └── chatValidation.ts  # Validación de mensajes
├── 📁 context/
│   └── ChatContext.tsx    # Estado global del chat
├── 📁 hooks/
│   ├── useChat.ts         # Hook principal de chat
│   └── useWebSocket.ts    # Hook para conexión WebSocket
└── 📁 utils/
    └── chatHelpers.ts     # Utilidades de formato y tiempo
```

### **3️⃣ Principios de Escalabilidad Aplicados**

#### **🧩 Modularidad**
- Cada función tiene su propio archivo/carpeta
- Dependencias mínimas entre módulos
- Interfaces bien definidas

#### **🔄 Reutilización**
- Componentes UI base en `/components/ui`
- Hooks personalizados para lógica compartida
- Utilidades en `/utils` para funciones puras

#### **🛡️ Mantenibilidad**
- Convenciones de nombres consistentes
- Separación clara de responsabilidades
- Documentación JSDoc en cada módulo

#### **🚀 Performance**
- Lazy loading con `dynamic` de Next.js
- Componentes optimizados con `React.memo`
- Code splitting automático por rutas

## �📦 Componentes Principales Documentados

### 🧭 **Navbar Component**
**Ubicación:** `src/components/Navbar.tsx`

**Propósito:** Barra de navegación principal que se adapta dinámicamente según el rol del usuario.

```typescript
/**
 * Componente de navegación principal del sistema
 * @description Renderiza menús dinámicos basados en el rol del usuario activo
 * @returns {JSX.Element} Barra de navegación con enlaces específicos por rol
 */
const Navbar = () => {
  const router = useRouter();
  
  /**
   * Determina las clases CSS para enlaces activos
   * @param path - Ruta a evaluar
   * @returns string con clases CSS aplicables
   */
  const getLinkClasses = (path: string) => {
    return `${styles.navLink} ${router.pathname === path ? styles.navLinkActive : ''}`;
  };
  // ...
}
```

**Características:**
- ✅ **Menús dinámicos** por rol de usuario
- ✅ **Indicador visual** de página activa
- ✅ **Responsive design**
- ✅ **Integración con Next.js Router**

---

### 📊 **UserTable Component**
**Ubicación:** `src/components/UserTable.tsx`

**Propósito:** Tabla avanzada para mostrar usuarios con funcionalidades de filtrado y paginación.

```typescript
/**
 * Componente de tabla de usuarios con filtros y paginación
 * @param users - Array de usuarios a mostrar
 * @param usersPerPage - Cantidad de usuarios por página (default: 5)
 * @returns {JSX.Element} Tabla con controles de filtrado y paginación
 */
interface UserTableProps {
  users: User[];
  usersPerPage?: number;
}

const UserTable: React.FC<UserTableProps> = ({ users, usersPerPage = 5 }) => {
  // Estados para paginación y filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterRol, setFilterRol] = useState("");
  // ...
}
```

**Características:**
- ✅ **Filtrado en tiempo real** por nombre, email y rol
- ✅ **Paginación automática**
- ✅ **Enlaces dinámicos** a perfiles de usuario
- ✅ **Manejo de estados vacíos**

---

### 🔔 **NotificationProvider & useNotification Hook**
**Ubicación:** 
- `src/context/NotificationContext.tsx`
- `src/hooks/useNotification.ts`

**Propósito:** Sistema centralizado de notificaciones toast para toda la aplicación.

```typescript
/**
 * Hook personalizado para manejo de notificaciones
 * @description Proporciona acceso al contexto de notificaciones
 * @throws {Error} Si se usa fuera del NotificationProvider
 * @returns {NotificationContextType} Funciones para mostrar notificaciones
 * 
 * @example
 * ```tsx
 * const { showSuccess, showError, showInfo } = useNotification();
 * 
 * const handleSubmit = async () => {
 *   try {
 *     await saveData();
 *     showSuccess('Datos guardados correctamente');
 *   } catch (error) {
 *     showError('Error al guardar los datos');
 *   }
 * };
 * ```
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
```

---

### 🛡️ **ProtectedRoute Component**
**Ubicación:** `src/components/ProtectedRoute.tsx`

**Propósito:** Wrapper para proteger rutas según roles de usuario.

```typescript
/**
 * Componente de protección de rutas basado en roles
 * @param children - Componentes hijos a proteger
 * @param allowedRoles - Array de roles permitidos para acceder
 * @param redirectTo - Ruta de redirección si no tiene permisos
 * @returns {JSX.Element | null} Renderiza children o redirige
 * 
 * @example
 * ```tsx
 * <ProtectedRoute allowedRoles={['admin']} redirectTo="/access-denied">
 *   <AdminPanel />
 * </ProtectedRoute>
 * ```
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}
```

## 🗄️ Base de Datos - Esquema Prisma

### **Modelos Principales**

#### **Usuario**
```typescript
/**
 * Modelo de usuario del sistema
 * @description Representa a los usuarios registrados con sus roles y organizaciones
 */
model usuario {
  id_usuario         Int      @id @default(autoincrement())
  nombre_usuario     String   @db.VarChar(30)
  apellido_paterno   String   @db.VarChar(20)
  apellido_materno   String   @db.VarChar(20)
  fecha_nacimiento   DateTime
  telefono           String?  @db.VarChar(20)
  email              String   @db.VarChar(60)
  password_hash      String   @db.VarChar(255)
  // ... más campos
}
```

#### **Animal**
```typescript
/**
 * Modelo de animal del sistema
 * @description Representa animales disponibles para adopción o reportados
 */
model animal {
  id_animal      Int      @id @default(autoincrement())
  nombre_animal  String   @db.VarChar(30)
  edad_animal    String   @db.VarChar(12)
  // Relaciones con catálogos
  estado_salud   estado_salud @relation(fields: [id_estado_salud], references: [id_estado_salud])
  categoria      categoria     @relation(fields: [id_categoria], references: [id_categoria])
  especie        especie       @relation(fields: [id_especie], references: [id_especie])
}
```

## 🎨 Guía de Estilos y Componentes

### **Convenciones de Nomenclatura**

#### **Archivos y Carpetas**
```typescript
// ✅ CORRECTO - PascalCase para componentes
UserTable.tsx
AdminActionModal.tsx
NotificationProvider.tsx

// ✅ CORRECTO - kebab-case para páginas
admin-users.tsx
edit-profile.tsx
org-campaigns.tsx

// ✅ CORRECTO - kebab-case para estilos
admin-users.module.css
navbar.module.css
```

#### **Variables y Funciones**
```typescript
// ✅ CORRECTO - camelCase
const userList = [];
const handleUserSubmit = () => {};
const isUserActive = true;

// ✅ CORRECTO - PascalCase para componentes
const UserProfile = () => {};
const AdminPanel = () => {};
```

#### **Constantes**
```typescript
// ✅ CORRECTO - UPPER_SNAKE_CASE
const MAX_USERS_PER_PAGE = 10;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
```

### **Estructura de Componentes Recomendada**

```typescript
/**
 * Plantilla estándar para componentes React
 */

// 1️⃣ Imports ordenados
import React, { useState, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import styles from '../styles/component-name.module.css';

// 2️⃣ Definición de tipos/interfaces
interface ComponentProps {
  /** Descripción del prop */
  title: string;
  /** Descripción opcional del prop */
  isVisible?: boolean;
  /** Callback function descripción */
  onSubmit: (data: FormData) => void;
}

// 3️⃣ Constantes del componente
const DEFAULT_PAGE_SIZE = 10;
const ALLOWED_ROLES = ['admin', 'user'];

/**
 * 4️⃣ JSDoc del componente principal
 * @description Descripción detallada del componente
 * @param props - Props del componente
 * @returns JSX.Element
 * 
 * @example
 * ```tsx
 * <MyComponent 
 *   title="Título ejemplo"
 *   isVisible={true}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  isVisible = true, 
  onSubmit 
}) => {
  // 5️⃣ Estados del componente
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  
  // 6️⃣ Hooks
  const router = useRouter();
  
  // 7️⃣ Funciones del componente
  const handleClick = () => {
    // Lógica de manejo
  };
  
  // 8️⃣ useEffect
  useEffect(() => {
    // Efectos secundarios
  }, []);
  
  // 9️⃣ Early returns
  if (!isVisible) return null;
  
  // 🔟 JSX
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {/* Más JSX */}
    </div>
  );
};

export default MyComponent;
```

### **Manejo de Estados**

#### **Estados Locales**
```typescript
// ✅ Para datos simples del componente
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormType>({});
```

#### **Context API**
```typescript
// ✅ Para estado compartido entre componentes
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};
```

### **Estilos CSS - Mejores Prácticas**

#### **CSS Modules**
```css
/* admin-users.module.css */

/* ✅ Clases descriptivas con BEM */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.searchInput {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.searchInput:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* ✅ Modificadores claros */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.button--primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.button--secondary {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
}
```

## 🔧 Utilidades y Helpers

### **Validadores Comunes**
```typescript
/**
 * Utilitarios para validación de datos
 * @file src/utils/validators.ts
 */

/**
 * Valida si un email tiene formato correcto
 * @param email - Email a validar
 * @returns true si es válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una cadena no está vacía después de trim
 * @param value - Valor a validar
 * @returns true si no está vacío
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};
```

### **Formatters**
```typescript
/**
 * Utilidades para formateo de datos
 * @file src/utils/formatters.ts
 */

/**
 * Formatea una fecha en formato legible
 * @param date - Fecha a formatear
 * @param locale - Configuración regional (default: 'es-ES')
 * @returns Fecha formateada
 */
export const formatDate = (
  date: Date | string, 
  locale: string = 'es-ES'
): string => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

## 📋 Lista de Verificación para Nuevos Componentes

### ✅ **Antes de crear un componente:**
- [ ] ¿Es realmente necesario un nuevo componente?
- [ ] ¿Puede ser una extensión de uno existente?
- [ ] ¿Seguirá las convenciones de nomenclatura?
- [ ] ¿Dónde debería ubicarse en la estructura?

### ✅ **Durante el desarrollo:**
- [ ] Definir interfaces TypeScript para props
- [ ] Agregar JSDoc completo
- [ ] Implementar manejo de errores
- [ ] Considerar casos edge (loading, error, empty)
- [ ] Aplicar estilos CSS modulares
- [ ] Hacer el componente accesible (a11y)

### ✅ **Después de crear:**
- [ ] Probar en diferentes resoluciones
- [ ] Verificar comportamiento con datos reales
- [ ] Documentar en esta guía si es relevante
- [ ] Agregar ejemplos de uso
- [ ] Revisar performance si maneja muchos datos

## 🚀 Scripts de Desarrollo

```bash
# Desarrollo local
npm run dev           # Inicia servidor de desarrollo en http://localhost:3000

# Construcción
npm run build         # Genera build de producción
npm run start         # Inicia servidor de producción

# Base de datos
npx prisma generate   # Genera cliente de Prisma
npx prisma db push    # Sincroniza esquema con BD
npx prisma db seed    # Ejecuta seed de datos iniciales
npx prisma studio     # Abre interfaz visual de BD
```

## 🐛 Debugging y Resolución de Problemas

### **Problemas Comunes**

#### **Error: useNotification must be used within a NotificationProvider**
```typescript
// ❌ Problema: Hook usado fuera del provider
const MyComponent = () => {
  const { showSuccess } = useNotification(); // Error aquí
};

// ✅ Solución: Envolver en provider
<NotificationProvider>
  <MyComponent />
</NotificationProvider>
```

#### **Error: Cannot find module '../styles/...'**
```typescript
// ❌ Problema: Ruta incorrecta a estilos
import styles from '../styles/nonexistent.module.css';

// ✅ Solución: Verificar ruta y existencia del archivo
import styles from '../styles/admin-users.module.css';
```

#### **Roles no funcionan correctamente**
```typescript
// ❌ Problema: userMock con rol incorrecto
export const userMock = {
  role: "invalid_role"
};

// ✅ Solución: Usar roles válidos
export const userMock = {
  role: "admin" // "user", "admin", "org"
};
```

## 📚 Recursos Adicionales

### **Documentación de Dependencias**
- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 📖 [React Documentation](https://react.dev)
- 📖 [Prisma Documentation](https://www.prisma.io/docs)
- 📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- 📖 [TypeScript Documentation](https://www.typescriptlang.org/docs)

### **Guías Internas**
- 📄 `docs/estandares-desarrollo.md` - Estándares de desarrollo
- 📄 `docs/a11y.md` - Guía de accesibilidad
- 📄 `docs/manual-usuario.md` - Manual de usuario final

---

## 🤝 Contribuir al Proyecto

### **Para nuevos integrantes:**

#### **1️⃣ Setup Inicial y Comprensión**
```bash
# Clonar y configurar
git clone <repository>
cd control-sanitario-next
npm install
cp .env.example .env # Configurar variables de entorno
npx prisma generate
npm run dev
```

#### **2️⃣ Roadmap de Aprendizaje**
1. **📖 Documentación (30-45 min)**
   - Leer este README completo
   - Revisar `/docs/guia-componentes.md`
   - Explorar comentarios JSDoc en el código

2. **🧭 Navegación del Sistema (15-20 min)**
   - Cambiar rol en `src/context/userMock.ts` 
   - Explorar cada módulo: admin, user, org
   - Probar funcionalidades de filtros y navegación

3. **🏗️ Arquitectura de Código (20-30 min)**
   - Revisar estructura de `/src/pages`
   - Analizar componentes en `/src/components`
   - Entender flujo de datos en contextos

4. **🧪 Desarrollo Práctico (30 min)**
   - Crear un componente simple siguiendo plantillas
   - Agregar una página nueva a un módulo existente
   - Probar sistema de notificaciones

#### **3️⃣ Checklist de Comprensión**
- [ ] ¿Entiendes la diferencia entre módulos admin/user/org?
- [ ] ¿Sabes dónde crear un nuevo componente reutilizable?
- [ ] ¿Comprendes cómo funciona el sistema de routing?
- [ ] ¿Puedes identificar dónde van los servicios API?
- [ ] ¿Conoces las convenciones de nomenclatura?

#### **4️⃣ Primeras Contribuciones Recomendadas**
1. **🎨 Mejoras de UI:** Agregar animaciones o mejorar estilos
2. **📝 Componentes Simples:** Crear cards informativos o botones especializados  
3. **🔧 Utilidades:** Agregar validadores o helpers en `/utils`
4. **📄 Documentación:** Mejorar JSDoc o agregar ejemplos

#### **5️⃣ Antes de Hacer Cambios**
- ✅ **Entender el propósito** del cambio solicitado
- ✅ **Identificar el módulo correcto** donde implementar
- ✅ **Seguir convenciones** de nomenclatura y estructura  
- ✅ **Agregar documentación JSDoc** a nuevas funciones
- ✅ **Probar en diferentes roles** de usuario
- ✅ **Verificar responsive design** en móviles

### **Flujo de trabajo recomendado:**

```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollar siguiendo las guías
# 3. Documentar cambios
# 4. Probar funcionalidad

# 5. Commit descriptivo
git commit -m "feat: agregar funcionalidad de búsqueda avanzada en UserTable"

# 6. Push y PR
git push origin feature/nueva-funcionalidad
```

---

**🎉 ¡Bienvenido al equipo de desarrollo de Huella Segura!**

> Este documento es un recurso vivo que debe actualizarse conforme evoluciona el proyecto. Si encuentras información desactualizada o faltante, ¡ayúdanos a mejorarla!
