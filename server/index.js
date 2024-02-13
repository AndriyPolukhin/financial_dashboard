import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import kpiRoutes from './routes/kpi.js'
import productRoutes from './routes/product.js'
import transactionRoutes from './routes/transaction.js'

/* TENP:  Seeding the database */
// import KPI from './models/KPI.js'
// import Product from './models/Product.js'
// import Transaction from './models/Transaction.js'
// import { kpis, products, transactions } from './data/data.js'

/** CONFIGURATION */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/** ROUTES */
app.use('/kpi', kpiRoutes)
app.use('/products', productRoutes)
app.use('/transactions', transactionRoutes)

/** MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
const clientOptions = {
	serverApi: { version: '1', strict: true, deprecationErrors: true },
}

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, clientOptions)

		await mongoose.connection.db.admin().command({ ping: 1 })
		console.log(
			`Pinged your deployment. You successfully connected to MongoDB!\nURI: ${conn.connection.host}\nDB: ${conn.connection.name}`
		)
		/** Add data one time only or as needed */
		// await mongoose.connection.db.dropDatabase()
		// await KPI.insertMany(kpis)
		// await Product.insertMany(products)
		// await Transaction.insertMany(transactions)
	} catch (error) {
		console.log(`Error: ${error.message}`)
		process.exit(1)
	}
}

await connectDB()

app.listen(PORT, () => console.log(`Server port: ${PORT || 9000}`))
