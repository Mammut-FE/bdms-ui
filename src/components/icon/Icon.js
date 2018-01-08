/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-08 16:25:30 
 * @Last Modified by:   jessica(hzgujing@corp.netease.com) 
 * @Last Modified time: 2018-01-08 16:25:30 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Icon extends Component{
    render() {
        const {name} = this.props;
        const iconClass = classNames('icon', `icon-${name}`)
        return (
            <i className = {iconClass}></i>
        )
    } 
}

Icon.propTypes = {
    name: PropTypes.string
}