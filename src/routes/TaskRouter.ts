import express, { Express } from 'express'
import TaskController from '../controllers/TaskController'
import bodyParser from 'body-parser'

const router = express.Router()

router.post('/', bodyParser.json(), TaskController.add)
router.patch('/:id', bodyParser.json(), TaskController.patch)
router.get('/', TaskController.list)
router.delete('/', TaskController.deleteAll)
router.delete('/:id', TaskController.deleteById)

const register = (app: Express) => {
  app.use('/tasks', router)
}

export default { register }
