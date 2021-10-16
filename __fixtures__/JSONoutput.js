const jsonOutput = `[
  {
    "name": "common",
    "type": "nested",
    "children": [
      {
        "name": "follow",
        "type": "added",
        "newValue": false
      },
      {
        "name": "setting1",
        "type": "unchanged",
        "oldValue": "Value 1"
      },
      {
        "name": "setting2",
        "type": "deleted",
        "oldValue": 200
      },
      {
        "name": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": {
          "key": "value"
        }
      },
      {
        "name": "setting4",
        "type": "added",
        "newValue": "blah blah"
      },
      {
        "name": "setting5",
        "type": "added",
        "newValue": {
          "key5": "value5"
        }
      },
      {
        "name": "setting6",
        "type": "nested",
        "children": [
          {
            "name": "doge",
            "type": "nested",
            "children": [
              {
                "name": "wow",
                "type": "changed",
                "oldValue": "too much",
                "newValue": "so much"
              }
            ]
          },
          {
            "name": "key",
            "type": "unchanged",
            "oldValue": "value"
          },
          {
            "name": "ops",
            "type": "added",
            "newValue": "vops"
          }
        ]
      }
    ]
  },
  {
    "name": "group1",
    "type": "nested",
    "children": [
      {
        "name": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "name": "foo",
        "type": "unchanged",
        "oldValue": "bar"
      },
      {
        "name": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "name": "group2",
    "type": "deleted",
    "oldValue": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "name": "group3",
    "type": "added",
    "newValue": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  },
  {
    "name": "group4",
    "type": "nested",
    "children": [
      {
        "name": "default",
        "type": "changed",
        "oldValue": null,
        "newValue": ""
      },
      {
        "name": "foo",
        "type": "changed",
        "oldValue": 0,
        "newValue": null
      },
      {
        "name": "isNested",
        "type": "changed",
        "oldValue": false,
        "newValue": "none"
      },
      {
        "name": "key",
        "type": "added",
        "newValue": false
      },
      {
        "name": "nest",
        "type": "nested",
        "children": [
          {
            "name": "bar",
            "type": "changed",
            "oldValue": "",
            "newValue": 0
          },
          {
            "name": "isNested",
            "type": "deleted",
            "oldValue": true
          }
        ]
      },
      {
        "name": "someKey",
        "type": "added",
        "newValue": true
      },
      {
        "name": "type",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bar"
      }
    ]
  }
]`;

export default jsonOutput;
