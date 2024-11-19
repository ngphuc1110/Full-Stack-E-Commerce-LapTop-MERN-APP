const currencyFormat = (num) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 1

    })
    return formatter.format(num)
}

export default currencyFormat
