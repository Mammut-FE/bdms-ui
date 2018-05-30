import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './tag.scss'
import '../../style/index.scss'
import Icon from '../icon/Icon';

export default class Tag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }
    closeTag(e) {
        this.setState({visible: false})
        if (this.props.onClose) {
            this.props.onClose(e)
        }
        e.stopPropagation()
    }
    componentWillUnmount() {
        console.log('tag component will unmount')
    }
    render() {
        const { children, size, closable, iconName } = this.props
        const { visible } = this.state
        const tagClass = classNames('u-tag', `u-tag-${size}`)
        if (visible) {
            return (
                <div className={tagClass}>
                  {iconName && (
                      <Icon name={iconName}></Icon>
                  )}
                  {children}
                  { closable && (
                      <Icon name="close" onClick={this.closeTag.bind(this)}></Icon>
                  )}
                </div>
            )
        } else {
            return null
        }
    }
}

Tag.propTypes = {
    closable: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'normal']),
    iconName: PropTypes.string
}

Tag.defaultProps = {
    size: 'small',
    closable: true
}
