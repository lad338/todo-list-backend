import express, { Express } from 'express'
import ItemController from '../controllers/ItemController'
import bodyParser from 'body-parser'

const router = express.Router()

router.post('/', bodyParser.json(), ItemController.add)
router.patch('/:id', bodyParser.json(), ItemController.patch)
router.get('/', ItemController.list)
router.delete('/', ItemController.deleteAll)
router.delete('/:id', ItemController.deleteById)

const register = (app: Express) => {
  app.use('/items', router)
}

export default { register }
