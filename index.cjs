module.exports = {
  rules: {
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'a11y',
        'bootstrap',
        'build',
        'chore',
        'ci',
        'cleanup',
        'config',
        'deps',
        'docs',
        'feat',
        'fix',
        'i18n',
        'perf',
        'refactor',
        'refine',
        'release',
        'revert',
        'security',
        'style',
        'test',
        'wip',
        'workflow'
      ]
    ],
    'scope-case': [2, 'always', 'lowercase'],
    'scope-min-length': [2, 'always', 1],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'always', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*?)\))?:\s((?:.*(?=\[))|.*)(?:\[#(\d*)\])?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'issue'],
      issuePrefixes: ['#']
    }
  }
};
