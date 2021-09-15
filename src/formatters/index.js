import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (str) => {
  if (str === 'plain') {
    return plain;
  }
  return stylish;
};

export default getFormatter;
