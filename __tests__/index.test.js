import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import JSONTree from '../__fixtures__/JSONtree.js';
import comparingYamlTree from '../__fixtures__/YAMLtree.js';
import jsonOutput from '../__fixtures__/JSONoutput.js';
import plainOutput from '../__fixtures__/PlainOutput.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: JSONTree,
    format: 'stylish',
  },
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: plainOutput,
    format: 'plain',
  },
  {
    readFirstFile: getFixturePath('file5.yaml'),
    readSecondFile: getFixturePath('file6.yaml'),
    expected: comparingYamlTree,
    format: 'stylish',
  },
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: jsonOutput,
    format: 'json',
  },
])('comparing not flat json and yaml files', ({
  readFirstFile, readSecondFile, expected, format,
}) => {
  expect(genDiff(readFirstFile, readSecondFile, format)).toBe(expected);
});
