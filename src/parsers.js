import yaml from 'js-yaml';

const parseToObject = (content, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(content);
  }
  if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return yaml.safeLoad(content);
  }
  return null;
};

export default parseToObject;
