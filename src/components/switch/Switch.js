import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './switch.scss'
import '../../style/index.scss'

export default class Switch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.getOpened(props)
        }
    }

    getOpened(props) {
        return Boolean(props.open)
    }
    
    onChange = (e) => {
        const onChange = this.props.onChange;

        const open = this.state.open

        !this.props.disabled && this.setState({ open: !open })

        if (onChange && !this.props.disabled) {
            onChange(!open)
        }
    }

    render() {
        const {className, disabled} = this.props
        const {open} = this.state

        return (
            <span className={`u-switch ${className} ${disabled ? 'disabled' : ''} ${open ? 'open' : ''}`} onClick={this.onChange}>
                <span className="switch-button"></span>
            </span>
        )
    }
}

Switch.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool
}
