import _ from 'lodash';
import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const mapping = {
  plain: getPlain,
  stylish: getStylish,
  json: getJSON,
};

const format = (innerTree, ontputFormat) => {
  if (!_.has(mapping, ontputFormat)) {
    return getStylish(innerTree);
  }
  return mapping[ontputFormat](innerTree);
};

export default format;
