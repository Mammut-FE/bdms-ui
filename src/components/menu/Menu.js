/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-05 16:12:23 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-09 10:39:44
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './menu.css'
import '../../style/index.css'

export default class Menu extends Component {
    constructor(props) {
        super (props)
        this.state={
            selected: this.getSelected(props),
            menuItems: {}
        }
    }

    getSelected(props) {
        return props.selected
    }

    setMenuItems(instance) {
        let menuItems = Object.assign({}, this.state.menuItems);
        menuItems[instance.props.command] = instance;
        this.setState({
            menuItems: menuItems
        })
    }


    getChildContext() {
        return {
            component: this
        }
    }

    handleMenuItemClick(key, instance) {
        if (this.props.onCommand) {
            this.props.onCommand(key, instance);
            this.setState({
                selected: key
            })
        }
    }

    render() {
        const {className, children} = this.props

        return (
            <div className={`u-menu ${className ? className : ''}`}>
            {children}
            </div>
        )
    }
}

Menu.propTypes = {
    className: PropTypes.string
}

Menu.childContextTypes = {
    component: PropTypes.any
}