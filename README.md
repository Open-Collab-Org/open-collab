## Table of Contents

1. [Development Setup](#dev-setup)
2. [Contribution Guidelines](#guidelines)

## <a name="dev-setup"></a>Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (`^12.0.0`)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (`^1.22`)

Install all the necessary dependencies:

```bash
$ yarn install
```

Start the development server:

```bash
$ yarn dev
```

You may see all the available scripts [here](https://github.com/open-collaboration/web/blob/master/package.json#L7).

## <a name="guidelines"></a>Contribution Guidelines

In order to contribute to this project, more specifically to this package, you have to follow a few guidelines.

### 1. English Only

Everything, from variables and comments to commit messages and pull requests should be in and only in english, no
exceptions.

### 2. Prettier & ESLint

These tools are here for a reason - don't use `eslint-disable` unless when extremely necessary. I'm also talking about
you, `@ts-ignore`.

### 3. Typescript

Although `allowJs` is set to true for compatibility reasons, all new code - including tests - should be written in
Typescript. Take advantage of types and interfaces - don't use `any` and `unknown`.

### 4. Documentation

All code should, except tests, be documented using JSDoc. Of course types don't need to - and shouldn't - be described
in JSDoc since we are using TS.

### 5. Tests

When submitting pull requests, be sure to provide unit tests for all the new features and that old tests are still
passing. The coverage should be at least 80%.