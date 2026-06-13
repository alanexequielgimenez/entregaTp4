import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const saleSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
)

const Sale = models.Sale || model('Sale', saleSchema)

export default Sale
