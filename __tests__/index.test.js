import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

// следующие две строки нужны для работы __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('comparing flat json files', () => {
  const readFirstFile = getFixturePath('file1.json');
  const readSecondFile = getFixturePath('file2.json');
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toEqual(
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
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toEqual(
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
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toEqual(
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

test('plain output', () => {
  const readFirstFile = getFixturePath('file5.json');
  const readSecondFile = getFixturePath('file6.json');
  expect(genDiff(readFirstFile, readSecondFile, 'plain')).toEqual(
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  );
});

test('JSON output', () => {
  const readFirstFile = getFixturePath('file5.json');
  const readSecondFile = getFixturePath('file6.json');
  expect(genDiff(readFirstFile, readSecondFile, 'json')).toEqual(
    `[
  {
    "name": "common",
    "nodeCondition": "changed",
    "condition": "has children",
    "children": [
      {
        "name": "follow",
        "condition": "added",
        "secondValue": false
      },
      {
        "name": "setting1",
        "condition": "not changed",
        "firstValue": "Value 1"
      },
      {
        "name": "setting2",
        "condition": "deleted",
        "firstValue": 200
      },
      {
        "name": "setting3",
        "condition": "changed",
        "firstValue": true,
        "secondValue": null
      },
      {
        "name": "setting4",
        "condition": "added",
        "secondValue": "blah blah"
      },
      {
        "name": "setting5",
        "nodeCondition": "added",
        "condition": "has children",
        "children": [
          {
            "name": "key5",
            "condition": "not changed",
            "firstValue": "value5"
          }
        ]
      },
      {
        "name": "setting6",
        "nodeCondition": "changed",
        "condition": "has children",
        "children": [
          {
            "name": "doge",
            "nodeCondition": "changed",
            "condition": "has children",
            "children": [
              {
                "name": "wow",
                "condition": "changed",
                "firstValue": "",
                "secondValue": "so much"
              }
            ]
          },
          {
            "name": "key",
            "condition": "not changed",
            "firstValue": "value"
          },
          {
            "name": "ops",
            "condition": "added",
            "secondValue": "vops"
          }
        ]
      }
    ]
  },
  {
    "name": "group1",
    "nodeCondition": "changed",
    "condition": "has children",
    "children": [
      {
        "name": "baz",
        "condition": "changed",
        "firstValue": "bas",
        "secondValue": "bars"
      },
      {
        "name": "foo",
        "condition": "not changed",
        "firstValue": "bar"
      },
      {
        "name": "nest",
        "nodeCondition": "updated",
        "firstValue": {
          "key": "value"
        },
        "secondValue": "str",
        "condition": "has children",
        "children": [
          {
            "name": "key",
            "condition": "not changed",
            "firstValue": "value"
          }
        ]
      }
    ]
  },
  {
    "name": "group2",
    "nodeCondition": "deleted",
    "condition": "has children",
    "children": [
      {
        "name": "abc",
        "condition": "not changed",
        "firstValue": 12345
      },
      {
        "name": "deep",
        "nodeCondition": "changed",
        "condition": "has children",
        "children": [
          {
            "name": "id",
            "condition": "not changed",
            "firstValue": 45
          }
        ]
      }
    ]
  },
  {
    "name": "group3",
    "nodeCondition": "added",
    "condition": "has children",
    "children": [
      {
        "name": "deep",
        "nodeCondition": "changed",
        "condition": "has children",
        "children": [
          {
            "name": "id",
            "nodeCondition": "changed",
            "condition": "has children",
            "children": [
              {
                "name": "number",
                "condition": "not changed",
                "firstValue": 45
              }
            ]
          }
        ]
      },
      {
        "name": "fee",
        "condition": "not changed",
        "firstValue": 100500
      }
    ]
  }
]`,
  );
});
