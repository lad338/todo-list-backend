import TaskRepository from '../repositories/TaskRepository'

const add = async (title: string) => {
  await TaskRepository.add(title)
}

const updateDone = async (id: string, isDone: boolean) => {
  if (isDone) {
    await TaskRepository.save(id, { doneTime: new Date() })
  } else {
    await TaskRepository.setUndone(id)
  }
}

const updateTitle = async (id: string, title: string) => {
  await TaskRepository.save(id, { title })
}

const listDone = async (title?: string) => {
  return await TaskRepository.listDone(10, title)
}

const listUndone = async (skip?: number, title?: string) => {
  return await TaskRepository.listUndone(15, skip, title)
}

const deleteAll = async () => {
  return await TaskRepository.deleteAll()
}

const deleteById = async (id: string) => {
  return await TaskRepository.deleteById(id)
}

export default {
  add,
  updateDone,
  updateTitle,
  listUndone,
  listDone,
  deleteAll,
  deleteById,
}
