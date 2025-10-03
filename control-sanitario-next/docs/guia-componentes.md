# 🧩 Guía de Componentes - Huella Segura

## 🏗️ Arquitectura Modular del Sistema

### **🎯 Principios de Organización Modular**

El sistema **Huella Segura** está estructurado siguiendo principios de **arquitectura modular** que facilitan:
- ✅ **Escalabilidad** - Agregar nuevas funcionalidades sin afectar código existente
- ✅ **Mantenibilidad** - Localizar y modificar código específico fácilmente  
- ✅ **Reutilización** - Componentes que se usan en múltiples partes del sistema
- ✅ **Colaboración** - Múltiples desarrolladores trabajando en paralelo
- ✅ **Testing** - Pruebas aisladas por módulo y componente

### **📁 Mapa de Organización por Responsabilidades**

```
🏗️ ARQUITECTURA MODULAR
├── 🎨 UI/UX Layer (Presentación)
│   ├── � components/ui/          # Design System Base
│   ├── 📁 styles/                # CSS Modules por página
│   └── 🎭 Role-based Navigation  # Navegación adaptativa
├── 🧠 Business Logic Layer (Lógica)
│   ├── 📁 services/              # API calls y lógica de negocio
│   ├── 📁 utils/                 # Funciones puras y helpers
│   └── 🪝 hooks/                 # Lógica reutilizable de React
├── 🗄️ Data Layer (Datos)
│   ├── 📁 context/               # Estado global compartido
│   ├── 🗃️ prisma/               # Esquema y migraciones de BD
│   └── 💾 Mock Data             # Datos de desarrollo y testing
└── 🗂️ Routing Layer (Navegación)
    └── 📁 pages/                 # File-based routing de Next.js
        ├── 👑 admin-*/           # Módulo administrativo
        ├── 👤 user pages/        # Módulo de usuario
        └── 🏢 org-*/            # Módulo organizacional
```

## �📋 Índice de Componentes por Módulo

