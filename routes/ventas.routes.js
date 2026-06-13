import { Router } from 'express'
import { Types } from 'mongoose'
import connectToDatabase from '../db/connection.js'
import Product from '../db/schemas/product.schema.js'
import Sale from '../db/schemas/sale.schema.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/purchase', authMiddleware, async (req, res) => {
	try {
		const { productId, quantity } = req.body
		const normalizedQuantity = Number(quantity || 1)

		if (!productId || !Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ message: 'productId invalido' })
		}

		if (Number.isNaN(normalizedQuantity) || normalizedQuantity <= 0) {
			return res.status(400).json({ message: 'quantity debe ser mayor a 0' })
		}

		await connectToDatabase()

		const product = await Product.findOneAndUpdate(
			{ _id: productId, stock: { $gte: normalizedQuantity } },
			{ $inc: { stock: -normalizedQuantity } },
			{ new: true }
		)

		if (!product) {
			return res.status(400).json({ message: 'Producto no disponible o sin stock suficiente' })
		}

		const sale = await Sale.create({
			user: req.user.sub,
			product: product._id,
			quantity: normalizedQuantity,
			totalPrice: product.price * normalizedQuantity
		})

		return res.status(201).json({
			message: 'Compra realizada correctamente',
			sale
		})
	} catch (error) {
		return res.status(500).json({ message: 'No se pudo procesar la compra' })
	}
})

router.get('/my-purchases', authMiddleware, async (req, res) => {
	try {
		await connectToDatabase()
		const sales = await Sale.find({ user: req.user.sub })
			.populate('product', 'name price')
			.sort({ createdAt: -1 })
			.lean()

		return res.json(sales)
	} catch (error) {
		return res.status(500).json({ message: 'No se pudieron obtener las compras' })
	}
})

export default router
