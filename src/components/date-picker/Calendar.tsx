/**
 * 内部使用的日历组件，包含日历展示主要内容和年份和月份选择，对外主要暴露一些方便的接口
 */

import * as React from "react";
import CalendarBody, { CalendarBodyProps } from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import './calendar.scss'

export interface CalendarProps extends Pick<CalendarBodyProps, 'rangeStart' | 'rangeEnd' | 'rangeHighlight' | 'min' | 'max'> {
  year?: number
  month?: number
  onDateChange?: (year: number, month: number, date?: number) => void
}

export default function Calendar(props: CalendarProps) {
  let { year = NaN, month = NaN } = props
  // 只要是 undefined ，那么就会是 NaN，后面就可以通过 isInteger 来判断
  // 而且可以让 year 类型从 number? 变成 number
  const now = new Date()
  year = Number.isInteger(year) ? year : now.getFullYear()
  month = Number.isInteger(month) ? month : now.getMonth()

  return (
    <div>
      <CalendarHeader
        year={year}
        month={month}
        onChange={props.onDateChange}
      />
      <CalendarBody
        year={year}
        month={month}
        onDateClick={props.onDateChange}
        rangeStart={props.rangeStart}
        rangeEnd={props.rangeEnd}
        rangeHighlight={props.rangeHighlight}
        min={props.min}
        max={props.max}
      />
    </div>
  )
}
