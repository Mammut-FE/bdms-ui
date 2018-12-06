/**
 * 获取某个月日历的范围
 * @param year
 * @param month
 */
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

export function dateInMonth(date: Date, month: Date) {
  return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth()
}
