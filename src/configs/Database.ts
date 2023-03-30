import mongoose from 'mongoose'

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'todo_list'

export const mongooseConnect = () => {
  mongoose
    .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`)
    .then(() => {
      console.log(
        `⚡️[mongo]: successfully connected to mongo at ${MONGO_HOST}:${MONGO_PORT}`
      )
    })
    .catch((e) => console.log(e))
}
