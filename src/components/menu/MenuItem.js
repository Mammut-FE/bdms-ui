/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-05 16:11:56 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-09 10:53:43
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './menu.css'
import '../../style/index.css'

import MixinComponent from './MixinComponent'
import Icon from '../icon'

export default class MenuItem extends MixinComponent {
    constructor(props) {
        super (props)
    }

    componentDidMount() {
        setTimeout(() => {
            this.parent().setMenuItems(this)
        }, 500)
    }


    handleItemClick() {
        this.parent().handleMenuItemClick(this.props.command, this)
    }

    active() {
        const parent = this.parent()
        return parent.state.selected === this.props.command
    }

    render() {
        const {className, children, disabled, divided, iconName, subDesc, selected} = this.props
        const parent = this.parent()
        const tickSelect = parent.props.tickSelect
        const meneItemClass = classNames('u-menu-item', className, {
            'disabled': disabled,
            'divided': divided,
            'bg-selected': this.active() && !tickSelect,
            'pdl-change': tickSelect
        })

        return (
            <div className={meneItemClass} onClick={this.handleItemClick.bind(this)}>
                {
                    tickSelect && this.active() && (
                        <Icon name='right-all' className="tick-icon"></Icon>
                    )
                }
                { iconName && (
                    <Icon name={iconName}></Icon>   
                )}
                {children}
                { subDesc && (
                    <span className="subtitle">{subDesc}</span>
                )}
            </div>
        )
    }
}

MenuItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    disabled: PropTypes.bool,
    divided: PropTypes.bool,
    iconName: PropTypes.string,
    subtitle: PropTypes.string,
    tickSelect: PropTypes.string,
    command: PropTypes.string
}
