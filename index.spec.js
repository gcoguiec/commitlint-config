import { expect, describe, it } from 'vitest';
import lint from '@commitlint/lint';

import config from './index.cjs';

const { rules, parserPreset } = config;

expect.extend({
  toBeValid(received) {
    return {
      pass: received.valid === true,
      message: () => 'expected commitlint to be valid'
    };
  },
  toBeInvalid(received) {
    return {
      pass: received.valid === false,
      message: () => 'expected commitlint to be invalid'
    };
  },
  toRaise(received, code) {
    return {
      pass: received.level === 2 && received.name === code,
      message: () => `expected ${received} to be a commitlint error`
    };
  },
  toWarn(received, code) {
    return {
      pass: received.level === 1 && received.name === code,
      message: () => `expected ${received} to be a commitlint warning`
    };
  }
});

const warns = (code, message) => {
  return async () => {
    const result = await lint(message, rules, parserPreset);
    expect(result).toBeValid();

    const [warning] = result.warnings;
    expect(warning).toWarn(code);
  };
};

const raises = (code, message) => {
  return async () => {
    const result = await lint(message, rules, parserPreset);
    expect(result).toBeInvalid();

    const [error] = result.errors;
    expect(error).toRaise(code);
  };
};

describe('when providing some valid cases', () => {
  const messages = [
    'bootstrap: Initial commit.',
    'ci: Update CI build file.',
    'style: Reformat a service.',
    'wip(message): Some message.\n\nWith a body',
    'revert(fbb6553): Wrong major version.'
  ];

  for (const message of messages) {
    it('succeeds to validate', async () => {
      const result = await lint(message, rules, parserPreset);
      expect(result).toBeValid();
    });
  }
});

describe('rules', () => {
  describe('body-leading-blank', () => {
    describe('when body has no leading blank', () => {
      const message = 'feat: A new feature.\nbody';
      it('warns the user', warns('body-leading-blank', message));
    });
  });

  describe('body-max-line-length', () => {
    describe('when body exceeds the max line length of 100 characters', () => {
      const message =
        'refine: Some message.\n\nbody with multiple lines\nhas a message that is way too long and will break the line rule "line-max-length" by several characters';
      it('fails to validate', raises('body-max-line-length', message));
    });
  });

  describe('footer-leading-blank', () => {
    describe('when footer has no leading blank', () => {
      const message =
        'chore: Some message.\n\nbody\nBREAKING CHANGE: It will be significant';
      it('warns the user', warns('footer-leading-blank', message));
    });
  });

  describe('footer-max-line-length', () => {
    describe('when footer line is a little bit over 100 characters', () => {
      const message =
        'refactor: Some message.\n\nbody\n\nBREAKING CHANGE: footer with multiple lines\nhas a message that is way too long and will break the line rule "line-max-length" by several characters';
      it('fails to validate', raises('footer-max-line-length', message));
    });
  });

  describe('header-max-length', () => {
    describe('when the header line exceed the max character limit', () => {
      const message =
        'release: Some message that is way too long and breaks the line max-length by several characters since the max is 100.';
      it('fails to validate', raises('header-max-length', message));
    });
  });

  describe('subject-case', () => {
    describe('when subject case is invalid', () => {
      const messages = ['security: some message.'];

      messages.forEach(message => {
        it('fails to validate', raises('subject-case', message));
      });
    });
  });

  describe('subject-empty', () => {
    describe('when the subject is not present', () => {
      const message = 'ci: ';
      it('fails to validate', raises('subject-empty', message));
    });
  });

  describe('subject-full-stop', () => {
    describe('when no full stop is provided.', () => {
      const message = 'a11y: Some message';
      it('fails to validate', raises('subject-full-stop', message));
    });
  });

  describe('type-case', () => {
    describe('when the type is uppercased', () => {
      const message = 'TEST: Some message.';
      it('fails to validate', raises('type-case', message));
    });
  });

  describe('type-empty', () => {
    describe('when the type is empty', () => {
      const message = 'Some message.';
      it('fails to validate', raises('type-empty', message));
    });
  });

  describe('type-enum', () => {
    describe('when type is invalid', () => {
      const message = 'wrongtype: Take an arrow in the knee.';
      it('fails to validate', raises('type-enum', message));
    });

    describe('when type exists', () => {
      const message = 'perf: Initial commit.';
      it('succeeds to validate', async () => {
        const result = await lint(message, rules, parserPreset);
        expect(result).toBeValid();
      });
    });
  });

  describe('scope-case', () => {
    describe('when the scope is uppercased', () => {
      const message = 'perf(SCOPE): Some message.';
      it('fails to validate', raises('scope-case', message));
    });
  });
});
