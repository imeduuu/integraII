import prismaDefault from './prismaExamples';

// Reutilizamos la instancia de Prisma exportada por prismaExamples
const prisma = prismaDefault;

// Tipo de entidad según el schema.prisma (evita depender de tipos generados si aún no se ha corrido prisma generate)
export interface HistorialMedico {
	id_historial_medico: number;
	id_animal: number;
	fecha_evento: Date;
	tipo_evento: string;
	diagnostico: string | null;
	detalles: string | null;
	nombre_veterinario: string | null;
}

// Payload de entrada para crear/actualizar historial
export type MedicalHistoryInput = {
	fecha_evento: Date | string;
	tipo_evento: string;
	diagnostico?: string | null;
	detalles?: string | null;
	nombre_veterinario?: string | null;
};

// Normaliza fecha_evento si viene como string
function normalizeInput(
	data: MedicalHistoryInput
): Omit<HistorialMedico, 'id_historial_medico' | 'id_animal'> {
	const fecha_evento = typeof data.fecha_evento === 'string' ? new Date(data.fecha_evento) : data.fecha_evento;
	return {
		fecha_evento,
		tipo_evento: data.tipo_evento,
		diagnostico: data.diagnostico ?? null,
		detalles: data.detalles ?? null,
		nombre_veterinario: data.nombre_veterinario ?? null,
	};
}

// GET /medicalHistory → listar todos los historiales
export async function listAllMedicalHistories(): Promise<HistorialMedico[]> {
	return (prisma as any).historial_medico.findMany({
		orderBy: { fecha_evento: 'desc' },
	});
}

// GET /medicalHistory/:animalId → listar historial por animal
export async function listMedicalHistoryByAnimal(animalId: number): Promise<HistorialMedico[]> {
	return (prisma as any).historial_medico.findMany({
		where: { id_animal: animalId },
		orderBy: { fecha_evento: 'desc' },
	});
}

// GET /medicalHistory/:animalId/:historyId → detalle específico
export async function getMedicalHistoryDetail(
	animalId: number,
	historyId: number
): Promise<HistorialMedico | null> {
	// Nos aseguramos de que pertenezca al animal
	return (prisma as any).historial_medico.findFirst({
		where: { id_historial_medico: historyId, id_animal: animalId },
	});
}

// POST /medicalHistory/:animalId → crear nuevo historial
export async function createMedicalHistory(
	animalId: number,
	data: MedicalHistoryInput
): Promise<HistorialMedico> {
	const payload = normalizeInput(data);
	return (prisma as any).historial_medico.create({
		data: {
			...payload,
			id_animal: animalId,
		},
	});
}

// PUT /medicalHistory/:animalId/:historyId → actualizar historial
export async function updateMedicalHistory(
	animalId: number,
	historyId: number,
	data: Partial<MedicalHistoryInput>
): Promise<HistorialMedico> {
	const normalized = data ? normalizeInput({
		fecha_evento: data.fecha_evento ?? new Date(), // no se usa si no viene en update
		tipo_evento: data.tipo_evento ?? '', // no se usa si no viene en update
		diagnostico: data.diagnostico,
		detalles: data.detalles,
		nombre_veterinario: data.nombre_veterinario,
	}) : {} as any;

	// Construimos el objeto data sólo con campos presentes
	const updateData: any = {};
	if (data.fecha_evento !== undefined) {
		updateData.fecha_evento = typeof data.fecha_evento === 'string' ? new Date(data.fecha_evento) : data.fecha_evento;
	}
	if (data.tipo_evento !== undefined) updateData.tipo_evento = data.tipo_evento;
	if (data.diagnostico !== undefined) updateData.diagnostico = data.diagnostico;
	if (data.detalles !== undefined) updateData.detalles = data.detalles;
	if (data.nombre_veterinario !== undefined) updateData.nombre_veterinario = data.nombre_veterinario;

	const res = await (prisma as any).historial_medico.updateMany({
		where: { id_historial_medico: historyId, id_animal: animalId },
		data: updateData,
	});

	if (res.count === 0) {
		throw new Error('Historial no encontrado para el animal indicado');
	}

	// Devolvemos el registro actualizado
	const updated = await (prisma as any).historial_medico.findUnique({
		where: { id_historial_medico: historyId },
	});
	// findUnique no debería devolver null después de updateMany exitoso
	if (!updated) throw new Error('No se pudo recuperar el historial actualizado');
	return updated;
}

// DELETE /medicalHistory/:animalId/:historyId → eliminar historial
export async function deleteMedicalHistory(
	animalId: number,
	historyId: number
): Promise<{ deleted: boolean; record?: HistorialMedico }> {
	const existing = await (prisma as any).historial_medico.findFirst({
		where: { id_historial_medico: historyId, id_animal: animalId },
	});
	if (!existing) {
		return { deleted: false };
	}

	const res = await (prisma as any).historial_medico.deleteMany({
		where: { id_historial_medico: historyId, id_animal: animalId },
	});

	return { deleted: res.count > 0, record: res.count > 0 ? existing : undefined };
}

// Utilidad opcional: asegura existencia antes de crear (idempotencia por fecha+tipo)
export async function upsertMedicalHistory(
	animalId: number,
	data: MedicalHistoryInput
): Promise<HistorialMedico> {
	const payload = normalizeInput(data);
	const existing = await (prisma as any).historial_medico.findFirst({
		where: {
			id_animal: animalId,
			fecha_evento: payload.fecha_evento as Date,
			tipo_evento: payload.tipo_evento,
		},
	});
	if (existing) return existing;
	return (prisma as any).historial_medico.create({ data: { ...payload, id_animal: animalId } });
}

export default {
	listAllMedicalHistories,
	listMedicalHistoryByAnimal,
	getMedicalHistoryDetail,
	createMedicalHistory,
	updateMedicalHistory,
	deleteMedicalHistory,
	upsertMedicalHistory,
};

