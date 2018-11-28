import './date-time.scss'

import * as React from "react"
import { bemClassnames } from '../../lib/classnames';
import { Independence } from '../../lib/independence';
import Calendar from "./Calendar"
import { CalendarBodyProps } from './CalendarBody';
import TimePicker, { TimePickerProps } from './TimePicker';
import { Button } from "../button"

const bem = bemClassnames('ma-date-time')

/**
 * 基础组件共用数据
 */
export interface DateTimeMixins {
  /**
   * 是否显示今天按钮
   */
  showToday?: boolean
  /**
   * 设定今天按钮的文字，默认 "此刻"
   */
  todayText?: string
  /**
   * 是否显示时间选择
   */
  showTime?: boolean | TimePickerProps
}

export interface DateTimeProps extends Pick<CalendarBodyProps, 'rangeStart' | 'rangeEnd' | 'rangeHighlight'>, DateTimeMixins {
  value?: Date
  onChange?: (date: Date) => void
  defaultValue?: Date
}

@Independence({
  value: {
    onChangeName: 'onChange',
    defaultValue: new Date()
  }
})
export default class DateTime extends React.Component<DateTimeProps> {
  public fireChange = (time: Date) => {
    if (this.props.onChange) {
      this.props.onChange(time)
    }
  }

  public onTimeChange = (date: Date = new Date()) => {
    const {value = new Date()} = this.props
    const newDate = new Date()
    newDate.setFullYear(value.getFullYear())
    newDate.setMonth(value.getMonth())
    newDate.setDate(value.getDate())
    newDate.setHours(date.getHours())
    newDate.setMinutes(date.getMinutes())
    newDate.setSeconds(date.getSeconds())
    this.fireChange(newDate)
  }

  public onDateChange = (year: number, month: number, day?: number) => {
    const {value = new Date()} = this.props
    const newDate = new Date()
    newDate.setFullYear(year)
    newDate.setMonth(month)
    newDate.setDate(day || value.getDate())
    newDate.setHours(value.getHours())
    newDate.setMinutes(value.getMinutes())
    newDate.setSeconds(value.getSeconds())
    this.fireChange(newDate)
  }

  public gotoToday = () => {
    this.fireChange(new Date())
  }

  public render() {
    const { value = new Date(), rangeStart, rangeEnd, rangeHighlight, showTime, showToday, todayText } = this.props
    return (
      <div className={bem()}>
        <Calendar
          rangeHighlight={rangeHighlight}
          year={value.getFullYear()}
          month={value.getMonth()}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onDateChange={this.onDateChange}
        />
        <div className={bem('time')}>
          {showToday && (
            <Button
              type="text"
              className={bem('current')}
              onClick={this.gotoToday}
            >{todayText || "此刻"}</Button>
          )}
          {showTime && (
            <TimePicker
              className={bem('time-picker')}
              centered={true}
              value={value}
              onChange={this.onTimeChange}
              size="small"
            />
          )}
        </div>
      </div>
    )
  }
}
