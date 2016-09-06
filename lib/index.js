const keyReplace = require('key-replace');
const parsePercentage = require('./parse-percentage');
// https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes


const toPercentage = value => {
  switch (value) {
    case 'from':
      return 0;
    case 'to':
      return 100;
  }
  return parsePercentage(value);
};

const flatten = items => items.reduce((prev, next) => [...prev, ...next], []);

const convert = (props, value) => {
  const percentages = props.split(',').map(v => v.trim());
  return percentages.map(p => {
    return { percentage: toPercentage(p), value: value };
  });
};

const convertPercentages = keyframes => {
  const parse = Object.keys(keyframes).map(k => {
    return convert(k, keyframes[k]);
  });
  return flatten(parse).sort((a, b) => a.percentage - b.percentage);
};

const isValidValue = num => {
  return !isNaN(num) && num >= 0 && num <= 100;
};

const isValid = arr => {
  return arr.every(({ percentage }) => {
    return isValidValue(percentage);
  });
};

const finalize = keyframeArray => {
  return keyframeArray.map(({ percentage, value }) => {
    const offsetValue = {
      offset: percentage / 100
    };
    const re = /animation-timing-function|animationTimingFunction/;
    const replacedValue = keyReplace(value, re, 'easing');
    return Object.assign({}, replacedValue, offsetValue);
  });
};

const convertCssKeyframe = keyframes => {
  const arr = convertPercentages(keyframes);
  if (!isValid(arr)) {
    return null;
  }
  return finalize(arr);
};

module.exports = convertCssKeyframe;