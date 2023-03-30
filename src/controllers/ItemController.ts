import { Request, Response } from 'express'
import IAddItemRequest from '../models/requests/AddItemRequest'
import IPatchItemRequest from '../models/requests/UpdateItemDoneRequest'
import ItemService from '../services/ItemService'

const add = async (req: Request, res: Response) => {
  try {
    const body = req.body as IAddItemRequest
    await ItemService.add(body.title)

    res.status(201)
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][addItem] e: ${e}`)
    res.status(400)
    res.send({
      success: false,
    })
  }
}

const patch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const body = req.body as IPatchItemRequest
    if (body.isDone !== undefined) {
      await ItemService.updateDone(id, body.isDone)
    } else if (body.title !== undefined) {
      await ItemService.updateTitle(id, body.title)
    }

    res.status(202)
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][addItem] e: ${e}`)
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

    res.send({
      undone: await ItemService.listUndone(skip, qTitle),
      done: await ItemService.listDone(qTitle),
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
    await ItemService.deleteAll()
    res.send({
      success: true,
    })
  } catch (e) {
    console.log(`[error][delete] e: ${e}`)
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
}
