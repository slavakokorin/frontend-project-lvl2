import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getFormatter = (str) => {
  if (str === 'plain') {
    return getPlain;
  }
  if (str === 'json') {
    return getJSON;
  }
  return getStylish;
};

export default getFormatter;
