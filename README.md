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
- [Commit Types](#commit-types)
- [Specifying Scopes](#specifying-scopes)
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
git commit -m "unknown: Initial commit." # fails: commit type doesn't exists.
```

## Commit Types

| Type                 | Description                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `a11y`               | ♿️ Changes regarding accessibility or inclusivity.                                                                      |
| `bootstrap`          | 🎉 `bootstrap: Initial commit.`                                                                                          |
| `build`              | 🏗️ Changes that affect the build system.                                                                                 |
| `chore` or `cleanup` | 🧹 A chore or cleanup, usually to keep the project tidy.                                                                 |
| `ci`                 | 👷 Changes to the CI configuration files and scripts.                                                                    |
| `config`             | ⚙️ Changes that affect the project configurations.                                                                       |
| `deps`               | ⬆️ Changes regarding dependencies (upgrade, downgrade)                                                                   |
| `docs`               | 📖 A modification or addition to the documentation.                                                                      |
| `feat`               | ✨ A new feature.                                                                                                        |
| `fix`                | 🐛 A bug fix.                                                                                                            |
| `i18n`               | ⛳️ An internationalization change.                                                                                      |
| `perf`               | ⏱️ A performance improvement.                                                                                            |
| `refactor`           |  ♻️ A code refactor.                                                                                                     |
| `refine`             | 🧪 A code experiment or a feature refinement.                                                                            |
| `release`            | 🔖 A release.                                                                                                            |
| `revert`             | ⏪️ A commit revert (`revert(fbb6553)`)                                                                                  |
| `security`           | 🔒️ A security fix or improvement.                                                                                       |
| `style`              | 💄 A style change (could be assets or code formatting).                                                                  |
| `test`               | ✅ A test suite change.                                                                                                  |
| `wip`                | Can be used inside a development branch or simply use `-n` or `--no-verify` to your `git commit` call to skip the hooks. |

## Specifying Scopes

```js
// .commitlintrc.cjs
module.exports = {
  extends: ['@gcoguiec/commitlint-config'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        // i.e: application component scopes
        'auth',
        'billing'
        // or package names in a monorepo context
        'eslint-config-base',
        'eslint-config-react'
      ]
    ]
  }
};
```

```bash
git commit -m 'feat(billing): Update sales tax strategy.'
git commit -m 'deps(eslint-config-react): Bump dependencies.'
```

## License

This project is licensed under [BSD 2-Clause](https://spdx.org/licenses/BSD-2-Clause.html).
