import * as React from 'react'
import cx from 'classnames'
import './calendar.scss'

export default function CalendarDate(props: {
  disabled?: boolean, // 只是在显示上是否禁用
  children: React.ReactNode,
  onClick?: () => void // 即使是 disabled 了也可以触发
}) {
  return (
    <span className={cx('ma-calendar-cube', 'ma-calendar-date', {
      'ma-calendar-date_disabled': props.disabled,
    })} onClick={props.onClick}>{props.children}</span>
  )
}
