import { Request, Response } from 'express'

export const healthCheck = (req: Request, res: Response) => {
  res.send({
    status: 'up',
  })
}

const controller = {
  healthCheck,
}

export default controller
