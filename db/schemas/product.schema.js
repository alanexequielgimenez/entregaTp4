import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const productSchema = new Schema(
    {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
        stock: { type: Number, default: 0, min: 0 }
    },
    { timestamps: true }
)

const Product = models.Product || model('Product', productSchema)

export default Product