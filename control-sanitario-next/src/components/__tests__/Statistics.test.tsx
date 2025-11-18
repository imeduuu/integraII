import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AdminStatsPage from '../../pages/admin/stats';

// Mock fetch responses for statistics endpoints
const summaryPayload = {
  success: true,
  data: {
    totalSightings: 10,
    totalSpecies: 3,
    mostCommonSpecies: { id: 1, nombre: 'Canino', count: 6 },
    healthStateDistribution: [],
    speciesDistribution: [
      { id: 1, nombre: 'Canino', count: 6 },
      { id: 2, nombre: 'Felino', count: 3 },
      { id: 3, nombre: 'Ave', count: 1 }
    ],
    recentTrend: []
  }
};

const speciesPayload = { success: true, data: summaryPayload.data.speciesDistribution };
const trendsPayload = { success: true, data: [ { period: '2025-11-11', count: 2 }, { period: '2025-11-12', count: 3 } ] };

describe('AdminStatsPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === 'string') {
        if (url.startsWith('/api/stats/summary')) {
          return Promise.resolve(new Response(JSON.stringify(summaryPayload), { status: 200 }));
        }
        if (url.startsWith('/api/stats/species')) {
          return Promise.resolve(new Response(JSON.stringify(speciesPayload), { status: 200 }));
        }
        if (url.startsWith('/api/stats/trends')) {
          return Promise.resolve(new Response(JSON.stringify(trendsPayload), { status: 200 }));
        }
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true, data: [] }), { status: 200 }));
    }) as jest.Mock;
  });

  it('renderiza resumen y especies', async () => {
    render(<AdminStatsPage />);
    expect(screen.getByText(/Estadísticas/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Total avistamientos: 10/)).toBeInTheDocument();
      expect(screen.getByText(/Total especies: 3/)).toBeInTheDocument();
      expect(screen.getByText(/Especie más común: Canino/)).toBeInTheDocument();
    });

    // Species listado
    await waitFor(() => {
      expect(screen.getByText(/Canino: 6/)).toBeInTheDocument();
      expect(screen.getByText(/Felino: 3/)).toBeInTheDocument();
    });

    // Tendencias tabla
    await waitFor(() => {
      expect(screen.getByText('2025-11-11')).toBeInTheDocument();
      expect(screen.getByText('2025-11-12')).toBeInTheDocument();
    });
  });
});
