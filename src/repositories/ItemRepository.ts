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
  await model.findByIdAndUpdate(id, item).exec()
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

const listDone = async (limit: number, title?: string) => {
  return await model
    .where({
      doneTime: { $exists: true },
      title: { $regex: `^${title || ''}` },
    })
    .sort({ doneTime: 'desc', title: 'asc' })
    .limit(limit)
    .exec()
}

const listUndone = async (limit: number, skip?: number, title?: string) => {
  const where = {
    doneTime: { $exists: false },
    title: { $regex: `^${title || ''}` },
  }

  return {
    list: await model
      .where(where)
      .sort({ title: 'asc' })
      .skip(skip || 0)
      .limit(limit)
      .exec(),
    hasMore: (await model.where(where).count().exec()) > (skip || 0) + limit,
  }
}

const deleteAll = async () => {
  await model.deleteMany({}).exec()
}

const deleteById = async (id: string) => {
  await model.findByIdAndDelete(id).exec()
}

export default {
  add,
  getById,
  save,
  setUndone,
  listUndone,
  listDone,
  deleteAll,
  deleteById,
}
