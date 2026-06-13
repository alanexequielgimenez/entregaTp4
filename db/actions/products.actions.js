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

export const getProductById = async (id) => {
    await connectToDatabase()
    return Product.findById(id).lean()
}

export const updateProduct = async (id, payload) => {
    await connectToDatabase()
    return Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).lean()
}

export const deleteProduct = async (id) => {
    await connectToDatabase()
    return Product.findByIdAndDelete(id).lean()
}

export default createProd