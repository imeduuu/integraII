## Cómo usar el Custom Hook useMedicalHistory

### ¿Qué es?
Es un hook personalizado que conecta tus páginas directamente con el servicio `medicalHistory.ts`. Maneja automáticamente:
- Carga de historiales
- Estados de carga y errores
- Crear, actualizar y eliminar registros
- Sincronización automática del estado

### Importar el hook

```typescript
import { useMedicalHistory } from '../hooks/useMedicalHistory';
```

### Uso básico

```typescript
const { historiales, loading, error, crear, actualizar, eliminar, recargar } = useMedicalHistory(animalId);
```

### Propiedades disponibles

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `historiales` | `HistorialMedico[]` | Array de historiales del animal |
| `loading` | `boolean` | Indica si está cargando |
| `error` | `string \| null` | Mensaje de error (si hay) |
| `crear` | `(data) => Promise<void>` | Crear nuevo historial |
| `actualizar` | `(id, data) => Promise<void>` | Actualizar un historial |
| `eliminar` | `(id) => Promise<void>` | Eliminar un historial |
| `recargar` | `() => Promise<void>` | Recargar manualmente los datos |

### Ejemplos

#### 1. Mostrar lista de historiales

```typescript
import { useMedicalHistory } from '../hooks/useMedicalHistory';

export default function MiPagina() {
  const { historiales, loading, error } = useMedicalHistory(1); // animalId = 1

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {historiales.map(h => (
        <li key={h.id_historial_medico}>{h.tipo_evento}</li>
      ))}
    </ul>
  );
}
```

#### 2. Crear nuevo historial

```typescript
const { crear } = useMedicalHistory(animalId);

const handleCreate = async () => {
  try {
    await crear({
      fecha_evento: new Date(),
      tipo_evento: 'vacuna',
      diagnostico: 'Vacunación exitosa',
      nombre_veterinario: 'Dr. López'
    });
    alert('¡Historial creado!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
```

#### 3. Eliminar historial

```typescript
const { eliminar } = useMedicalHistory(animalId);

const handleDelete = async (historyId) => {
  try {
    await eliminar(historyId);
    alert('¡Historial eliminado!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
```

#### 4. Actualizar historial

```typescript
const { actualizar } = useMedicalHistory(animalId);

const handleUpdate = async (historyId) => {
  try {
    await actualizar(historyId, {
      diagnostico: 'Diagnóstico actualizado',
      detalles: 'Nuevos detalles'
    });
    alert('¡Historial actualizado!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
```

### Notas importantes

- El hook necesita un `animalId` válido (número). Si pasas `null`, no cargará nada.
- Los cambios se reflejan automáticamente en la UI.
- Los errores se manejan automáticamente y se guardan en `error`.
- El hook recarga los datos cada vez que cambia `animalId`.

### Archivos que usan este hook

✅ `/src/pages/medicalHistory/[animalId]/index.tsx` - Lista de historiales
✅ `/src/pages/medicalHistory/[animalId]/new.tsx` - Crear nuevo historial

¡Listo para usar en otras páginas! 🎉
