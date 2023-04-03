import { Schema } from 'mongoose'

const taskSchema = new Schema({
  title: String,
  doneTime: Date,
})

export default taskSchema
