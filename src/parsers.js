import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
};

const parse = (content, format) => mapping[format](content);
export default parse;
