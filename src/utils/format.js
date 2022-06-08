const formatCurrency = (currency) => {
  const formatted = currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatted
}

const formataData = (data) => {
  let dataFormatada = ''
  for (let i = data.length - 1; i >= 0; i--) {
    dataFormatada += data[i]
  }

  return dataFormatada
}

export { formatCurrency, formataData }
