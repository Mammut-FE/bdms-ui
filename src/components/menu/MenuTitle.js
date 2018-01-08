/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-08 16:25:23 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-08 16:27:56
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './menu.css'
import '../../style/index.css'

import MixinComponent from './MixinComponent'

export default class MenuTitle extends MixinComponent {
    render() {
        const {className, children} = this.props
        const meneItemClass = classNames('u-menu-title', className)

        return (
            <div className={meneItemClass}>{children}</div>
        )
    }
}