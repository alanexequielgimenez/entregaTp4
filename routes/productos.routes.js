import { Router } from 'express'
import { createProd, listProducts } from '../db/actions/products.actions.js'

const router = Router()

router.get('/', async (req, res) => {
	try {
		const products = await listProducts()
		res.json(products)
	} catch (error) {
		res.status(500).json({ message: 'No se pudieron obtener productos' })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, desc, price, stock } = req.body

		if (!name || !desc || price === undefined) {
			return res.status(400).json({ message: 'name, desc y price son obligatorios' })
		}

		const product = await createProd({
			name,
			desc,
			price: Number(price),
			stock: Number(stock || 0)
		})

		return res.status(201).json(product)
	} catch (error) {
		return res.status(500).json({ message: 'No se pudo crear el producto' })
	}
})

export default router
