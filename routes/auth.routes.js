import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectToDatabase from '../db/connection.js'
import User from '../db/schemas/user.schema.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email y password son obligatorios' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La password debe tener al menos 6 caracteres' })
    }

    await connectToDatabase()

    const existingUser = await User.findOne({ email: email.toLowerCase() }).lean()
    if (existingUser) {
      return res.status(409).json({ message: 'El email ya esta registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    })

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'No se pudo registrar el usuario' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'email y password son obligatorios' })
    }

    await connectToDatabase()

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales invalidas' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales invalidas' })
    }

    const jwtSecret = process.env.JWT_SECRET
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h'

    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT_SECRET no configurado' })
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        name: user.name,
        email: user.email
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    )

    return res.json({
      message: 'Login exitoso',
      token
    })
  } catch (error) {
    return res.status(500).json({ message: 'No se pudo iniciar sesion' })
  }
})

export default router
