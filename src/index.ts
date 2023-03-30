import express, { Express, Request, Response } from 'express'
import HealthCheckRouter from './routes/HealthCheckRouter'

const app: Express = express()
const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/health', HealthCheckRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
