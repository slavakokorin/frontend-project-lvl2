import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getFormatter = (format) => {
  if (format === 'plain') {
    return getPlain;
  }
  if (format === 'json') {
    return getJSON;
  }
  return getStylish;
};

export default getFormatter;
