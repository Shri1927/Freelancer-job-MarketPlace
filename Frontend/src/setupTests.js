import '@testing-library/jest-dom'

// Debug: print resolved react paths during tests
try {
  // eslint-disable-next-line no-console
  console.log('[test setup] react ->', require.resolve('react'))
  // eslint-disable-next-line no-console
  console.log('[test setup] react-dom ->', require.resolve('react-dom'))
} catch (e) {
  // ignore
}
