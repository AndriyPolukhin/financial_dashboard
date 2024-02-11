import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

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
			'Pinged your deployment. You successfully connected to MongoDB!'
		)
		console.log(`MongoDB Connected ${conn.connection.host}`)
		/** Add data one time only or as needed */
		// await mongoose.connection.db.dropDatabase()
		// KPI.insertMany(kpis)
		// Porduct.insertMany(products)
		// Transaction.insertMany(transactions)
	} catch (error) {
		console.log(`Error: ${error.message}`)
		process.exit(1)
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoose.disconnect()
	}
}

await connectDB().catch(console.dir)

app.listen(() => console.log(`Server port: ${PORT || 9000}`))