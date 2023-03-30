import express, { Express } from 'express'
import HealthCheckController from '../controllers/HealthCheckController'

const router = express.Router()

router.get('/', HealthCheckController.healthCheck)

const register = (app: Express) => {
  app.use('/health', router)
}

export default { register }
