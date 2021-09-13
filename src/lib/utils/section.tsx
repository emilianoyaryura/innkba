import { Category } from 'ts/models'

export const getSectionSlug = (category: Category) => {
  let sectionSlug = ''
  switch (category) {
    case 'Diario de Viaje':
      sectionSlug = 'diario-de-viaje'
      break
    case 'Lifestyle':
      sectionSlug = 'lifestyle'
      break
    case 'Arte':
      sectionSlug = 'arte'
      break
    case 'Cultura':
      sectionSlug = 'cultura'
      break
    case 'Literatura':
      sectionSlug = 'literatura'
      break
    case 'Viajes':
      sectionSlug = 'viajes'
      break
    default:
      break
  }
  return sectionSlug
}
