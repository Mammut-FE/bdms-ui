import * as React from "react";
import { getCalendarRange } from "../../lib/datetime";
import CalendarDate from "./CalendarDate";
import styles from './calendar.scss'
import cnb from 'classnames/bind'
const cx = cnb.bind(styles)

const weekNameMap: Map<number, string> = new Map([
  [0, '日'],
  [1, '一'],
  [2, '二'],
  [3, '三'],
  [4, '四'],
  [5, '五'],
  [6, '六'],
])

export interface CalendarBodyProps {
  year: number
  month: number
  /**
   * 在范围的头部还是尾部高亮，默认是两头高亮
   */
  rangeHighlight?: 'start' | 'end' | 'none' | 'both'
  /**
   * 选择范围的起点
   */
  rangeStart?: number
  /**
   * 选择范围的终点
   */
  rangeEnd?: number
  onDateClick?: (year: number, month: number, date: number) => void
}

export default class CalendarBody extends React.PureComponent<CalendarBodyProps> {
  public renderDayNodes() {
    const year = this.props.year
    const month = this.props.month
    const { firstDay, firstDate, lastDate, lastDay, prevLastDate } = getCalendarRange(year, month)
    const { rangeHighlight = 'both' } = this.props
    const nowDate = new Date()
    const today = nowDate.getFullYear() === year && nowDate.getMonth() === month ? nowDate.getDate() : -1
    let { rangeStart, rangeEnd } = this.props

    if (typeof rangeStart !== 'number' && typeof rangeEnd !== 'number') {
      // 如果都没有设置，那么认为不进行范围高亮
      rangeStart = rangeEnd = -1
    } else {
      // 默认选择头尾
      rangeStart = rangeStart || firstDate
      rangeEnd = rangeEnd || lastDate
    }

    const dayNodes: React.ReactNodeArray = []
    const hlStart = rangeHighlight === 'start' || rangeHighlight === 'both'
    const hlEnd = rangeHighlight === 'end' || rangeHighlight === 'both'

    const onClick = (year, month, day) => {
      if (this.props.onDateClick) {
        if (month === this.props.month && year === this.props.year) {
          this.props.onDateClick(year, month, day)
        } else {
          const date = new Date(year, month, day)
          this.props.onDateClick(date.getFullYear(), date.getMonth(), date.getDate())
        }
      }
    }

    // 前一个月
    dayNodes.push(
      <span key="prev-month" className={cx('other-month-ranger')}>
        {Array.from(Array(firstDay).keys()).reverse().map(i => (
          <CalendarDate
            key={`prev-${i}`}
            onClick={() => onClick(year, month - 1, prevLastDate - i)}
          >
            {prevLastDate - i}
          </CalendarDate>
        ))}
      </span>
    )

    // 当前月
    for (let i = firstDate; i <= lastDate; i++) {
      const inRange = i >= rangeStart && i <= rangeEnd
      if (inRange) {
        const nodes: React.ReactNodeArray = []
        for (let j = rangeStart; j <= rangeEnd; j++) {
          nodes.push(
            <CalendarDate
              key={`now-${j}`}
              onClick={() => onClick(year, month, j)}
              isToday={j === today}
            >{j}</CalendarDate>
          )
        }
        dayNodes.push(
          <span key="now-range" className={cx('date-cube-ranger', {
            'date-cube-ranger--active-start': hlStart,
            'date-cube-ranger--active-end': hlEnd,
          })}>{nodes}</span>
        )
        i = rangeEnd
      } else {
        dayNodes.push(
          <CalendarDate
            key={`now-${i}`}
            onClick={() => onClick(year, month, i)}
            isToday={i === today}
          >{i}</CalendarDate>
        )
      }
    }

    const endWeek = lastDate - 28 + firstDay > 7 ? 7 : 7 * 2

    // 下一个月
    dayNodes.push(
      <span className={cx('other-month-ranger')}>
        {Array.from(Array(endWeek).keys()).slice(lastDay + 1).map(i => (
          <CalendarDate
            key={`next-${i}`}
            onClick={() => onClick(year, month + 1, i - lastDay)}
          >{i - lastDay}</CalendarDate>
        ))}
      </span>
    )

    return dayNodes
  }

  public renderDayHeader() {
    return (
      <div className={cx("days-header")}>
        {Array.from(weekNameMap.values()).map(text => (
          <span key={text} className={cx('cube')}>{text}</span>
        ))}
      </div>
    )
  }

  public render() {
    return (
      <div className={cx("body")}>
        {this.renderDayHeader()}
        <div className={cx('days-body')}>
          {this.renderDayNodes()}
        </div>
      </div>
    )
  }
}
