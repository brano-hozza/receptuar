import mongoose from 'mongoose'
import { createConsola } from 'consola'

const consola = createConsola({})
const config = useRuntimeConfig()
export default async () => {
  try {
    await mongoose.connect(config.mongoUrl)
    consola.log('DB connection established.')
  } catch (err) {
    consola.error('DB connection failed.', err)
  }
}
