# valid-path [![NPM version](https://badge.fury.io/js/valid-path.svg)](http://badge.fury.io/js/valid-path)
Returns true if provided string looks like a path

## Install

```
$ npm install valid-path --save
```

## Usage

Add `valid-path` to your NodeJS script:

```
var validPath = require('valid-path');
```
_or_
```
const validPath = require('validPath');
```
_or_
```
import validPath from 'valid-path';
```

Then you can use `valid-path`:

```javascript
var myPath = validPath('some/string/that/you/need/to/check');

if (myPath) {
    // do something
} else {
    console.error(myPath);
}
```

## Examples

|Script|Return|
|------|------|
|`validPath();`|'Type of provided argument is not a string'|
|`validPath({key: 'value'});`|'Type of provided argument is not a string'|
|`validPath('');`|'Provided string is empty'|
|`validPath('      ');`|'Provided string is empty'|
|`validPath('a/b//c');`|'Duplicated separator'|
|`validPath('a/b//c', {sepDuplications: true});`|true|
|`validPath('a\\b\\c');`|'Forbidden characters'|
|`validPath('a\\b\\c', {sep: '\\'});`|true|
|`validPath('a\\b\\\\c', {sep: '\\'});`|'Duplicated separator'|
|`validPath('a\\b\\\\c', {sep: '\\', sepDuplications: true});`|true|
|`validPath('C:/a/b/c');`|true|
|`validPath('C:');`|'Forbidden characters'|
|`validPath('C:/');`|true|
|`validPath('C:\\\\a\\b\\c', {sep: '\\', sepDuplications: true});`|true|
|`validPath('C:/a/b/c', {disk: false});`|'Contains drive letter'|
|`validPath('C:/', {disk: false});`|'Contains drive letter'|
|`validPath('C:\\\\a\\b\\c', {sep: '\\', sepDuplications: true, disk: false});`|'Contains drive letter'|
|`validPath('a/b/con/c');`|'Forbidden file or folder name'|
|`validPath('a/b/na?me/c');`|'Forbidden characters'


## Options

### options.sep

Defines path separator.

_Default_: `/`

_Allowed_: `/` or `\\`

```
validPath('a\\b', {
	sep: '\\'
});
// => true
```

### options.sepDuplications

Allowes duplications of separator

_Default_: `false`

```
validPath('a\\\\b', {
	sep: '\\',
	sepDuplications: true
});
// => true
```

### options.disk

Allow to use drive letter (`C:/a/b`)

_Default_: `true`

```
validPath('C:/a/b/c'); // => true

validPath('C:/a/b/c', {
    disk: false
}); // => 'Contains drive letter'
```

## license

MIT License

Copyright (c) 2017 Denis Solovets

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
