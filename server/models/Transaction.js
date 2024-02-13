import mongoose from 'mongoose'
import { getCurrency } from '../utils/currency.js'

const Schema = mongoose.Schema

const TransactionSchema = new Schema(
	{
		buyer: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		productIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{
		timestamps: true,
		toJSON: { getters: true },
	}
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction
