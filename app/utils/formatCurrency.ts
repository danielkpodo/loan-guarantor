function formatCurrency(
  amount: number,
  currencyCode = 'GHS',
  locale = 'en-GH'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export default formatCurrency;
