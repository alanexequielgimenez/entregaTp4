import 'dotenv/config'
import express from 'express'
import connectToDatabase from './db/connection.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/productos.routes.js'
import salesRoutes from './routes/ventas.routes.js'

const app = express()
app.use(express.json())

const port = Number(process.env.PORT) || 3002

app.use('/auth', authRoutes)

app.use('/products', productRoutes)
app.use('/sales', salesRoutes)

const startServer = async () => {
	try {
		await connectToDatabase()
		app.listen(port, () => {
			console.log('Servidor levantado en puerto ' + port)
		})
	} catch (error) {
		console.error('Error al iniciar el servidor:', error.message)
		process.exit(1)
	}
}

startServer()
