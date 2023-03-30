import express, { Express } from 'express'
import HealthCheckController, {
  healthCheck,
} from '../controllers/HealthCheckController'

const router = express.Router()

router.get('/', HealthCheckController.healthCheck)

export default router
