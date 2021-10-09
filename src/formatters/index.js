import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const format = (innerTree, ontputFormat) => {
  if (ontputFormat === 'plain') {
    return getPlain(innerTree);
  }
  if (ontputFormat === 'json') {
    return getJSON(innerTree);
  }
  return getStylish(innerTree);
};

export default format;
