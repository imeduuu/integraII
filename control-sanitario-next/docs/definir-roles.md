# Definición de Roles en el Sistema

Este documento describe los roles implementados en la base de datos y su función dentro del sistema de gestión de adopciones y avistamientos de animales.

## Roles Definidos

### **Admin**

* Gestión global del sistema.
* Acceso a todas las organizaciones y usuarios.
* Puede crear, editar y eliminar registros en todas las entidades.

### **Usuario**

* Usuario estándar registrado.
* Puede realizar solicitudes de adopción.
* Puede registrar avistamientos de animales.
* Acceso restringido a sus propios datos.

### **Organización**

* Representa instituciones o refugios de animales.
* Puede gestionar animales asociados a su organización.
* Puede aprobar o rechazar solicitudes de adopción relacionadas con sus animales.

### **Voluntario**

* Apoya a una organización específica.
* Puede registrar avistamientos y actualizar el estado de animales asignados.
* No tiene permisos de administración global.

---

## Notas

* Los roles están precargados en la base de datos mediante el **seed de Prisma**.
* La administración de permisos más detallados puede definirse a nivel de aplicación (Next.js) si fuese necesario.

Cambios en package.json:
Se resolvió un conflicto entre la versión local y remota para unificar dependencias y devDependencies.
Se agregó ts-node como devDependency para permitir la ejecución del script de seed en TypeScript.
Se actualizaron versiones de typescript y @types/node para mantener consistencia con el proyecto.