import express, { Express } from 'express'
import HealthCheckRouter from './routes/HealthCheckRouter'
import { mongooseConnect } from './configs/Database'
import ItemRouter from './routes/ItemRouter'

const app: Express = express()
const port = 8000
HealthCheckRouter.register(app)
ItemRouter.register(app)

mongooseConnect()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
