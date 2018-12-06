import * as React from 'react'
import { Icon } from '../icon';
import styles from './calendar.scss'
import cnb from 'classnames/bind'

const cx = cnb.bind(styles)

const iconProps = {
  className: cx('header-icon')
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
    <div className={cx('header')}>
      <Icon {...iconProps} name="left-double" onClick={() => onChange(year - 1, month)}/>
      <Icon {...iconProps} name="left" onClick={() => onChange(year, month - 1)}/>
      <span className={cx("header-date")}>{props.year} 年 {props.month + 1} 月</span>
      <Icon {...iconProps} name="right" onClick={() => onChange(year, month + 1)}/>
      <Icon {...iconProps} name="right-double" onClick={() => onChange(year + 1, month)}/>
    </div>
  )
}
