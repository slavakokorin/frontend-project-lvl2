import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import comparingTree from '../__fixtures__/forJSONcompar.js';
import comparingYamlTree from '../__fixtures__/forYAMLcompar.js';
import jsonOutput from '../__fixtures__/JSONoutput.js';
import plainOutput from '../__fixtures__/PlainOutput.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: comparingTree,
  },
])('comparing not flat json files (build tree)', ({ readFirstFile, readSecondFile, expected }) => {
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toBe(expected);
});

test('comparing not flat yaml files (build tree)', () => {
  expect(genDiff(getFixturePath('file5.yaml'), getFixturePath('file6.yaml'), 'stylish')).toEqual(comparingYamlTree);
});

test.each([
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: plainOutput,
  },
])('comparing not flat json files (plain output)', ({ readFirstFile, readSecondFile, expected }) => {
  expect(genDiff(readFirstFile, readSecondFile, 'plain')).toBe(expected);
});

test('comparing not flat json files (JSON output)', () => {
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'json')).toEqual(jsonOutput);
});
