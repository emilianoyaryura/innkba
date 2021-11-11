import { Category } from 'ts/models'

export const getSectionSlug = (category: Category) => {
  let sectionSlug = ''
  switch (category) {
    case 'Arte y Literatura':
      sectionSlug = 'arte-y-literatura'
      break
    case 'Lifestyle':
      sectionSlug = 'lifestyle'
      break
    case 'Cultura':
      sectionSlug = 'cultura'
      break
    case 'Viajes':
      sectionSlug = 'viajes'
      break
    default:
      break
  }
  return sectionSlug
}
