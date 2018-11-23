import * as React from 'react'
import { Icon } from '../icon';
import './calendar.scss'

const iconProps = {
  className: 'ma-calendar-header__icon'
}

export default function CalendarHeader(props: {
  year: number,
  month: number,
  onChange?: (year: number, month: number) => void
}) {
  const { year, month } = props
  const onChange = (year, month) => {
    if (props.onChange) {
      const date = new Date(year, month)
      props.onChange(date.getFullYear(), date.getMonth())
    }
  }

  return (
    <div className="ma-calendar-header">
      <Icon {...iconProps} name="left-double" onClick={() => onChange(year - 1, month)}/>
      <Icon {...iconProps} name="left" onClick={() => onChange(year, month - 1)}/>
      <span className="ma-calendar-header__date">{props.year} 年 {props.month + 1} 月</span>
      <Icon {...iconProps} name="right" onClick={() => onChange(year, month + 1)}/>
      <Icon {...iconProps} name="double-right" onClick={() => onChange(year + 1, month)}/>
    </div>
  )
}
