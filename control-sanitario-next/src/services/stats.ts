import api from './api';

// Tipos básicos retornados por los endpoints de estadísticas
export interface HeatmapPoint {
  lat: number;
  lng: number;
  count: number;
}

export interface ReportSummary {
  totalReports: number;
  openReports: number;
  closedReports: number;
  [key: string]: any;
}

export interface HealthStateCount {
  state: string;
  count: number;
}

export interface SpeciesCount {
  species: string;
  count: number;
}

/**
 * Obtener datos para heatmap (mapa de calor).
 * Opcionalmente acepta query params (ej: { from, to, bbox })
 */
export async function getHeatmapData(params?: Record<string, any>): Promise<HeatmapPoint[]> {
  const res = await api.get('/stats/heatmap-data', { params });
  return res.data as HeatmapPoint[];
}

/**
 * Obtener resumen de reportes (estadísticas generales)
 */
export async function getReportStats(params?: Record<string, any>): Promise<ReportSummary> {
  const res = await api.get('/stats/summary', { params });
  return res.data as ReportSummary;
}

/**
 * Obtener conteo de reportes por estado de salud
 */
export async function getReportsByHealthState(params?: Record<string, any>): Promise<HealthStateCount[]> {
  const res = await api.get('/stats/health-states', { params });
  return res.data as HealthStateCount[];
}

/**
 * Obtener conteo de reportes por especie
 */
export async function getReportsBySpecies(params?: Record<string, any>): Promise<SpeciesCount[]> {
  const res = await api.get('/stats/species', { params });
  return res.data as SpeciesCount[];
}

export default {
  getHeatmapData,
  getReportStats,
  getReportsByHealthState,
  getReportsBySpecies,
};
