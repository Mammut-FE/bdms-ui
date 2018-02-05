import React, { Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './input.css'
import '../../style/index.css'

import Icon from '../icon/index'

export default class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isComposition: false
        }
    }

    fixControlledValue(value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    }

    onChangeHandler(e) {
        const value = e.target.value
        const { onChange } = this.props

        if (onChange) {
            onChange(value)
            
        }
    }

    onFocusHandler(e) {
        const { onFocus } = this.props
        if (onFocus) {
            onFocus(e)
        }
    }

    onBlurHandler(e) {
        const { onBlur } = this.props
        if (onBlur) {
            onBlur(e)
        }
    }

    onCompositionStartHandler(e) {
        this.setState({
            isComposition: true
        })

        const { onCompositionStart } = this.props
        if (onCompositionStart) onCompositionStart(e)
    }

    onCompositionEndHandler(e) {
        this.setState({
            isComposition: false
        })

        const { onCompositionEnd } = this.props
        if (onCompositionEnd) onCompositionEnd(e)
    }

    render() {
        const { type, className, style, name, placeholder, size, error, errorMessage, iconName, onMouseEnter, onMouseLeave, onIconClick,  ...otherProps } = this.props

        if ('value' in this.props) {
            otherProps.value = this.fixControlledValue(this.props.value);
        }

        const inputClass = classNames('u-input',  {
            'error': error 
        })
        const wrapperClass = classNames('u-input-wrapper', className, {
            [`u-input-wrapper-${size}`] : size
        })
        return (
            <div className = {wrapperClass} style = {style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <input {...otherProps} type = {type} className = {inputClass} name = {name} placeholder = {placeholder} onChange={this.onChangeHandler.bind(this)} onFocus={this.onFocusHandler.bind(this)} onBlur={this.onBlurHandler.bind(this)} onCompositionStart={this.onCompositionStartHandler.bind(this)} onCompositionEnd={this.onCompositionEndHandler.bind(this)} />
                { error && (
                    <div className='error-message'>{errorMessage}</div>
                )}
                { iconName && (
                    <Icon className='input-icon' name = {iconName} onClick={onIconClick}></Icon>
                )}
            </div>
        )
    }
}

Input.defaultProps = {
    size: 'normal'
}

Input.propTypes = {
    className: PropTypes.string,
    style: PropTypes.any,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    value: PropTypes.any,
    size: PropTypes.oneOf(['large', 'normal', 'xsmall', 'small']),
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    iconName: PropTypes.string,
    // event
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onIconClick: PropTypes.func
}