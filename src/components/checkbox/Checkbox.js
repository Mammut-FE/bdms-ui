import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './checkbox.css'
import '../../style/index.css'

export default class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.getChecked(props)
        }
    }


    getChecked(props) {
        return Boolean(props.checked)
    }
    
    setChecked(checked) {
        this.setState({
            checked
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            checked: props.checked
        })
    }

    onChange = (e) => {
        const checked = e.target.checked;
        const { onChange, handleCheck } = this.props;
        // this.setState({ checked })
        this.setChecked(checked)

        if (onChange) {
            onChange(this.props.value, checked)
        }
        if (handleCheck) {
            handleCheck(this.props.command, checked)
        }
    }

    render() {
        const {children, value, disabled, className, isIndeterminate} = this.props
        const {checked} = this.state

        const lableClass = classNames('u-label', className) 
        const inputClass = classNames('u-checkbox-input', {
            'checked': checked,
            'disabled-on': disabled && checked,
            'disabled-off': disabled && !checked,
            'indeterminate': isIndeterminate
        })

        return (
            <label className={lableClass}>
                <span className={inputClass}>
                    <span className="u-checkbox-inner"></span>
                    <input 
                    type="checkbox" 
                    checked={checked}
                    disabled={disabled}
                    onChange={this.onChange}
                    />
                </span>
                <span className='u-checkbox-text'>{children || value}</span>
            </label>
        )
    }
}

Checkbox.propTypes = {
    value: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    isIndeterminate: PropTypes.bool
}
