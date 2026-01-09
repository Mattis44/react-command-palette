# Testing Setup

This project uses **Vitest** for unit tests and **Playwright** for E2E tests.

## Unit Tests

### Running tests

```bash
npm test

npm run test:ui

npm run test:coverage
```

### Test structure

- `src/**/*.test.tsx` - Component unit tests
- `src/test/setup.ts` - Global Vitest configuration
- `src/test/test-utils.tsx` - Reusable test utilities

### Coverage

Coverage is generated with `@vitest/coverage-v8` and reports are available in `coverage/`.

## E2E Tests

### Prerequisites

Install Playwright browsers:

```bash
npx playwright install
```

### Running E2E tests

```bash
npm run test:e2e

npm run test:e2e:ui

npm run test:e2e:debug
```

### E2E test structure

- `e2e/**/*.spec.ts` - E2E tests
- `demo/` - Demo application for E2E tests
- `playwright.config.ts` - Playwright configuration

### Local demo

To manually test the library:

```bash
npm run dev:demo
```

Open [http://localhost:5173](http://localhost:5173)

## Accessibility Tests

Tests include accessibility checks:
- Correct ARIA attributes
- Keyboard navigation
- Screen reader announcements
- Focus trap

## CI/CD

To integrate tests into your CI/CD pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:coverage
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```
