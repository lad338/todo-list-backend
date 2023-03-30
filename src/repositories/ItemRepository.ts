import itemSchema from '../schemas/ItemSchema'
import mongoose from 'mongoose'
import IItem from '../models/entities/IItem'

const model = mongoose.model('item', itemSchema)
const add = async (title: string) => {
  await model.create({ title })
}

const getById = async (id: string) => {
  return model.findById(id).exec()
}

const save = async (id: string, item: Partial<IItem>) => {
  const f = await model.findByIdAndUpdate(id, item).exec()
}

const setUndone = async (id: string) => {
  const item = await model.findById(id).exec()
  if (item) {
    item.doneTime = undefined
    await item.save()
  } else {
    throw Error(`item not found with id: ${id}`)
  }
}

const listDone = async (count: number, title?: string) => {
  return await model
    .where({
      doneTime: { $exists: true },
      title: { $regex: `^${title || ''}` },
    })
    .sort({ doneTime: 'desc', title: 'asc' })
    .limit(count)
    .exec()
}

const listUndone = async (count: number, skip?: number, title?: string) => {
  return await model
    .where({
      doneTime: { $exists: false },
      title: { $regex: `^${title || ''}` },
    })
    .sort({ title: 'asc' })
    .skip(skip || 0)
    .limit(count)
    .exec()
}

const deleteAll = async () => {
  await model.deleteMany({}).exec()
}

export default {
  add,
  getById,
  save,
  setUndone,
  listUndone,
  listDone,
  deleteAll,
}
