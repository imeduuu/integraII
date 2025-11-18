import { useCallback, useState } from 'react';

export interface DateRangeFilter {
  fromDate?: string; // ISO
  toDate?: string;   // ISO
}

// Response shapes (partial typings for convenience)
export interface HeatmapPoint { lat: number; lng: number; count: number }
export interface SummaryData {
  totalSightings: number;
  totalSpecies: number;
  mostCommonSpecies: { id: number; nombre: string; count: number } | null;
  healthStateDistribution: { id: number; nombre: string; count: number }[];
  speciesDistribution: { id: number; nombre: string; count: number }[];
  recentTrend: { date: string; count: number }[];
}
export interface DistributionItem { id: number; nombre: string; count: number }
export interface UserImpactItem { id_usuario: number; nombre: string; sightings: number; adoptionsRescue: number; adoptionsCompleted: number }
export interface TrendItem { period: string; count: number }

interface FetchState<T> { loading: boolean; error: string | null; data: T | null }

function buildQuery(params: Record<string, any>): string {
  const q = Object.entries(params).filter(([,v]) => v !== undefined && v !== null && v !== '').map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&');
  return q ? `?${q}` : '';
}

export function useStatistics() {
  const [heatmap, setHeatmap] = useState<FetchState<HeatmapPoint[]>>({ loading: false, error: null, data: null });
  const [summary, setSummary] = useState<FetchState<SummaryData>>({ loading: false, error: null, data: null });
  const [healthStates, setHealthStates] = useState<FetchState<DistributionItem[]>>({ loading: false, error: null, data: null });
  const [species, setSpecies] = useState<FetchState<DistributionItem[]>>({ loading: false, error: null, data: null });
  const [userImpact, setUserImpact] = useState<FetchState<UserImpactItem[]>>({ loading: false, error: null, data: null });
  const [trends, setTrends] = useState<FetchState<TrendItem[]>>({ loading: false, error: null, data: null });

  const fetchJSON = useCallback(async <T,>(url: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(url, options);
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error((json as any)?.error || `Error ${res.status}`);
    }
    return (json as any).data as T;
  }, []);

  const getHeatmap = useCallback(async (filter?: DateRangeFilter) => {
    setHeatmap(h => ({ ...h, loading: true, error: null }));
    try {
      const data = await fetchJSON<HeatmapPoint[]>(`/api/stats/heatmap${buildQuery(filter || {})}`);
      setHeatmap({ loading: false, error: null, data });
    } catch (e: any) {
      setHeatmap({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  const getSummary = useCallback(async (filter?: DateRangeFilter) => {
    setSummary(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchJSON<SummaryData>(`/api/stats/summary${buildQuery(filter || {})}`);
      setSummary({ loading: false, error: null, data });
    } catch (e: any) {
      setSummary({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  const getHealthStates = useCallback(async (filter?: DateRangeFilter) => {
    setHealthStates(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchJSON<DistributionItem[]>(`/api/stats/health-states${buildQuery(filter || {})}`);
      setHealthStates({ loading: false, error: null, data });
    } catch (e: any) {
      setHealthStates({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  const getSpecies = useCallback(async (filter?: DateRangeFilter) => {
    setSpecies(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchJSON<DistributionItem[]>(`/api/stats/species${buildQuery(filter || {})}`);
      setSpecies({ loading: false, error: null, data });
    } catch (e: any) {
      setSpecies({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  const getUserImpact = useCallback(async (token: string, filter?: DateRangeFilter) => {
    setUserImpact(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchJSON<UserImpactItem[]>(`/api/stats/user-impact${buildQuery(filter || {})}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserImpact({ loading: false, error: null, data });
    } catch (e: any) {
      setUserImpact({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  const getTrends = useCallback(async (params?: { interval?: 'day'|'week'; limit?: number } & DateRangeFilter) => {
    setTrends(t => ({ ...t, loading: true, error: null }));
    try {
      const data = await fetchJSON<TrendItem[]>(`/api/stats/trends${buildQuery(params || {})}`);
      setTrends({ loading: false, error: null, data });
    } catch (e: any) {
      setTrends({ loading: false, error: e.message, data: null });
    }
  }, [fetchJSON]);

  return {
    heatmap, summary, healthStates, species, userImpact, trends,
    getHeatmap, getSummary, getHealthStates, getSpecies, getUserImpact, getTrends
  };
}

export default useStatistics;
