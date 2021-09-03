import yaml from 'js-yaml';
import _ from 'lodash';

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
