import { Schema } from 'mongoose'

const itemSchema = new Schema({
  title: String,
  doneTime: Date,
})

export default itemSchema
