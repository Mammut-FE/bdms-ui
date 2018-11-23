export function getCalendarRange(year: number, month: number) {
  const first = new Date(year, month)
  const last = new Date(year, month + 1, 0)
  const prev = new Date(year, month, 0)

  return {
    firstDay: first.getDay(),
    lastDay: last.getDay(),
    firstDate: 1,
    lastDate: last.getDate(),
    prevLastDate: prev.getDate(),
  }
}
