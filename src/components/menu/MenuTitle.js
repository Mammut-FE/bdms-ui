/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2018-01-08 16:25:23
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-05-30 19:37:24
 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import menuClass from './menu.scss'
import '../../style/index.scss'

import MixinComponent from './MixinComponent'

export default class MenuTitle extends MixinComponent {
    render() {
        const {className, children} = this.props

        let cx = classNames.bind(menuClass)

        const meneItemClass = cx('u-menu-title', className)

        return (
            <div className={meneItemClass}>{children}</div>
        )
    }
}

MenuTitle.propTypes = {
    className: PropTypes.string
}
