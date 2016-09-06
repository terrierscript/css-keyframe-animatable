# css-keyframe-to-array

Convert CSS `@keyframes` like object to `Element.animate` compatible array

[![npm](https://img.shields.io/npm/v/css-keyframe-animatable.svg)](https://www.npmjs.com/package/css-keyframe-animatable)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/inuscript/css-keyframe-animatable.svg?branch=master)](https://travis-ci.org/inuscript/css-keyframe-animatable)

```js
const cssKeyframesToArray = require('css-keyframe-to-array')

const input = {
  from: { marginTop: '50px' },
  to: { marginTop: '100px' }
}

cssKeyframesToArray(input)
```

Output

```js
[
  { marginTop: '50px', offset: 0 },
  { marginTop: '100px', offset: 1 }
]
```

More complex example

```js
const input = {
  '0% ': { top: 0, left: 0 },
  '30%': { top: '50px', animationTimingFunction: 'ease-out' },
  '68%, 72%': { left: '50px' },
  '100%': { top: '100px', left: '100%' }
}
cssKeyframesToArray(input)
```

```js
[
  { top: 0, left: 0, offset: 0 },
  { top: '50px', offset: 0.3 , easing: 'ease-out'},
  { left: '50px', offset: 0.68 },
  { left: '50px', offset: 0.72 },
  { top: '100px', left: '100%', offset: 1 }
]
```
- Percentage timing is replace to `offset` (between 0.0 ~ 1.0)
- Flatten comma separated percentage timing
- `animationTimingFunction` or `animation-timing-function` is replaced to `easing`

# Related Project

- [keyshond](https://github.com/inuscript/keyshond)