import * as React from "react";
import { getCalendarRange } from "../../lib/datetime";
import CalendarDate from "./CalendarDate";
import cx from 'classnames';
import './calendar.scss'

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

    // 上一个月的列表
    for (let i = firstDay - 1; i >= 0; i--) {
      dayNodes.push(<CalendarDate key={`prev-${i}`} disabled={true} onClick={() => onClick(year, month - 1, prevLastDate - i)}>{prevLastDate - i}</CalendarDate>)
    }

    // 当前月
    for (let i = firstDate; i <= lastDate; i++) {
      const inRange = i >= rangeStart && i <= rangeEnd
      if (inRange) {
        const nodes: React.ReactNodeArray = []
        for (let j = rangeStart; j <= rangeEnd; j++) {
          nodes.push(
            <CalendarDate key={`now-${j}`} onClick={() => onClick(year, month, j)}>{j}</CalendarDate>
          )
        }
        dayNodes.push(
          <span key="now-range" className={cx('ma-calendar-date__ranger', {
            'ma-calendar-date__ranger_active_start': hlStart,
            'ma-calendar-date__ranger_active_end': hlEnd,
          })}>{nodes}</span>
        )
        i = rangeEnd
      } else {
        dayNodes.push(
          <CalendarDate key={`now-${i}`} onClick={() => onClick(year, month, i)}>{i}</CalendarDate>
        )
      }
    }

    const endWeek = lastDate - 28 + firstDay > 7 ? 7 : 7 * 2
    // 下一个月
    for (let i = lastDay + 1; i < endWeek; i++) {
      dayNodes.push(
        <CalendarDate key={`next-${i}`} disabled={true} onClick={() => onClick(year, month + 1, i - lastDay)}>{i - lastDay}</CalendarDate>
      )
    }

    return dayNodes
  }

  public renderCalendarHeader() {
    return (
      <div className="ma-calendar-body__header">
        {Array.from(weekNameMap.values()).map(text => (
          <span key={text} className="ma-calendar-cube ma-calendar-header__day">{text}</span>
        ))}
      </div>
    )
  }

  public render() {
    return (
      <div className="ma-calendar">
        {this.renderCalendarHeader()}
        <div className="ma-calendar-days">
          {this.renderDayNodes()}
        </div>
      </div>
    )
  }
}
