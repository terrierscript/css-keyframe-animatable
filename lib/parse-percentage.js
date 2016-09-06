// see: https://github.com/jedmao/parse-css-dimension/blob/master/index.js#L25-L30
module.exports = value => {
  if (typeof value === 'number') {
    return value;
  }
  if (!/%$/.test(value)) {
    return null;
  }
  const float = parseFloat(value);
  return isNaN(float) ? null : float;
};