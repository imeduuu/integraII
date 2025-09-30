const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path al directorio de Next.js app para cargar next.config.js y archivos .env en el entorno de prueba
  dir: './',
})

// Agregar cualquier configuración personalizada de Jest aquí
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Manejar imports de módulos CSS y archivos de assets
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    '!src/components/**/*.stories.{js,jsx,ts,tsx}',
    '!src/components/**/index.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)