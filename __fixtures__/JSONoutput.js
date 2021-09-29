const jsonOutput = `[
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
        "nodeCondition": "updated to obj",
        "firstValue": true,
        "secondValue": {
          "key": "value"
        },
        "children": [
          {
            "name": "key",
            "condition": "not changed",
            "firstValue": "value"
          }
        ]
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
                "firstValue": "too much",
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
  },
  {
    "name": "group4",
    "nodeCondition": "not changed",
    "children": [
      {
        "name": "default",
        "condition": "changed",
        "firstValue": null,
        "secondValue": ""
      },
      {
        "name": "foo",
        "condition": "changed",
        "firstValue": 0,
        "secondValue": null
      },
      {
        "name": "isNested",
        "condition": "changed",
        "firstValue": false,
        "secondValue": "none"
      },
      {
        "name": "key",
        "condition": "added",
        "secondValue": false
      },
      {
        "name": "nest",
        "nodeCondition": "not changed",
        "children": [
          {
            "name": "bar",
            "condition": "changed",
            "firstValue": "",
            "secondValue": 0
          },
          {
            "name": "isNested",
            "condition": "deleted",
            "firstValue": true
          }
        ]
      },
      {
        "name": "someKey",
        "condition": "added",
        "secondValue": true
      },
      {
        "name": "type",
        "condition": "changed",
        "firstValue": "bas",
        "secondValue": "bar"
      }
    ]
  }
]`;

export default jsonOutput;
