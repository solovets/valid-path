# valid-path [![Created by Itentika](https://img.shields.io/badge/Created%20by-Itentika-blue)](https://itentika.com) [![NPM version](https://badge.fury.io/js/valid-path.svg)](http://badge.fury.io/js/valid-path) 

_Built with love, will be grateful for_ :heart:

Returns an object, that tells if provided string is a valid path, or describes got problem.

|            | valid | invalid |
| :--------- | :----- | :------- |
| **input**  | `'a/b/c'` | `'a/nul/b'` |
| **output** | <pre>{<br/>  valid: true,<br/>  error: null,<br>  data: {<br/>    input: "a/b/c",<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains file or folder name,<br/>          that is forbidden in Windows  (nul)',<br/>  data: {<br/>    input: 'a/nul/b',<br/>    notes: []<br/>  }<br/>}</pre> |


## Table of contents

 * [Install](#install)
 * [Migrate from version 1.0.0](#nb-migrate-from-version-100)
 * [Usage](#usage)
 * [Examples](#examples)
 * [Options](#options)
   * [simpleReturn](#optionssimplereturn)
   * [sep](#optionssep)
   * [allowSepDuplications](#optionsallowsepduplications)
   * [allowDriveLetter](#optionsallowdriveletter)
   * [allowGlobPatterns](#optionsallowglobpatterns)
   * [allowForbiddenWindowsNames](#optionsallowforbiddenwindowsnames)
   * [allowFobiddenWindowsChars](#optionsallowfobiddenwindowschars)
   * [allowForbiddenUnixChars](#optionsallowforbiddenunixchars)
 
## Install

```
npm i valid-path
```

## [NB] Migrate from version 1.0.0

`valid-pqath` v1.0.0 had `return` and `options` different from current version, and did not have callback argument. If you switch to the latest version, it will break your code. To keep your existing code and use the latest `valid-path` version you have to set `migrate` option to `true`:

```js
validPath('a/b', {migrate: true});
```

Plese note, that `migrate` will be deprecated in future versions.

## Usage

`validPath` function takes three arguments:

 * string
 * options
 * callback

```javascript
validPath('string'[, options, callback]);
```

| argument   | required                | expected type |
| :--------- | :---------------------- | ------------- |
| `string`   | :heavy_check_mark:      | `string`      |
| `options`  | :heavy_minus_sign:      | `object`      |
| `callback` | :heavy_minus_sign:      | `function`    |

Example: 

```javascript
const validPath = require('validPath');

const myPath = validPath('string/to/check');

if (myPath.valid) {
    // ...
} else {
    console.log(`Error in ${myPath.data.input}: ${myPath.error}`);
}
```

## Examples

Outputs for calls with default options

| Input         | Output |
| :---------    | :----- |
| `a/b/c`       | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b/c',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a/b/c.js`    | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b/c.js',<br/>    notes: []<br/>  }<br/>}</pre> |
| `C://a/b`     | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'C://a/b',<br/>    notes: [<br/>      'Input string contains drive letter'<br/>    ]<br/>  }<br/>}</pre> |
| ` ` (nothing) | <pre>{<br/>  valid: false,<br/>  error: '"string" argument must be of type "string",<br>          got "undefined" for "undefined"',<br/>  data: {<br/>    input: undefined,<br/>    notes: []<br/>  }<br/>}</pre> |
| `null`        | <pre>{<br/>  valid: false,<br/>  error: '"string" argument must be of type "string",<br/>          got "object" for "null"',<br/>  data: {<br/>    input: null,<br/>    notes: []<br/>  }<br/>}</pre> |
| `!a/b/c`      | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains Glob pattern',<br/>  data: {<br/>    input: '!a/b/c',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a\\b\\c`     | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters, that<br/>          are forbidden in Windows (a\\\\b\\\\c)',<br/>  data: {<br/>    input: 'a\\\\b\\\\c',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a/b//c`      | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains duplicated separator',<br/>  data: {<br/>    input: 'a/b//c',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a/b/con`     | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains file or folder name,<br/>          that is forbidden in Windows  (con)',<br/>  data: {<br/>    input: 'a/b/con',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a/b:c/d`     | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters,<br/>          that are forbidden in Windows (b:c)',<br/>  data: {<br/>    input: 'a/b:c/d',<br/>    notes: []<br/>  }<br/>}</pre> |
| `a/\0b\c`     | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters,<br/>          that are forbidden in Unix (\x00b)',<br/>  data: {<br/>    input: 'a/\x00b/c',<br/>    notes: []<br/>  }<br/>}</pre> |


## Options

Options are optional:

 * [simpleReturn](#optionssimplereturn)
 * [sep](#optionssep)
 * [allowSepDuplications](#optionsallowsepduplications)
 * [allowDriveLetter](#optionsallowdriveletter)
 * [allowGlobPatterns](#optionsallowglobpatterns)
 * [allowForbiddenWindowsNames](#optionsallowforbiddenwindowsnames)
 * [allowFobiddenWindowsChars](#optionsallowfobiddenwindowschars)
 * [allowForbiddenUnixChars](#optionsallowforbiddenunixchars)

### options.simpleReturn

If `true`, `valid-path` will return boolean (`true` or `false`), not an object.

| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/b/c` | `a/b/con` |
| :---------- | :----   | :------   |
| **options** | <pre>{<br/>  simpleReturn: true<br/>}</pre> | <pre>{<br/>  simpleReturn: true<br/>}</pre> |
| **output**  | `true`  | `false`   |

### options.sep

Defines path separator: `/` or `\\`.

| Default | Expects       |
| :------ | :------       |
| `/`     | `/` _or_ `\\` |

**Example**

| **input**   | `a/b/c` | `a/b/c` |
| :---------- | :----   | :------   |
| **options** | <pre>{<br/>  //default<br/>}</pre> | <pre>{<br/>  sep: '\\\\'<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b/c',<br/>    notes: []<br>  }<br/>}</pre> | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters, that<br/>          are forbidden in Windows (a/b/c)',<br/>  data: {<br/>    input: 'a/b/c',<br/>    notes: []<br/>  }<br/>}</pre> |

### options.allowSepDuplications

If `true`, `valid-path` will ignore separator duplications and will add a note in `notes` array of returned object (`Object.data.notes`).

| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/b//c` | `a/b//c` |
| :---------- | :----   | :------   |
| **options** | <pre>{<br/>  // default<br/>}</pre> | <pre>{<br/>  allowSepDuplications: true<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains<br/>          duplicated separator',<br/>  data: {<br/>    input: 'a/b//c',<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b//c',<br/>    notes: [<br/>      'Input string contains<br/>       duplicated separator'<br/>    ]<br/>  }<br/>}</pre> |

### options.allowDriveLetter

If `true`, `valid-path` will accept drive letter in provided path and will add a note in `notes` array of returned object (`Object.data.notes`). 

Drive letter can have single and doubled separator (`C:/a/b` or `C://a/b`). In case of doubled separator you do not need to set `allowSepDuplications` option to `true`: `valid path` will accept the duplication just for drive letter.

| Default | Expects |
| :------ | :------ |
| `true`  | boolean |

**Example**

| **input**   | `C://a/b` | `C://a/b` |
| :---------- | :---- | :------   |
| **options** | <pre>{<br/>  //  default<br/>}</pre> | <pre>{<br/>  allowDriveLetter: false<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'C://a/b',<br/>    notes: [<br/>      'Input string contains<br/>       drive letter'<br/>    ]<br/>  }<br/>}</pre> | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains<br/>          drive letter',<br/>  data: {<br/>    input: 'C://a/b',<br/>    notes: []<br/>  }<br/>}</pre> |

### options.allowGlobPatterns

If `true`, `valid-path` will accept glob pattern in provided path and will add a note in `notes` array of returned object (`Object.data.notes`).

| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/*/*.js` | `a/*/*.js` |
| :---------- | :---- | :------   |
| **options** | <pre>{<br/>  //  default<br/>}</pre> | <pre>{<br/>  allowGlobPatterns: true<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains<br/>          Glob pattern',<br/>  data: {<br/>    input: 'a/\*/\*.js',<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/\*/\*.js',<br/>    notes: [<br/>      'Input string contains<br/>       Glob pattern'<br/>    ]<br/>  }<br/>}</pre> |

### options.allowForbiddenWindowsNames

By default `valid-path` does not accept file and folder names that are forbidden in Windows: `nul`, `prn`, `con`, `lpt[0-9]`, `com[0-9]`. Set to `true` to accept these names.



| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/b/lpt3` | `a/b/lpt3` |
| :---------- | :---- | :------   |
| **options** | <pre>{<br/>  //  default<br/>}</pre> | <pre>{<br/>  allowForbiddenWindowsNames: true<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains file or folder name,<br/>          that is forbidden in Windows  (lpt3)',<br/>  data: {<br/>    input: 'a/b/lpt3',<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b/lpt3',<br/>    notes: [<br/>      'Input string contains file or folder name,<br/>       that is forbidden in Windows  (lpt3)'<br/>    ]<br/>  }<br/>}</pre> |

### options.allowFobiddenWindowsChars

By default `valid-path` does not accept characters in path items that are forbidden in Windows: `/`, `\`, `<`, `>`, `:`, `"`, `*`, `?`, `|`. Set to `true` to accept these characters.

| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/b:c/d` | `a/b:c/d` |
| :---------- | :---- | :------   |
| **options** | <pre>{<br/>  //  default<br/>}</pre> | <pre>{<br/>  allowFobiddenWindowsChars: true<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters,<br/>          that are forbidden in Windows (b:c)',<br/>  data: {<br/>    input: 'a/b:c/d',<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/b:c/d',<br/>    notes: [<br/>      'Input string contains characters,<br/>       that are forbidden in Windows (b:c)'<br/>    ]<br/>  }<br/>}</pre> |

### options.allowForbiddenUnixChars

By default `valid-path` does not accept characters in path items that are forbidden in Unix: `\0` (NULL byte), `/`. Set to `true` to accept these characters.

| Default | Expects |
| :------ | :------ |
| `false` | boolean |

**Example**

| **input**   | `a/\0b/c` | `a/\0b/c` |
| :---------- | :---- | :------   |
| **options** | <pre>{<br/>  //  default<br/>}</pre> | <pre>{<br/>  allowForbiddenUnixChars: true<br/>}</pre> |
| **output**  | <pre>{<br/>  valid: false,<br/>  error: 'Input string contains characters,<br/>          that are forbidden in Unix (\x00b)',<br/>  data: {<br/>    input: 'a/\x00b/c',<br/>    notes: []<br/>  }<br/>}</pre> | <pre>{<br/>  valid: true,<br/>  error: null,<br/>  data: {<br/>    input: 'a/\x00b/c',<br/>    notes: [<br/>      'Input string contains characters,<br/>       that are forbidden in Unix  (\x00b)'<br/>    ]<br/>  }<br/>}</pre> |
