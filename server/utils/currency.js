export const getCurrency = (val) => {
	if (typeof val === 'string') {
		let currencyAsString = val.toString()
		let findDigitsAndDotRegex = /\d*\.\d{1,2}/
		let findCommasAndLettersRegex = /\,+|[a-zA-Z]+/g
		let findNegativeRegex = /^-/
		let currency
		currencyAsString = currencyAsString.replace(findCommasAndLettersRegex, '')
		currency = findDigitsAndDotRegex.exec(currencyAsString + '.0')[0]
		if (findNegativeRegex.test(currencyAsString)) {
			return ((currency * -100).toFixed(0) * 1) / 100
		} else {
			return ((currency * 100).toFixed(0) * 1) / 100
		}
	} else if (typeof val === 'number') {
		return (val.toFixed(0) * 1) / 100
	} else {
		return new Error('Should pass in a number or string')
	}
}
