import mongoose from 'mongoose'
import { getCurrency } from '../utils/currency.js'

const Schema = mongoose.Schema

const daySchema = new Schema(
	{
		date: String,
		revenue: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		expenses: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
	},
	{ toJSON: { getters: true } }
)
const monthSchema = new Schema(
	{
		month: String,
		revenue: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		expenses: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		operationalExpenses: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		nonOperationalExpenses: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
	},
	{ toJSON: { getters: true } }
)
const KPISchema = new Schema(
	{
		totalProfit: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		totalRevenue: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		totalExpenses: {
			type: String,
			currency: 'USD',
			get: (v) => getCurrency(v),
		},
		expensesByCategory: {
			type: Map,
			of: {
				type: String,
				currency: 'USD',
				get: (v) => getCurrency(v),
			},
		},
		monthlyData: [monthSchema],
		dailyData: [daySchema],
	},
	{ timestamps: true, toJSON: { getters: true } }
)

const KPI = mongoose.model('KPI', KPISchema)

export default KPI
