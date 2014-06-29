# package.json lint tool

## Installation

```
$ npm install package-json-lint
```

## Usage

Provides a binary, that you should run from the directory of the package.json
file. Optionally you can provide the path to the file as an argument.


```
packageJsonLint
```

```
packageJsonLint path/to/package.json
```

## Checks:

Currently it makes sure that:
- you don't reference relative versions.
- you sort your dependencies and development dependencies alphabetically.
