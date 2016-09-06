const postcss = require('postcss')
const postcssJs = require('postcss-js')
const cssKeyframesToArray = require('../src/')
const assert = require('assert')

describe('with postcss', () => {
  it('convert raw css string', () => {
    let css  = `
    @keyframes identifier {
      from { top: 0; left: 0; }
      to { top: 100px; left: 100%; }
    }
    `
    const obj = postcssJs.objectify( postcss.parse(css) )
    const result = cssKeyframesToArray(obj['@keyframes identifier'])
    const expect = [
      { top: '0', left: '0', offset: 0 },
      { top: '100px', left: '100%', offset: 1 }
    ]
    assert.deepEqual(result, expect)
  })
})
