import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import comparingTree1 from '../valuesForTests/forJSONcompar1.js';
import comparingTree2 from '../valuesForTests/forJSONcompar2.js';
import comparingYamlTree from '../valuesForTests/forYAMLcompar.js';
import jsonOutput from '../valuesForTests/JSONoutput.js';
import * as plain from '../valuesForTests/PlainOutput.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  {
    readFirstFile: getFixturePath('file1.json'),
    readSecondFile: getFixturePath('file2.json'),
    expected: comparingTree1,
  },
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: comparingTree2,
  },
])('comparing not flat json files (build tree)', ({ readFirstFile, readSecondFile, expected }) => {
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toBe(expected);
});

test('comparing not flat yaml files (build tree)', () => {
  expect(genDiff(getFixturePath('file5.yaml'), getFixturePath('file6.yaml'), 'stylish')).toEqual(comparingYamlTree);
});

test.each([
  {
    readFirstFile: getFixturePath('file1.json'),
    readSecondFile: getFixturePath('file2.json'),
    expected: plain.plainOutput1,
  },
  {
    readFirstFile: getFixturePath('file3.json'),
    readSecondFile: getFixturePath('file4.json'),
    expected: plain.plainOutput2,
  },
])('comparing not flat json files (plain output)', ({ readFirstFile, readSecondFile, expected }) => {
  expect(genDiff(readFirstFile, readSecondFile, 'plain')).toBe(expected);
});

test('comparing not flat json files (JSON output)', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(jsonOutput);
});
