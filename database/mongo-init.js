db = db.getSiblingDB('todo_list')
db.createCollection('tasks', {
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

db.tasks.createIndex({
  doneTime: -1,
})
db.tasks.createIndex({
  title: 1,
})
db.tasks.createIndex({
  doneTime: -1,
  title: 1,
})
