export const getDate = (date: string) => {
  let month = ''
  switch (date.split('-')[1]) {
    case '01':
      month = 'Enero'
      break
    case '02':
      month = 'Febrero'
      break
    case '03':
      month = 'Marzo'
      break
    case '04':
      month = 'Abril'
      break
    case '05':
      month = 'Mayo'
      break
    case '06':
      month = 'Junio'
      break
    case '07':
      month = 'Julio'
      break
    case '08':
      month = 'Agosto'
      break
    case '09':
      month = 'Septiembre'
      break
    case '10':
      month = 'Octubre'
      break
    case '11':
      month = 'Noviembre'
      break
    case '12':
      month = 'Diciembre'
      break
    default:
      break
  }
  const year = date.split('-')[0]
  const fullDate = `${month}, ${year}`
  return fullDate
}
