import { Request, Response } from 'express'

const healthCheck = (req: Request, res: Response) => {
  res.send({
    status: 'up',
  })
}

const controller = {
  healthCheck,
}

export default controller
