import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    onChange = (e) => {
        const checked = e.target.checked;
        const onChange = this.props.onChange;
        this.setState({ checked })

        if (onChange) {
            onChange(this.props.value, checked)
        }
        
    }

    render() {
        const {children, value, disabled, className} = this.props
        const {checked} = this.state

        return (
            <label className={`u-label ${className ? className : ''}`}>
                <span className={`u-checkbox-input ${checked ? 'checked' : ''} ${disabled && checked ? 'disabled-on' : ''} ${disabled && !checked ? 'disabled-off' : ''}`}>
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
}