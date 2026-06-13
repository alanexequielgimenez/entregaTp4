import { Router } from 'express'
import { Types } from 'mongoose'
import {
	createProd,
	deleteProduct,
	getProductById,
	listProducts,
	updateProduct
} from '../db/actions/products.actions.js'

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

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'id invalido' })
		}

		const product = await getProductById(id)
		if (!product) {
			return res.status(404).json({ message: 'Producto no encontrado' })
		}

		return res.json(product)
	} catch (error) {
		return res.status(500).json({ message: 'No se pudo obtener el producto' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'id invalido' })
		}

		const payload = {}
		const allowed = ['name', 'desc', 'price', 'stock']
		for (const key of allowed) {
			if (req.body[key] !== undefined) {
				payload[key] = key === 'price' || key === 'stock' ? Number(req.body[key]) : req.body[key]
			}
		}

		if (Object.keys(payload).length === 0) {
			return res.status(400).json({ message: 'No hay campos para actualizar' })
		}

		const updated = await updateProduct(id, payload)
		if (!updated) {
			return res.status(404).json({ message: 'Producto no encontrado' })
		}

		return res.json(updated)
	} catch (error) {
		return res.status(500).json({ message: 'No se pudo actualizar el producto' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: 'id invalido' })
		}

		const deleted = await deleteProduct(id)
		if (!deleted) {
			return res.status(404).json({ message: 'Producto no encontrado' })
		}

		return res.json({ message: 'Producto eliminado correctamente' })
	} catch (error) {
		return res.status(500).json({ message: 'No se pudo eliminar el producto' })
	}
})

export default router
