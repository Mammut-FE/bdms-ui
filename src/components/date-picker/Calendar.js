import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './calendar.css'
import '../../style/index.css'
import Icon from '../icon'

export default class Calendar extends Component {
    render() {
        const { className } = this.props
        const calendarClass = classNames('u-calendar', className)
        return (
            <div className={calendarClass}>
                <div className="calendar-header">
                    <Icon name='left-double f-fl'></Icon>
                    <Icon name='left f-fl'></Icon>
                    <Icon name='right-double f-fr'></Icon>
                    <Icon name='right f-fr'></Icon>
                    <span>2018年2月</span>
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
                             <li>1</li>
                             <li>2</li>
                             <li>3</li>
                             <li>4</li>
                             <li>5</li>
                             <li>5</li>
                             <li>6</li>
                             <li>6</li>
                             <li>d</li>
                             <li>6</li>
                             <li>6</li>
                             <li>6</li>
                             <li>6</li>
                             <li>6</li>
                             <li>62</li>
                             <li>23</li>
                             <li>23</li>
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
