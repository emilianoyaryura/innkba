export const getDate = (date: string) => {
  let month = ''
  switch (date.split('-')[1]) {
    case '01':
      month = 'En'
      break
    case '02':
      month = 'Febr'
      break
    case '03':
      month = 'Mzo'
      break
    case '04':
      month = 'Abr'
      break
    case '05':
      month = 'My'
      break
    case '06':
      month = 'Jun'
      break
    case '07':
      month = 'Jul'
      break
    case '08':
      month = 'Ag'
      break
    case '09':
      month = 'Sept'
      break
    case '10':
      month = 'Oct'
      break
    case '11':
      month = 'Nov'
      break
    case '12':
      month = 'Dic'
      break
    default:
      break
  }
  const year = date.split('-')[0]
  const fullDate = `${month} ${year}`
  return fullDate
}
