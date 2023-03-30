db = db.getSiblingDB('todo_list')
db.createCollection('items', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        doneTime: {
          bsonType: 'date',
          description: 'must be a date, null indicates not done',
        },
      },
    },
  },
})

db.items.createIndex({
  doneTime: -1,
})
db.items.createIndex({
  title: 1,
})
