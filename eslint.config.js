import { ecmascript, vitest } from '@gcoguiec/eslint-config';

export default [
  ...(await ecmascript()),
  ...(await vitest({
    overrides: {
      'vitest/expect-expect': 'off'
    }
  }))
];
