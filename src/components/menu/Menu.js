/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-05 16:12:23 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-12 10:07:05
 */
import React, { Component} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './menu.css'
import '../../style/index.css'

import Icon from '../icon'
import MenuContent from './MenuContent'
import classNames from 'classnames'
import _ from 'lodash'

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
            scrollTop: 0,
            baseScrollTop: 0,
            checkItem: []
        }
        this.menuContent = null
        this.handleCheck = this.handleCheck.bind(this)
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

    setBaseScrollTop(scrollTop) {
        this.setState({
            baseScrollTop: scrollTop
        })
    }

    getMenuContent(content) {
        this.menuContent = content;
    }

    scrollUp() {
        let scrollTop = this.state.scrollTop - SCROLL_UNIT
        if (scrollTop < 0) {
            scrollTop = 0
        }
        this.setScrollTop(scrollTop)
        this.slideScroll(scrollTop)
    }

    scrollDown() {
        const el = ReactDOM.findDOMNode(this.menuContent)
        let scrollTop = this.state.scrollTop + SCROLL_UNIT
        if (scrollTop > el.scrollHeight - el.offsetHeight) {
            scrollTop = el.scrollHeight - el.offsetHeight
        }
        this.setScrollTop(scrollTop)
        this.slideScroll(scrollTop)
    }

    slideScroll(scrollTop) {
        const el = ReactDOM.findDOMNode(this.menuContent)
        let time = setInterval( () => {
            if (el.scrollTop < scrollTop) {
                el.scrollTop += 40;
            } else if (el.scrollTop === scrollTop) {
                clearInterval(time)
            } else if (el.scrollTop > scrollTop) {
                el.scrollTop -= 40;
            }
        }, 5)
    }

    handleCheck(command, checked) {
        let checkItem = this.state.checkItem;
        if (checked) {
            checkItem.push(command)
        } else {
            checkItem.splice(_.indexOf(command), 1)
        }
        this.setState({
            checkItem: checkItem
        })

        if (this.props.onCheck) {
            this.props.onCheck(checkItem)
        }
    }

    render() {
        const {className, children, style} = this.props
        const {overflowBottom, overflowTop, scrollTop} = this.state


        const menuClass = classNames('u-menu', className, {
            'pdb-change': overflowBottom,
            'pdt-change': overflowTop
        })

        return (
            <div className={menuClass} style={style}>
                {
                    overflowTop && (
                        <div className='handle-top' onClick={this.scrollUp.bind(this)}>
                            <Icon name='chevron-up'></Icon>
                        </div>
                    )
                }
                <MenuContent scrollTop={scrollTop} ref={this.getMenuContent.bind(this)}>
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
    className: PropTypes.string,
    selected: PropTypes.string,
    withCheck: PropTypes.bool
}

Menu.childContextTypes = {
    component: PropTypes.any
}