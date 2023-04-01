import express, { Express } from 'express'
import HealthCheckRouter from './routes/HealthCheckRouter'
import { mongooseConnect } from './configs/Database'
import ItemRouter from './routes/ItemRouter'
import cors from 'cors'

const app: Express = express()
const port = 8000
app.use(cors())
HealthCheckRouter.register(app)
ItemRouter.register(app)

mongooseConnect()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