### 🧭 **Navegación y Layout**
- [Navbar](#navbar) - Barra de navegación adaptativa por rol
- [Footer](#footer) - Pie de página institucional
- [ProtectedRoute](#protectedroute) - Wrapper de protección por roles

### 📊 **Gestión de Datos (Admin)**
- [UserTable](#usertable) - Tabla avanzada con filtros y paginación
- [AdminActionModal](#adminactionmodal) - Modales de confirmación
- [UserMetricsCards](#usermetricscards) - Cards de estadísticas
- [InfoBox](#infobox) - Cajas informativas con datos

### 🎨 **UI Base (Design System)**
- [Button](#button) - Botón base con variantes
- [Modal](#modal) - Sistema modal reutilizable
- [Alert](#alert) - Alertas y notificaciones
- [Input](#input) - Campos de entrada con validación

### 🔐 **Autenticación y Seguridad**
- [LoginModal](#loginmodal) - Modal de inicio de sesión
- [AuthModal](#authmodal) - Modal de autenticación general
- [Access Control](#access-control) - Sistema de permisos

### 📝 **Formularios Especializados**
- [AdoptionForm](#adoptionform) - Formulario multi-paso de adopción
- [UserDetail](#userdetail) - Detalles y edición de usuario
- [ReportForm](#reportform) - Formulario de reportes ciudadanos

### 🏢 **Módulo Organizacional**
- [OrgView](#orgview) - Vista de perfil organizacional
- [CampaignList](#campaignlist) - Lista de campañas
- [OrgStats](#orgstats) - Estadísticas organizacionales

### 📍 **Geolocalización y Mapas**
- [Map](#map) - Integración con mapas de Temuco
- [LocationPicker](#locationpicker) - Selector de ubicación

### 🔔 **Sistema de Notificaciones**
- [NotificationProvider](#notificationprovider) - Provider global
- [Toast](#toast) - Notificaciones toast
- [AlertSystem](#alertsystem) - Sistema de alertas

---

## 📖 Documentación Detallada de Componentes

### **Navbar**
**Archivo:** `src/components/Navbar.tsx`

#### **Props Interface**
```typescript
// Sin props - usa userMock para determinar rol
interface NavbarProps {}
```

#### **Funcionalidades**
- ✅ Menú dinámico basado en rol de usuario
- ✅ Indicador visual de página activa
- ✅ Responsive design
- ✅ Enlaces a perfil de usuario

#### **Uso**
```tsx
import Navbar from '../components/Navbar';

// Uso básico - se adapta automáticamente al rol
<Navbar />
```

#### **Estilos CSS**
```css
/* navbar.module.css */
.navbar { /* Contenedor principal */ }
.navbarTitle { /* Título del sitio */ }
.navbarLinks { /* Contenedor de enlaces */ }
.navLink { /* Estilo base de enlaces */ }
.navLinkActive { /* Enlace de página activa */ }
.profileSection { /* Sección de perfil */ }
```

---

### **UserTable**
**Archivo:** `src/components/UserTable.tsx`

#### **Props Interface**
```typescript
interface UserTableProps {
  /** Array de usuarios a mostrar */
  users: User[];
  /** Cantidad de usuarios por página (default: 5) */
  usersPerPage?: number;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}
```

#### **Estados Internos**
```typescript
const [currentPage, setCurrentPage] = useState(1);
const [filterName, setFilterName] = useState("");
const [filterEmail, setFilterEmail] = useState("");
const [filterRol, setFilterRol] = useState("");
```

#### **Funcionalidades**
- ✅ **Filtrado en tiempo real** por nombre, email y rol
- ✅ **Paginación automática** con controles de navegación
- ✅ **Enlaces dinámicos** a páginas de detalle
- ✅ **Manejo de estado vacío**

#### **Uso**
```tsx
import UserTable from '../components/UserTable';

const users = [
  { id: 1, nombre: "Ana Pérez", email: "ana@correo.com", rol: "admin" },
  { id: 2, nombre: "Luis Gómez", email: "luis@correo.com", rol: "user" }
];

// Uso básico
<UserTable users={users} />

// Con paginación personalizada
<UserTable users={users} usersPerPage={10} />
```

#### **Estilos CSS**
```css
/* admin-users.module.css */
.table { /* Tabla principal */ }
.filters { /* Contenedor de filtros */ }
.pagination { /* Controles de paginación */ }
.activePage { /* Página activa en paginación */ }
```

---

### **Modal**
**Archivo:** `src/components/ui/Modal.tsx`

#### **Props Interface**
```typescript
interface ModalProps {
  /** Controla si el modal está visible */
  isOpen: boolean;
  /** Función para cerrar el modal */
  onClose: () => void;
  /** Título del modal */
  title?: string;
  /** Contenido del modal */
  children: React.ReactNode;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Si permite cerrar con ESC o click fuera */
  closable?: boolean;
}
```

#### **Funcionalidades**
- ✅ **Overlay con blur** para enfocar contenido
- ✅ **Cerrar con ESC** o click en overlay
- ✅ **Diferentes tamaños** configurables
- ✅ **Animaciones suaves** de entrada/salida
- ✅ **Accesibilidad completa** (ARIA labels, focus trap)

#### **Uso**
```tsx
import Modal from '../components/ui/Modal';

const [isModalOpen, setIsModalOpen] = useState(false);

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirmar Acción"
  size="md"
>
  <p>¿Estás seguro de realizar esta acción?</p>
  <div className="mt-4 flex gap-2">
    <button onClick={handleConfirm}>Confirmar</button>
    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
  </div>
</Modal>
```

---

### **Alert**
**Archivo:** `src/components/Alert.tsx`

#### **Props Interface**
```typescript
interface AlertProps {
  /** Tipo de alerta */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Mensaje de la alerta */
  message: string;
  /** Título opcional */
  title?: string;
  /** Si se puede cerrar la alerta */
  dismissible?: boolean;
  /** Callback al cerrar */
  onDismiss?: () => void;
  /** Auto-cierre después de X milisegundos */
  autoClose?: number;
}
```

#### **Uso**
```tsx
import Alert from '../components/Alert';

// Alerta de éxito
<Alert 
  type="success" 
  message="Usuario guardado correctamente"
  dismissible={true}
  autoClose={3000}
/>

// Alerta de error
<Alert 
  type="error" 
  title="Error de Validación"
  message="Por favor complete todos los campos requeridos"
/>
```

---

### **ProtectedRoute**
**Archivo:** `src/components/ProtectedRoute.tsx`

#### **Props Interface**
```typescript
interface ProtectedRouteProps {
  /** Componentes a proteger */
  children: React.ReactNode;
  /** Roles permitidos para acceder */
  allowedRoles: Array<'admin' | 'user' | 'org'>;
  /** Ruta de redirección si no tiene permisos */
  redirectTo?: string;
  /** Componente de carga mientras verifica permisos */
  fallback?: React.ReactNode;
}
```

#### **Uso**
```tsx
import ProtectedRoute from '../components/ProtectedRoute';

// Proteger panel de admin
<ProtectedRoute 
  allowedRoles={['admin']} 
  redirectTo="/access-denied"
>
  <AdminPanel />
</ProtectedRoute>

// Múltiples roles permitidos
<ProtectedRoute 
  allowedRoles={['admin', 'org']} 
  redirectTo="/login"
  fallback={<Loading />}
>
  <CampaignManagement />
</ProtectedRoute>
```

---

### **AdoptionForm**
**Archivo:** `src/components/AdoptionForm.tsx`

#### **Props Interface**
```typescript
interface AdoptionFormProps {
  /** ID del animal para adoptar */
  animalId: number;
  /** Callback al enviar formulario */
  onSubmit: (formData: AdoptionFormData) => Promise<void>;
  /** Callback al cancelar */
  onCancel?: () => void;
  /** Datos iniciales del formulario */
  initialData?: Partial<AdoptionFormData>;
}

interface AdoptionFormData {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  housingType: 'house' | 'apartment' | 'other';
  hasOtherPets: boolean;
  experienceWithPets: string;
  reasonForAdoption: string;
  termsAccepted: boolean;
}
```

#### **Funcionalidades**
- ✅ **Validación en tiempo real** con React Hook Form
- ✅ **Múltiples pasos** del formulario
- ✅ **Guardado automático** de borrador
- ✅ **Subida de documentos** requeridos

#### **Uso**
```tsx
import AdoptionForm from '../components/AdoptionForm';

const handleAdoptionSubmit = async (formData: AdoptionFormData) => {
  try {
    await submitAdoptionRequest(formData);
    showSuccess('Solicitud enviada correctamente');
  } catch (error) {
    showError('Error al enviar solicitud');
  }
};

<AdoptionForm
  animalId={selectedAnimal.id}
  onSubmit={handleAdoptionSubmit}
  onCancel={() => setShowForm(false)}
/>
```

---

## 🎨 Patrones de Diseño

### **🔄 Patrón Container/Presentational**

```typescript
// ✅ Container Component - Lógica de negocio
const UserManagementContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (error) {
      showError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserManagementView
      users={users}
      loading={loading}
      onRefresh={fetchUsers}
    />
  );
};

// ✅ Presentational Component - Solo UI
interface UserManagementViewProps {
  users: User[];
  loading: boolean;
  onRefresh: () => void;
}

const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  loading,
  onRefresh
}) => {
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      <button onClick={onRefresh}>Actualizar</button>
      <UserTable users={users} />
    </div>
  );
};
```

### **🪝 Patrón Custom Hook**

```typescript
// ✅ Hook personalizado para lógica reutilizable
/**
 * Hook para manejo de paginación
 * @param data - Array de datos a paginar
 * @param itemsPerPage - Elementos por página
 * @returns Objeto con datos paginados y controles
 */
export const usePagination = <T>(data: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

// Uso del hook
const MyComponent = () => {
  const [users] = useState(mockUsers);
  const {
    paginatedData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    hasNext,
    hasPrev
  } = usePagination(users, 5);

  return (
    <div>
      <UserTable users={paginatedData} />
      <div>
        <button onClick={prevPage} disabled={!hasPrev}>
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={!hasNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
```

### **🎭 Patrón Render Props**

```typescript
// ✅ Componente con render props para máxima flexibilidad
interface DataFetcherProps<T> {
  url: string;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => React.ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return children({ data, loading, error, refetch: fetchData });
};

// Uso con render props
<DataFetcher<User[]> url="/api/users">
  {({ data, loading, error, refetch }) => (
    <div>
      {loading && <LoadingSpinner />}
      {error && <Alert type="error" message={error} />}
      {data && <UserTable users={data} />}
      <button onClick={refetch}>Recargar</button>
    </div>
  )}
</DataFetcher>
```

## 🧪 Testing de Componentes

### **Pruebas Básicas**
```typescript
// UserTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../UserTable';

const mockUsers = [
  { id: 1, nombre: 'Ana Pérez', email: 'ana@test.com', rol: 'admin' },
  { id: 2, nombre: 'Luis Gómez', email: 'luis@test.com', rol: 'user' }
];

describe('UserTable', () => {
  it('should render users correctly', () => {
    render(<UserTable users={mockUsers} />);
    
    expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
    expect(screen.getByText('luis@test.com')).toBeInTheDocument();
  });

  it('should filter users by name', () => {
    render(<UserTable users={mockUsers} />);
    
    const nameFilter = screen.getByPlaceholderText('Filtrar por nombre');
    fireEvent.change(nameFilter, { target: { value: 'Ana' } });
    
    expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
    expect(screen.queryByText('Luis Gómez')).not.toBeInTheDocument();
  });
});
```

## 🔧 Herramientas de Desarrollo

### **Extensiones Recomendadas de VSCode**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "Prisma.prisma",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### **Configuración de Prettier**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

## 🔧 **Arquitectura de Páginas por Módulo**

### **📄 Análisis Detallado de Estructura de Páginas**

#### **🏠 Páginas Públicas (Sin Autenticación)**
```typescript
pages/
├── index.tsx                    # 🌍 Landing Page Principal
│   ├── Hero Section            # Presentación con background de perrito
│   ├── CTA Buttons            # Login/Register con gradientes azules
│   ├── UserMetricsCards       # Estadísticas públicas del sistema
│   ├── Map Integration        # Mapa interactivo de Temuco
│   └── Notification Testing   # Demo del sistema de notificaciones
│
├── login.tsx                   # 🔐 Página de Autenticación
├── register.tsx               # 📝 Registro de Nuevos Usuarios
├── quienes-somos.tsx          # ℹ️ Página Institucional
└── forgot-password.tsx        # 🔑 Recuperación de Contraseña
```

**Propósito:** Punto de entrada público y conversión de visitantes a usuarios registrados.

#### **👑 Módulo Administrativo (admin-*)**
```typescript
pages/admin-*/
├── admin-home.tsx             # 📊 Dashboard Central Administrativo
│   ├── Métricas Generales    # InfoBoxes con estadísticas del sistema
│   ├── Acciones Rápidas      # Botones para funciones principales
│   ├── AdminActionModal      # Modales de confirmación de acciones
│   └── ProtectedRoute        # Wrapper de seguridad para solo admins
│
├── admin-users.tsx            # 👥 Gestión Completa de Usuarios
│   ├── UserTable             # Tabla con filtros avanzados y paginación
│   ├── Filtros Dinámicos     # Búsqueda por nombre, email, rol
│   ├── Search Real-time      # Filtrado instantáneo sin botones
│   └── Navegación Paginada   # Control de páginas con UserTable
│
├── admin-campaigns.tsx        # 📢 Supervisión de Campañas
│   ├── Lista de Campañas     # Todas las campañas del sistema
│   ├── Estados de Aprobación # Pendiente/Aprobado/Rechazado
│   └── Métricas de Efectividad
│
└── 📁 admin-users/           # 🗂️ Rutas Dinámicas de Usuarios
    └── [id].tsx             # 👤 Perfil Detallado de Usuario Específico
└── 📁 admin-orgs/            # 🗂️ Rutas Dinámicas de Organizaciones
    ├── index.tsx            # 🏢 Lista de Organizaciones
    └── [id].tsx             # 🏢 Perfil Detallado de Organización
```

**Escalabilidad Admin:**
```typescript
// Para agregar nueva funcionalidad administrativa:
pages/
├── admin-reports.tsx          # Nueva página de reportes
├── admin-analytics.tsx        # Nueva página de analytics
└── 📁 admin-reports/          # Submódulo de reportes
    ├── index.tsx             # Lista de reportes
    ├── [id].tsx              # Detalle de reporte específico
    └── create.tsx            # Crear nuevo reporte
```

#### **👤 Módulo Usuario Estándar**
```typescript
pages/user-functionality/
├── edit-profile.tsx           # 👤 Gestión de Perfil Personal
│   ├── Formulario de Datos   # Información personal del usuario
│   ├── Cambio de Contraseña  # Seguridad de la cuenta
│   └── Preferencias         # Configuraciones de notificaciones
│
├── adopcion.tsx              # 🐕 Sistema de Adopciones
│   ├── Catálogo de Animales # Grid/lista de animales disponibles
│   ├── AdoptionForm         # Formulario multi-paso de solicitud
│   └── Estado de Solicitudes # Seguimiento de adopciones
│
├── report.tsx                # 📍 Reportes Ciudadanos
│   ├── Geolocalización      # Integración con Map component
│   ├── Upload de Fotos      # Sistema de evidencia fotográfica
│   └── Clasificación Urgencia # Niveles de prioridad sanitaria
│
├── animals.tsx               # 🔍 Catálogo Público de Animales
│   ├── AnimalList           # Lista con filtros por especie/edad
│   ├── AnimalCard           # Cards individuales con información
│   └── Sistema de Favoritos # Marcar animales de interés
│
├── donations.tsx             # 💰 Sistema de Donaciones
└── alerts.tsx               # 🔔 Centro de Alertas Personales
```

#### **🏢 Módulo Organizacional (org-*)**
```typescript
pages/org-*/
├── org-home.tsx              # 🏠 Dashboard Organizacional
│   ├── Métricas Específicas # KPIs de la organización
│   ├── Resumen de Actividad # Campañas activas y estadísticas
│   └── Accesos Rápidos      # Links a funcionalidades principales
│
├── org-campaigns.tsx         # 📢 Gestión de Campañas Propias
│   ├── CampaignList         # Lista de campañas de la organización
│   ├── Crear Nueva Campaña  # Formulario de creación
│   ├── Editar Campañas      # Modificación de campañas existentes
│   └── Análisis de Resultados # Métricas de impacto
│
├── org-publish-adoption.tsx  # 📝 Publicar Adopciones
│   ├── Registro de Animal   # Formulario de datos del animal
│   ├── Galería Fotográfica  # Sistema de upload múltiple
│   ├── Estado del Proceso   # Workflow de adopción
│   └── Historial de Adopciones
│
├── org-stats.tsx            # 📊 Estadísticas Organizacionales
│   ├── KPIs de Impacto      # Métricas de efectividad
│   ├── Reportes Exportables # Generación de informes
│   └── Comparativas Temporales
│
└── org.tsx                  # 🌐 Perfil Público Organizacional
```

### **🔗 Flujo de Navegación Entre Módulos**

```mermaid
graph TB
    A[index.tsx - Landing] --> B[login.tsx]
    B --> C{Role Detection}
    C -->|admin| D[admin-home.tsx]
    C -->|user| E[edit-profile.tsx]
    C -->|org| F[org-home.tsx]
    
    D --> G[admin-users.tsx]
    D --> H[admin-campaigns.tsx]
    G --> I[admin-users/[id].tsx]
    
    E --> J[adopcion.tsx]
    E --> K[report.tsx]
    E --> L[animals.tsx]
    
    F --> M[org-campaigns.tsx]
    F --> N[org-publish-adoption.tsx]
    F --> O[org-stats.tsx]
```

### **📁 Sistema de Archivos y Escalabilidad**

#### **🔄 Patrón de Escalamiento Horizontal**
```typescript
// Ejemplo: Agregar módulo de Veterinarios
pages/
├── vet-home.tsx              # Dashboard veterinario
├── vet-appointments.tsx      # Gestión de citas médicas
├── vet-medical-records.tsx   # Historiales clínicos
├── vet-prescriptions.tsx     # Recetas y tratamientos
└── 📁 vet-animals/           # Submódulo de seguimiento
    ├── index.tsx            # Lista de animales bajo cuidado
    ├── [id].tsx             # Expediente médico detallado
    └── treatment.tsx        # Registro de tratamientos
```

#### **⚡ Optimización de Performance por Módulo**
```typescript
// Lazy loading por módulo
// pages/admin-users.tsx
import dynamic from 'next/dynamic';

// Carga diferida de componentes pesados
const UserTable = dynamic(() => import('../components/UserTable'), {
  loading: () => <UserTableSkeleton />,
  ssr: false
});

const AdminUsersMetrics = dynamic(() => import('../components/AdminUsersMetrics'), {
  loading: () => <MetricsSkeleton />
});
```

## 📚 Recursos de Arquitectura y Referencias

### **📖 Documentación de Patrones**
- 🏗️ **Modular Architecture:** [React Module Patterns](https://reactpatterns.com/)
- 🗂️ **File-based Routing:** [Next.js Routing Guide](https://nextjs.org/docs/routing/introduction)
- 🧩 **Component Architecture:** [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- 🔧 **Scalable React:** [React Scalability Guide](https://www.robinwieruch.de/react-folder-structure/)

### **🛠️ Herramientas de Desarrollo Recomendadas**
- **VSCode Extensions:**
  - Next.js snippets
  - Auto import - ES6, TS, JSX, TSX
  - Bracket pair colorizer
  - Path intellisense
- **Chrome DevTools:**
  - React Developer Tools
  - Next.js DevTools

### **📊 Métricas de Calidad del Código**
```typescript
// Ejemplo de componente bien estructurado
/**
 * Template para nuevos componentes modulares
 * @description Plantilla que sigue los principios de arquitectura modular
 */

// 1️⃣ Imports organizados por tipo
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
// 2️⃣ Componentes UI base
import { Button, Modal, Alert } from '../components/ui';
// 3️⃣ Componentes específicos
import { UserTable, Navbar, Footer } from '../components';
// 4️⃣ Hooks y contextos
import { useNotification } from '../hooks';
// 5️⃣ Servicios y utilidades
import { userApi } from '../services';
import { formatDate, isValidEmail } from '../utils';
// 6️⃣ Estilos y tipos
import styles from '../styles/module.module.css';
import type { User, ApiResponse } from '../types';

// 7️⃣ JSDoc completo
/**
 * Página de gestión de usuarios con funcionalidades modulares
 * @description Implementa tabla con filtros, paginación y CRUD
 * @module AdminUsers
 * @requires ProtectedRoute para acceso de administradores
 */
const NewModulePage: NextPage = () => {
  // 8️⃣ Estado y lógica del componente
  // 9️⃣ JSX con estructura clara
  // 🔟 Export default
};
```

## ✅ Checklist de Arquitectura Modular

### **🏗️ Estructura de Proyecto**
- [ ] ¿Cada módulo tiene responsabilidad única y bien definida?
- [ ] ¿Los archivos están organizados por funcionalidad, no por tipo?
- [ ] ¿Las dependencias entre módulos son mínimas?
- [ ] ¿Se puede agregar un nuevo rol sin modificar código existente?

### **📝 Calidad del Código**
- [ ] JSDoc completo en funciones y componentes principales
- [ ] Props interfaces documentadas con ejemplos
- [ ] Convenciones de nomenclatura consistentes
- [ ] Separación clara entre lógica y presentación

### **🎨 Experiencia de Usuario**
- [ ] Responsive en móviles, tablets y desktop
- [ ] Estados de loading/error/empty manejados
- [ ] Navegación intuitiva entre módulos por rol
- [ ] Feedback visual claro para acciones del usuario

### **🚀 Performance y Escalabilidad**
- [ ] Lazy loading implementado en componentes pesados
- [ ] Code splitting automático por rutas
- [ ] Componentes optimizados con React.memo cuando necesario
- [ ] Estructura preparada para nuevos módulos sin refactoring

### **🧪 Mantenibilidad y Testing**
- [ ] Cada módulo puede probarse de forma aislada
- [ ] Funciones puras en /utils son fácilmente testeable
- [ ] Mock data disponible para desarrollo y testing
- [ ] Documentación actualizada con cada cambio significativo

---

**🎯 Objetivo Final:** Crear un sistema donde cualquier desarrollador pueda agregar funcionalidades nuevas siguiendo los patrones establecidos, sin necesidad de modificar código existente y manteniendo la consistencia arquitectural del proyecto.