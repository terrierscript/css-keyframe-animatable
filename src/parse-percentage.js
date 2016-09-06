// see: https://github.com/jedmao/parse-css-dimension/blob/master/index.js#L25-L30
module.exports = (value) => {
  const parsed = Number.parseFloat(value)
  if (typeof parsed === 'number') {
    return parsed
  }

  // with percentage
  if (!/%$/.test(value)) {
    return NaN
  }
  const float = Number.parseFloat(value)
  return isNaN(float) ? NaN : float
}
