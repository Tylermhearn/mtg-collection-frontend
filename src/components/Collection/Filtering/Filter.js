const colors = ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless']
const cardTypes = ['Artifact', 'Instant', 'Creature', 'Sorcery', 'Enchantment', 'Land', 'Planeswalker']

export const cardType = (cards, filter) => {
  if (cards === undefined || cards.length === 0) return ''

  let arr = []

  for (let color of colors) {
    if (!filter.includes(color)) {
      if (color === 'Blue') {
        cards = cards.filter(card => !card.color_identity.includes('U'))
      } else {
        cards = cards.filter(card => !card.color_identity.includes(color.substr(0, 1)))
      }
    }
  }

  if (filter.includes('foil')) {
    cards = cards.filter(card => card.extras.includes('foil'))
  }
  if (!filter.includes('Colorless')) {
    cards = cards.filter(card => card.color_identity.includes('W') || card.color_identity.includes('U') || card.color_identity.includes('B') || card.color_identity.includes('R') || card.color_identity.includes('G'))
  }

  for (let card of cards) {
    for (let type of cardTypes) {
      if (card.type_line.includes(type) && filter.includes(type))
        arr.push(card)
    }
  }

  return [...new Set(arr)] //remove duplicates
}