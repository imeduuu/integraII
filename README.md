# Repositorio

Puedes clonar el proyecto con el siguiente comando:

```powershell
git clone https://github.com/imeduuu/integraII.git
```

# Instalación

1. Accede al directorio del proyecto:
   ```powershell
   cd integraII
   ```

2. Instala Node.js:
   - Descárgalo desde https://nodejs.org/ y sigue el instalador para tu sistema operativo.
   - npm se instala automáticamente junto con Node.js.

3. Instala las dependencias del proyecto (incluye React, Prisma, Tailwind, TypeScript, etc.):
   ```powershell
   cd control-sanitario-next
   npm install
   ```
   Esto instalará todas las librerías necesarias listadas en `package.json`.

4. Si necesitas instalar alguna herramienta globalmente, puedes usar:
   ```powershell
   npm install -g prisma
   npm install -g typescript
   npm install -g tailwindcss
   ```
   (Solo si el proyecto o tu flujo de trabajo lo requiere)

5. Inicia la aplicación:
   ```powershell
   npm run dev
   ```
para correr el programa es desde la ruta de control-sanitario-next

6. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

# Notas
- Dudas comunicarlas lo antes posible.

## Base de Datos

### Schema
La base de datos utiliza **Prisma ORM** para manejar sus modelos.  
Los principales son:
- **User**: representa a los usuarios del sistema con sus credenciales y roles.
- **Organization**: representa instituciones u organizaciones que administran los datos.
- **Animal**: contiene la información de los animales registrados en el sistema.

## Prisma ORM: Modelado, Migraciones y Seed

### Estructura del Schema (`prisma/schema.prisma`)
El archivo `schema.prisma` define los modelos de la base de datos. Aquí se especifican las tablas (modelos) como `usuario`, `organizacion`, `animal`, `rol`, `especie`, etc., sus campos, relaciones y restricciones. Cualquier cambio en la estructura de datos debe hacerse aquí.

### Migraciones
Las migraciones permiten versionar y aplicar cambios en la estructura de la base de datos de forma controlada. Cada vez que modifiques el `schema.prisma`, ejecuta:

```bash
npx prisma migrate dev --name <nombre-cambio>
```
Esto generará una nueva carpeta en `prisma/migrations/` con los scripts SQL necesarios. Para aplicar todas las migraciones pendientes:

```bash
npx prisma migrate deploy
```

### Script de Seed (`prisma/seed.ts`)
El archivo `prisma/seed.ts` permite poblar la base de datos con datos de ejemplo o iniciales (roles, usuarios, animales, etc.). Para ejecutarlo:

```bash
npx prisma db seed
```

El script utiliza Prisma Client para insertar datos y puede ser modificado según las necesidades del proyecto.

### Prisma Studio
Prisma Studio es una interfaz visual para explorar y editar los datos de la base de datos. Puedes abrirlo con:

```bash
npx prisma studio
```

### Comandos útiles de Prisma
- Generar el cliente Prisma:
  ```bash
  npx prisma generate
  ```
- Verificar el estado de la base de datos:
  ```bash
  npx prisma migrate status
  ```
- Resetear la base de datos (¡elimina todos los datos!):
  ```bash
  npx prisma migrate reset
  ```

Para más información, consulta la [documentación oficial de Prisma](https://www.prisma.io/docs/).