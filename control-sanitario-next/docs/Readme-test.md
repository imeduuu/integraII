# Cobertura de Tests

## 1. Proceso de ejecución de tests

Se utilizan tests unitarios e integrales con Jest para los componentes del proyecto.  
Los pasos para ejecutar los tests y generar reportes de cobertura son:

### Ejecución
```bash
# Ejecutar todos los tests y generar cobertura
npm test -- --coverage

Configuración en Jest

Se habilitó la cobertura en package.json:

"jest": {
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "lcov", "html"]
}


collectCoverage: habilita la recolección de cobertura.

coverageDirectory: carpeta donde se guardan los reportes.

coverageReporters: formatos del reporte (consola, HTML y lcov).

2. Resultados de cobertura

Última ejecución: YYYY-MM-DD

Resumen general:

Tipo	Cobertura (%)
Statements	13.99
Branches	20.08
Functions	12.82
Lines	13.53

Nota: La cobertura global objetivo es 80%.

3. Reporte detallado por archivo

El reporte completo se encuentra en la carpeta coverage/ generada tras ejecutar los tests:

coverage/index.html: reporte visual navegable en navegador.

coverage/lcov-report/: reporte lcov para integración con CI/CD.

coverage/coverage-summary.json: resumen en JSON para herramientas automáticas.

4. Observaciones y acciones

Actualmente, la mayoría de los componentes tienen cobertura 0%, por lo que se recomienda priorizar:

Formularios (AdoptionForm.tsx, VolunteerForm.tsx)

Modales y UI (Modal.tsx, AdminActionModal.tsx)

Componentes críticos (Toast.tsx, AnimalCard.tsx)

Se recomienda integrar el comando npm test con CI/CD para generar reportes automáticos y revisar cobertura en cada commit.