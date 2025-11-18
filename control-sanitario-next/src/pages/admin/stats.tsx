import React, { useEffect } from 'react';
import useStatistics from '../../hooks/useStatistics';

const AdminStatsPage: React.FC = () => {
  const { summary, getSummary, species, getSpecies, trends, getTrends } = useStatistics();

  useEffect(() => {
    getSummary();
    getSpecies();
    getTrends({ interval: 'day', limit: 7 });
  }, [getSummary, getSpecies, getTrends]);

  return (
    <main style={{ padding: '1.5rem', fontFamily: 'system-ui,Segoe UI,Roboto,Helvetica,Arial' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Estadísticas</h1>

      <section aria-labelledby="resumen-heading" style={{ marginTop: '1.5rem' }}>
        <h2 id="resumen-heading" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Resumen</h2>
        {summary.loading && <p>Cargando resumen...</p>}
        {summary.error && <p style={{ color: 'red' }}>Error: {summary.error}</p>}
        {summary.data && (
          <ul>
            <li>Total avistamientos: {summary.data.totalSightings}</li>
            <li>Total especies: {summary.data.totalSpecies}</li>
            <li>Especie más común: {summary.data.mostCommonSpecies?.nombre ?? '—'}</li>
          </ul>
        )}
      </section>

      <section aria-labelledby="species-heading" style={{ marginTop: '1.5rem' }}>
        <h2 id="species-heading" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Top especies</h2>
        {species.loading && <p>Cargando especies...</p>}
        {species.error && <p style={{ color: 'red' }}>Error: {species.error}</p>}
        {species.data && (
          <ol>
            {species.data.slice(0, 5).map(s => (
              <li key={s.id}>{s.nombre}: {s.count}</li>
            ))}
          </ol>
        )}
      </section>

      <section aria-labelledby="trend-heading" style={{ marginTop: '1.5rem' }}>
        <h2 id="trend-heading" style={{ fontSize: '1.3rem', fontWeight: 600 }}>Tendencia últimos días</h2>
        {trends.loading && <p>Cargando tendencia...</p>}
        {trends.error && <p style={{ color: 'red' }}>Error: {trends.error}</p>}
        {trends.data && (
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: '4px 8px', textAlign: 'left' }}>Fecha</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '4px 8px', textAlign: 'right' }}>Avistamientos</th>
              </tr>
            </thead>
            <tbody>
              {trends.data.map(t => (
                <tr key={t.period}>
                  <td style={{ padding: '4px 8px' }}>{t.period}</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right' }}>{t.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default AdminStatsPage;
