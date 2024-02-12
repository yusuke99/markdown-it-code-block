## Basic

```js
console.log('foo');
```

```js [your title here]
console.log('foo');
```

```js [with line-number] line-number
console.log('foo');
console.log('bar');
console.log('baz');
```

```js [highlight code] {1}
console.log('foo');
```

```js [multiple highlights] {1,3-5,7} line-number
import { bar } from './utils';

function foo() {
  return bar('baz');
}

foo();
```

## Markup and style

```html [html]
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <main>
    <!-- your code here -->
  </main>
  <script type="module" src="main.js"></script>
</body>
</html>
```

```css [css]
:root {
  --c-main: #000000;
}

body {
  font-family: "Inter", sans-serif;
}

.container {
  display: grid;
}

.error > p {
  color: red !important;
}

#header__btn {
  color: blue;
}

.link:hover {
  opacity: 0.8;
}

@keyframes slidein {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
}

@media screen and (min-width: 768px) {
  article {
    padding: 1rem 2rem;
  }
}
```

## Tokens

```js [keyword]
for (const foo of bar) {
  if (foo === 'foo') {
    break;
  } else if (bar === 'bar') {
    continue;
  } else {
    return await baz();
  }
}

switch (expression) {
  case 'foo':
    break;
  case 'bar':
    continue;
  default:
    return 'baz';
}

try {
  /* ... */
} catch (error) {
  /* ... */
} finally {
  /* ... */
}

while(condition) {
  /* ... */
}

do {
  /* ... */
} while (condition);

async function foo() {
  return new Bar();
}

export default foo;

typeof foo;
```

```js [builtin]
Math.random();
['foo', 'bar', 'baz'].map(/* ... */);
```

```js [class-name]
class Foo extends Bar {/* ... */}
```

```js [boolean]
console.log(true === true);
console.log(true !== false);
```

```js [number]
console.log(255);
console.log(255.0;);
console.log(255 === 255.0);
console.log(255 === 0xff);
console.log(255 === 0b11111111);
console.log(255 === 0.255e3);
```

```js [string]
console.log('foo bar baz');
```

```js [char]
['A', 'z', '0', '-', '\t', '\u{2728}'];
```

```js [regex]
/\w|\d/.match(/* ... */);
```

```md [url]
[markdown-it-code-block | npm](https://www.npmjs.com/package/markdown-it-code-block)
```

```js [operator]
a += (b + 4 >> -c === d) ? x ** y : ~z;
```

```bash [variable]
echo $STRING
args=("$@")
echo ${args[0]} ${args[1]} ${args[2]}
```

```js [constant]
const PI = 3.14159;
```

```json [property]
{
  "data": { "labels": ["foo", "bar", "baz"] },
  "error": null,
  "status": "ok"
}
```

```html [attr-name, attr-value]
<video width="1280" height="720" allowfullscreen controls>
  <source src="foo.mp4" type="video/mp4" />
</video>
```

```html [namespace]
<html:p foo:bar="baz" hello:world></html:p>
```

```html [prolog]
<?xml version="1.0" encoding="utf-8"?>
<svg></svg>
```

```html [entity]
&amp;
&quot;
&nbsp;
&gt;
&lt;
```

```md [italic, bold]
*Italic*
**Bold**
```

```js [playground] {1}
// try it yourself :)
```
