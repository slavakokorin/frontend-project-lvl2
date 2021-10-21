import yaml from 'js-yaml';
import _ from 'lodash';

const mapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
};

const parse = (content, format) => {
  if (!_.has(mapping, format)) {
    throw new Error(`Format: ${format} is not supported. Use JSON and YAML`);
  }
  return mapping[format](content);
};
export default parse;
