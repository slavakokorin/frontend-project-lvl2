const jsonOutput = `[
  {
    "name": "common",
    "nodeCondition": "not changed",
    "children": [
      {
        "name": "follow",
        "condition": "added",
        "newValue": false
      },
      {
        "name": "setting1",
        "condition": "not changed",
        "oldValue": "Value 1"
      },
      {
        "name": "setting2",
        "condition": "deleted",
        "oldValue": 200
      },
      {
        "name": "setting3",
        "nodeCondition": "updated to obj",
        "oldValue": true,
        "newValue": {
          "key": "value"
        },
        "children": [
          {
            "name": "key",
            "condition": "not changed",
            "oldValue": "value"
          }
        ]
      },
      {
        "name": "setting4",
        "condition": "added",
        "newValue": "blah blah"
      },
      {
        "name": "setting5",
        "nodeCondition": "added",
        "newValue": {
          "key5": "value5"
        },
        "children": [
          {
            "name": "key5",
            "condition": "not changed",
            "oldValue": "value5"
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
                "oldValue": "too much",
                "newValue": "so much"
              }
            ]
          },
          {
            "name": "key",
            "condition": "not changed",
            "oldValue": "value"
          },
          {
            "name": "ops",
            "condition": "added",
            "newValue": "vops"
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
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "name": "foo",
        "condition": "not changed",
        "oldValue": "bar"
      },
      {
        "name": "nest",
        "nodeCondition": "updated to str",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str",
        "children": [
          {
            "name": "key",
            "condition": "not changed",
            "oldValue": "value"
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
        "oldValue": 12345
      },
      {
        "name": "deep",
        "nodeCondition": "not changed",
        "children": [
          {
            "name": "id",
            "condition": "not changed",
            "oldValue": 45
          }
        ]
      }
    ]
  },
  {
    "name": "group3",
    "nodeCondition": "added",
    "newValue": {
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
                "oldValue": 45
              }
            ]
          }
        ]
      },
      {
        "name": "fee",
        "condition": "not changed",
        "oldValue": 100500
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
        "oldValue": null,
        "newValue": ""
      },
      {
        "name": "foo",
        "condition": "changed",
        "oldValue": 0,
        "newValue": null
      },
      {
        "name": "isNested",
        "condition": "changed",
        "oldValue": false,
        "newValue": "none"
      },
      {
        "name": "key",
        "condition": "added",
        "newValue": false
      },
      {
        "name": "nest",
        "nodeCondition": "not changed",
        "children": [
          {
            "name": "bar",
            "condition": "changed",
            "oldValue": "",
            "newValue": 0
          },
          {
            "name": "isNested",
            "condition": "deleted",
            "oldValue": true
          }
        ]
      },
      {
        "name": "someKey",
        "condition": "added",
        "newValue": true
      },
      {
        "name": "type",
        "condition": "changed",
        "oldValue": "bas",
        "newValue": "bar"
      }
    ]
  }
]`;

export default jsonOutput;
