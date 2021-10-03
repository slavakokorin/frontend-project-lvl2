import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const formate = (innerTree, format) => {
  if (format === 'plain') {
    return getPlain(innerTree);
  }
  if (format === 'json') {
    return getJSON(innerTree);
  }
  return getStylish(innerTree);
};

export default formate;
