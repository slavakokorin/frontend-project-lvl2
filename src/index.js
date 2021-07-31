import fs from 'fs';
import getObject from './parsers.js';
import getObjectDifferences from './utilities.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, fileExtension1, filepath2, fileExtension2) => {
  const сontent1 = readFile(filepath1);
  const сontent2 = readFile(filepath2);

  const data1 = getObject(сontent1, fileExtension1);
  const data2 = getObject(сontent2, fileExtension2);

  return getObjectDifferences(data1, data2);
};

export default genDiff;
