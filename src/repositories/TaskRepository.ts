import taskSchema from '../schemas/TaskSchema'
import mongoose from 'mongoose'
import Task from '../models/entities/Task'

const model = mongoose.model('task', taskSchema)
const add = async (title: string) => {
  await model.create({ title })
}

const getById = async (id: string) => {
  return model.findById(id).exec()
}

const save = async (id: string, task: Partial<Task>) => {
  await model.findByIdAndUpdate(id, task).exec()
}

const setUndone = async (id: string) => {
  const task = await model.findById(id).exec()
  if (task) {
    task.doneTime = undefined
    await task.save()
  } else {
    throw Error(`task not found with id: ${id}`)
  }
}

const listDone = async (limit: number, title?: string) => {
  return await model
    .where({
      doneTime: { $exists: true },
      title: { $regex: `^${title || ''}`, $options: 'i' },
    })
    .sort({ doneTime: 'desc', title: 'asc' })
    .limit(limit)
    .exec()
}

const listUndone = async (limit: number, skip?: number, title?: string) => {
  const where = {
    doneTime: { $exists: false },
    title: { $regex: `^${title || ''}`, $options: 'i' },
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
