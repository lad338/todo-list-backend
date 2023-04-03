import ItemRepository from '../repositories/ItemRepository'

const add = async (title: string) => {
  await ItemRepository.add(title)
}

const updateDone = async (id: string, isDone: boolean) => {
  if (isDone) {
    await ItemRepository.save(id, { doneTime: new Date() })
  } else {
    await ItemRepository.setUndone(id)
  }
}

const updateTitle = async (id: string, title: string) => {
  await ItemRepository.save(id, { title })
}

const listDone = async (title?: string) => {
  return await ItemRepository.listDone(10, title)
}

const listUndone = async (skip?: number, title?: string) => {
  return await ItemRepository.listUndone(15, skip, title)
}

const deleteAll = async () => {
  return await ItemRepository.deleteAll()
}

const deleteById = async (id: string) => {
  return await ItemRepository.deleteById(id)
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
