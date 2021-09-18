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

test('comparing not flat json files - 2', () => {
  const readFirstFile = getFixturePath('file7.json');
  const readSecondFile = getFixturePath('file8.json');
  expect(genDiff(readFirstFile, readSecondFile, 'stylish')).toEqual(
    `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
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
    group4: {
      - default: null
      + default: 
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar: 
          + bar: 0
          - isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
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
    "nodeCondition": "not changed",
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
        "secondValue": {
          "key5": "value5"
        },
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
        "nodeCondition": "not changed",
        "children": [
          {
            "name": "doge",
            "nodeCondition": "not changed",
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
    "nodeCondition": "not changed",
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
        "nodeCondition": "updated to str",
        "firstValue": {
          "key": "value"
        },
        "secondValue": "str",
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
    "children": [
      {
        "name": "abc",
        "condition": "not changed",
        "firstValue": 12345
      },
      {
        "name": "deep",
        "nodeCondition": "not changed",
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
    "secondValue": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    },
    "children": [
      {
        "name": "deep",
        "nodeCondition": "not changed",
        "children": [
          {
            "name": "id",
            "nodeCondition": "not changed",
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

test('plain output - 2', () => {
  const readFirstFile = getFixturePath('file7.json');
  const readSecondFile = getFixturePath('file8.json');
  expect(genDiff(readFirstFile, readSecondFile, 'plain')).toEqual(
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'group4.default' was updated. From null to ''
Property 'group4.foo' was updated. From 0 to null
Property 'group4.isNested' was updated. From false to 'none'
Property 'group4.key' was added with value: false
Property 'group4.nest.bar' was updated. From '' to 0
Property 'group4.nest.isNested' was removed
Property 'group4.someKey' was added with value: true
Property 'group4.type' was updated. From 'bas' to 'bar'`,
  );
});
