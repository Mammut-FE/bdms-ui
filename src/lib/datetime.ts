/**
 * 获取某个月日历的范围
 * @param year
 * @param month
 */
import { isAfter, isBefore, parse } from 'date-fns';

export function getCalendarRange(year: number, month: number) {
  const first = new Date(year, month);
  const last = new Date(year, month + 1, 0);
  const prev = new Date(year, month, 0);

  return {
    firstDay: first.getDay(),
    lastDay: last.getDay(),
    firstDate: 1,
    lastDate: last.getDate(),
    prevLastDate: prev.getDate()
  };
}

export function dateInMonth(date: Date, month: Date) {
  return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
}

/**
 * 限定区间范围，如果不传入参数，默认不显示，精度到毫秒
 * @param date
 * @param max
 * @param min
 */
export function clampDate(date: Date, max?: Date | number, min?: Date | number): Date {
  if (max && isAfter(date, max)) {
    date = parse(max);
  }

  if (min && isBefore(date, min)) {
    date = parse(min);
  }

  return date;
}

/**
 * 限定区间范围，类似于 clampDate，但是仅仅限制到日
 * @param date
 * @param max
 * @param min
 */
export function clampDateDay(date: Date, max?: Date | number, min?: Date | number): Date {
  const clamped = clampDate(date, max, min);
  date = parse(date);
  date.setFullYear(clamped.getFullYear());
  date.setMonth(clamped.getMonth());
  date.setDate(clamped.getDate());
  return date;
}
