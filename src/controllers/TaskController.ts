import { Request, Response } from 'express'
import AddTaskRequest from '../models/requests/AddTaskRequest'
import PatchTaskRequest from '../models/requests/PatchTaskRequest'
import TaskService from '../services/TaskService'

const add = async (req: Request, res: Response) => {
  try {
    const body = req.body as AddTaskRequest
    await TaskService.add(body.title)

    res.status(201)
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][add] e: ${e}`)
    res.status(400)
    res.send({
      success: false,
    })
  }
}

const patch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const body = req.body as PatchTaskRequest
    if (body.isDone !== undefined) {
      await TaskService.updateDone(id, body.isDone)
    } else if (body.title !== undefined) {
      await TaskService.updateTitle(id, body.title)
    }

    res.status(202)
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][patch] e: ${e}`)
    res.status(400)
    res.send({
      success: false,
    })
  }
}

const list = async (req: Request, res: Response) => {
  try {
    const qSkip = req.query.skip as string | undefined
    const skip = parseInt(qSkip || '0')
    const qTitle = req.query.title as string | undefined

    const undoneResults = await TaskService.listUndone(skip, qTitle)

    res.send({
      hasMore: undoneResults.hasMore,
      undone: undoneResults.list,
      done: await TaskService.listDone(qTitle),
    })
  } catch (e) {
    console.log(`[error][list] e: ${e}`)
    res.status(400)
    res.send({
      success: false,
    })
  }
}

const deleteAll = async (req: Request, res: Response) => {
  try {
    await TaskService.deleteAll()
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][deleteAll] e: ${e}`)
    res.status(500)
    res.send({
      success: false,
    })
  }
}

const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    await TaskService.deleteById(id)
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][deleteById] e: ${e}`)
    res.status(500)
    res.send({
      success: false,
    })
  }
}

export default {
  add,
  patch,
  list,
  deleteAll,
  deleteById,
}
