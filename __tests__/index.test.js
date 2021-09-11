import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

// следующие две строки нужны для работы __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('comparing flat json files', () => {
  const readFirstFile = getFixturePath('file1.json');
  const readSecondFile = getFixturePath('file2.json');
  expect(genDiff(readFirstFile, readSecondFile, stylish)).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('comparing flat yaml files', () => {
  const readFirstFile = getFixturePath('file3.yaml');
  const readSecondFile = getFixturePath('file4.yaml');
  expect(genDiff(readFirstFile, readSecondFile, stylish)).toEqual(
    `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});

test('comparing not flat json files', () => {
  const readFirstFile = getFixturePath('file5.json');
  const readSecondFile = getFixturePath('file6.json');
  expect(genDiff(readFirstFile, readSecondFile, stylish)).toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  );
});
