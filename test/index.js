const cssKeyframesToArray = require('../lib/')
const assert = require('assert')

describe('css @keyframes', () => {
  it('Convert from and to ', () => {
    const input = {
      from: { marginTop: '50px' },
      to: { marginTop: '100px' }
    }
    const expect = [
      { marginTop: '50px', offset: 0 },
      { marginTop: '100px', offset: 1 }
    ]
    assert.deepEqual(cssKeyframesToArray(input), expect)
  })
  it('Fully exmaple ', () => {
    const input = {
      '0% ': { top: 0, left: 0 },
      '30%': { top: '50px', animationTimingFunction: 'ease-out' },
      '68%, 72%': { left: '50px' },
      '100%': { top: '100px', left: '100%' }
    }
    const expect = [
      { top: 0, left: 0, offset: 0 },
      { top: '50px', offset: 0.3 , easing: 'ease-out'},
      { left: '50px', offset: 0.68 },
      { left: '50px', offset: 0.72 },
      { top: '100px', left: '100%', offset: 1 }
    ]
    assert.deepEqual(cssKeyframesToArray(input), expect)
  })

  it('Convert percentages (multiple percent value)', () => {
    const input = {
      '0% ': { top: 0, left: 0 },
      '30%, 31%,32%': { top: '50px' },
      '100%': { top: '100px', left: '100%' }
    }
    const expect = [
      { top: 0, left: 0, offset: 0 },
      { top: '50px', offset: 0.3 },
      { top: '50px', offset: 0.31 },
      { top: '50px', offset: 0.32 },
      { top: '100px', left: '100%', offset: 1 }
    ]
    assert.deepEqual(cssKeyframesToArray(input), expect)
  })
  it('Convert animationTimingFunction ', () => {
    const input = {
      from: { marginTop: '50px', 'animation-timing-function': 'ease-in' },
      to: { marginTop: '100px', 'animationTimingFunction': 'ease-out' }
    }
    const expect = [
      { marginTop: '50px', offset: 0, easing: 'ease-in' },
      { marginTop: '100px', offset: 1, easing: 'ease-out'}
    ]

    assert.deepEqual(cssKeyframesToArray(input), expect)
  })

})