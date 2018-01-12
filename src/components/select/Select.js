import React, { Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './select.css'
import '../../style/index.css'

export default class Select extends Component {
    render() {
        const { className, style } = this.props
        const searchClass = classNames('u-search', className)
        return (
            <div className={searchClass} style={style}>ddd</div>
        )
    }
}