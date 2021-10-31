import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const mapping = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJSON,
};

const format = (innerTree, ontputFormat) => {
  if (!_.has(mapping, ontputFormat)) {
    throw new Error(`Format: ${ontputFormat} is not supported. Use "plain", "json" or "stylish"`);
  }
  return mapping[ontputFormat](innerTree);
};

export default format;
