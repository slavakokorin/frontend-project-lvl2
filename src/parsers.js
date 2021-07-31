import yaml from 'js-yaml';

const getObject = (content, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(content);
  }
  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return yaml.safeLoad(content);
  }
  return null;
};

export default getObject;
