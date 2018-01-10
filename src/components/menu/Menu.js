/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-05 16:12:23 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-10 10:32:43
 */
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import './menu.css'
import '../../style/index.css'

import Icon from '../icon'
import MenuContent from './MenuContent'
import classNames from 'classnames'

const SCROLL_UNIT = 400

export default class Menu extends Component {
    constructor(props) {
        super (props)
        this.state = {
            selected: this.getSelected(props),
            menuItems: {},
            overflowTop: false,
            overflowBottom: false,
            offsetHeight: 0,
            scrollHeight: 0,
            scrollTop: 0
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

    overflowBottomControl(overflow) {
        this.setState({
            overflowBottom: overflow
        })
    }

    overflowTopControl(overflow) {
        this.setState({
            overflowTop: overflow
        })
    }

    setScrollTop(scrollTop) {
        this.setState({
            scrollTop: scrollTop
        })
    }

    scrollUp() {
        const scrollTop = this.state.scrollTop - SCROLL_UNIT
        this.setState({
            scrollTop: scrollTop
        })
    }

    scrollDown() {
        const scrollTop = this.state.scrollTop + SCROLL_UNIT
        this.setState({
            scrollTop: scrollTop
        })
    }

    render() {
        const {className, children} = this.props
        const {overflowBottom, overflowTop, scrollTop} = this.state


        const menuClass = classNames('u-menu', className, {
            'pdb-change': overflowBottom,
            'pdt-change': overflowTop
        })

        return (
            <div className={menuClass}>
                {
                    overflowTop && (
                        <div className='handle-top' onClick={this.scrollUp.bind(this)}>
                            <Icon name='chevron-up'></Icon>
                        </div>
                    )
                }
                <MenuContent scrollTop={scrollTop}>
                    {children}
                </MenuContent>
                {
                    overflowBottom && (
                        <div className='handle-bottom' onClick={this.scrollDown.bind(this)}>
                            <Icon name='chevron-down'></Icon>
                        </div>
                    )
                }
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