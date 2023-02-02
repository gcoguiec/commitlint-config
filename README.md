<h1 align="center">@gcoguiec/commitlint-config</h1>
<br>
<p align="center">
  <img src="https://commitlint.js.org/assets/icon.svg" width="150" alt=""/>
</p>
<p align="center">
  A reusable commitlint configuration.
</p>
<p align="center">
  <a href="https://github.com/gcoguiec/commitlint-config/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/gcoguiec/commitlint-config/ci.yml?branch=main&label=ci&style=flat-square" alt="CI Status"/>
  </a>
  <a href="https://github.com/gcoguiec/commitlint-config/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/gcoguiec/commitlint-config?style=flat-square&label=License"
         alt="License"/>
  </a>
</p>

<hr>

## Table of Contents

- [Convention](#convention)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Specifying scopes](#specifying-scopes)
- [License](#license)

## Convention

- A commit type is always **lowercased** and must be provided at all-time.
- The scope is optional but must be **lowercased** if used.
- Like a sentence: a commit subject must be **capitalized** and ends with a **period**.
- The message body and footer should start with a leading blank line.
- A line can't exceed 100 characters.

## Getting Started

Install the development dependency:

```bash
pnpm add -D @gcoguiec/commitlint-config
```

And simply add a `.commitlintrc.js` file at the project root:

```js
module.exports = {
  extends: ['@gcoguiec/commitlint-config']
};
```

## Examples

```bash
git commit -m "bootstrap: Initial commit." # passes
git commit -m "ci: Set-up GitHub actions." # passes
git commit -m "style: Fix assets (logo). [#123]" # passes
git commit -m "Initial commit." # fails: no commit type.
git commit -m "bootstrap: Initial commit" # fails: no full-stop.
git commit -m "unkown: Initial commit." # fails: commit type doesn't exists.
```

## Specifying scopes

Specifying component scopes:

```js
// .commitlintrc.cjs
module.exports = {
  extends: ['@gcoguiec/commitlint-config'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'auth',
        'billing'
        // ...
      ]
    ]
  }
};
```

```bash
git commit -m "feat(billing): Update sales tax strategy.'
```

Specifying package names in a monorepo context:

```js
// .commitlintrc.cjs
module.exports = {
  extends: ['@gcoguiec/commitlint-config'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'eslint-config-base',
        'eslint-config-react'
        // ...
      ]
    ]
  }
};
```

```bash
git commit -m "deps(eslint-config-react): Bump dependencies.'
```

## License

This project is licensed under [BSD 2-Clause](https://spdx.org/licenses/BSD-2-Clause.html).
