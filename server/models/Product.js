import mongoose from 'mongoose'
import { getCurrency } from '../utils/currency.js'

const Schema = mongoose.Schema

const ProductSchema = new Schema(
	{
		price: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		expense: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Transaction',
			},
		],
	},
	{
		timestamps: true,
		toJSON: { getters: true },
	}
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
