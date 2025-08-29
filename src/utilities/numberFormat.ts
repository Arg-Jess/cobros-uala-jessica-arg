export const formattedWithSmallerDecimals = (amount: number) => {
  const formatted = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  const [integer, decimal] = formatted.split(',')
  return { integer, decimal }
}

export const formattedWithDecimals = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
