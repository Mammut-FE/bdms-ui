/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2017-10-23 15:03:17
 * @Last Modified by:   jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2017-10-23 15:03:17
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './radio.scss'
import '../../style/index.scss'

export default class Radio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.getChecked(props)
        }
    }

    componentWillReceiveProps(props) {
        const checked = this.getChecked(props);

        if (this.state.checked !== checked) {
            this.setState({ checked });
        }
    }

    getChecked(props) {
        return Boolean(props.checked)
    }

    onChange = (e) => {
        const onChange = this.props.onChange

        if (onChange) {
            onChange(this.props.value)
        }

        this.setState({checked: e.target.checked})
    }

    render() {
        const {disabled, value, children, className} = this.props
        const {checked} = this.state


        return (
            <label className={`u-label ${className ? className : ''}`}>
                <span className='u-radio-input'>
                    <span className={`u-radio-inner ${checked ? 'checked' : ''} ${disabled && checked ? 'disabled-on' : ''} ${disabled && !checked ? 'disabled-off' : ''}`}></span>
                    <input
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.onChange}
                    />
                </span>
                <span className={`u-radio-text ${disabled? 'disabled' : ''}`}>{children || value}</span>
            </label>
        )
    }
}

Radio.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
