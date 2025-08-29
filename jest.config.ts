export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/pages/**/*.{ts,tsx}',
    'src/components/organisms/**/*.{ts,tsx}',
    'src/components/molecules/**/*.{ts,tsx}',
    '!src/components/**/index.ts',
  ],
  coverageDirectory: 'coverage',
}
