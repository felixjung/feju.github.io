export default d => {
  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const date = new Date(d)
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  const day = date.getDate()
  return `${month} ${day}, ${year}`
}
