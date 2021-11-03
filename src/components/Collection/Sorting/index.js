export const cardSort = (a, b) => {
  if (a.extras === '' && b.extras === '') {
    return (b.prices.usd - a.prices.usd)
  }
  else if (a.extras === 'foil' && b.extras === '') {
    return (b.prices.usd - a.prices.usd_foil)
  }
  else if (a.extras === '' && b.extras === 'foil') {
    return (b.prices.usd_foil - a.prices.usd)
  }
  else {
    return (b.prices.usd_foil - a.prices.usd_foil)
  }
}