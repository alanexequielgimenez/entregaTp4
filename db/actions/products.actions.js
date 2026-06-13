import connectToDatabase from '../connection.js'
import Product from '../schemas/product.schema.js'

export const createProd = async ({ name, desc, price, stock }) => {
    await connectToDatabase()
    const res = await Product.create({ name, desc, price, stock })
    return res.toObject()
}

export const listProducts = async () => {
    await connectToDatabase()
    return Product.find().sort({ createdAt: -1 }).lean()
}

export default createProd