import mongoose from 'mongoose'

const globalForMongoose = globalThis
const cached = globalForMongoose.mongoose || { conn: null, promise: null }

globalForMongoose.mongoose = cached

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  const mongodbUri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB || 'MongoDB1'

  if (!mongodbUri) throw new Error('MONGODB_URI is missing')

  cached.promise = cached.promise || mongoose.connect(mongodbUri, {
    dbName,
    bufferCommands: false
  })

  cached.conn = await cached.promise

  return cached.conn
}

export default connectToDatabase
