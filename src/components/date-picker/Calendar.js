import React, { Component} from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './calendar.css'
import '../../style/index.css'
import Icon from '../icon'

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        const now = new Date()
        const initYears = now.getFullYear()
        const initMonth = now.getMonth()
        const initDays = this.getDaysOfMonth(initYears, initMonth)
        const initLastMonthDays = this.getDaysOfMonth(initYears, initMonth - 1)
        const initWeekOfFirstDay = this.getWeekOfDay(initYears, initMonth, 1)
        const initWeekOfLastDay = this.getWeekOfDay(initYears, initMonth, initDays)
        const initSelectedDay = now.getDate()
        this.state = {
            days: initDays,
            year: initYears,
            month: initMonth,
            lastMonthDays: initLastMonthDays,
            weekOfFirstDay: initWeekOfFirstDay,
            weekOfLastDay: initWeekOfLastDay,
            selectedDay: initSelectedDay
        }
    }
    getDaysOfMonth(year, month) {
        const _month = parseInt(month, 10) + 1
        return new Date(year, _month, 0).getDate()
    }
    getWeekOfDay (year, month, day) {
        const d = new Date(year, month, day);
        return d.getDay()
    }
    select(day) {
        this.setState({
            selectedDay: day.day
        })
    }

    getPrevYear() {
        const { year, month } = this.state
        this.updateCalendar(year - 1, month)
    }
    getNextYear() {
        const { year, month } = this.state
        this.updateCalendar(year + 1, month)
    }
    getPrevMonth() {
        const { year, month } = this.state
        if (month === 0 ) {
            this.updateCalendar(year - 1, 11)
        } else {
            this.updateCalendar(year, month - 1)
        }
    }
    getNextMonth() {
        const { year, month } = this.state
        if (month === 11) {
            this.updateCalendar(year + 1, 0)
        } else {
            this.updateCalendar(year, month + 1)
        }
    }
    updateCalendar(year, month) {
        const updatedDays = this.getDaysOfMonth(year, month)
        const updatedLastMonthDays = this.getDaysOfMonth(year, month - 1)
        const updatedWeekOfFirstDay = this.getWeekOfDay(year, month, 1)
        const updatedWeekOfLastDay = this.getWeekOfDay(year, month, updatedDays)
        const updatedSelectedDay = 1
        this.setState({
            days: updatedDays,
            year: year,
            month: month,
            lastMonthDays: updatedLastMonthDays,
            weekOfFirstDay: updatedWeekOfFirstDay,
            weekOfLastDay: updatedWeekOfLastDay,
            selectedDay: updatedSelectedDay
        })
    }

    render() {
        const { className } = this.props
        const { year, month, days, weekOfFirstDay, weekOfLastDay, selectedDay, lastMonthDays } = this.state
        const calendarClass = classNames('u-calendar', className)
        let daysArray = []
        for (let i = 0; i < weekOfFirstDay; i++) {
            daysArray.push({day: lastMonthDays - i, disabled: true});
           
        }
        daysArray.reverse()

        for (let i = weekOfFirstDay; i < days + weekOfFirstDay; i ++ ) {
            daysArray.push({day: i - weekOfFirstDay + 1, disabled: false});
        }

        for (let i = 0; i < 7 - weekOfLastDay - 1; i++) {
            daysArray.push({day: i + 1, disabled: true});
        }

        return (
            <div className={calendarClass}>
                <div className="calendar-header">
                    <Icon name='left-double f-fl' onClick={this.getPrevYear.bind(this)}></Icon>
                    <Icon name='left f-fl' onClick={this.getPrevMonth.bind(this)}></Icon>
                    <Icon name='right-double f-fr' onClick={this.getNextYear.bind(this)}></Icon>
                    <Icon name='right f-fr' onClick={this.getNextMonth.bind(this)}></Icon>
                    <span>{year}年 {month + 1}月</span>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week">
                        <ul className="f-cb">
                            <li>日</li>
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li>六</li>
                        </ul>
                    </div>
                    <div className="calendar-days">
                         <ul className="f-cb">
                            {
                                daysArray.map( (day, index) => {
                                    return <li 
                                        key={'now' + index} 
                                        className={classNames({'disabled': day.disabled, 'selected': (selectedDay === day.day) && !day.disabled})}
                                        onClick={this.select.bind(this,day)}>{day.day}
                                    </li>
                                })
                            }
                         </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Calendar.propTypes = {
    className: PropTypes.string
}
