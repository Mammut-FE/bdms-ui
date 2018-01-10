import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
// import _ from 'lodash'

import './menu.css'
import '../../style/index.css'

import classNames from 'classnames'

import MixinComponent from './MixinComponent'

export default class MenuContent extends MixinComponent {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
        this.state = {
            scrollTop: 0
        }
        this.time = null
    }


    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.scrollControl(el)
    }

    componentWillUnmount() {
        clearInterval(this.time)
    }

    componentWillReceiveProps(props) {
        if (props.scrollTop === 0) return
        setTimeout( () => {
            const scrollTop = props.scrollTop < 0 ? 0 : props.scrollTop
            const el = ReactDOM.findDOMNode(this);

            // this.time = setInterval( () => {
            //     this.setState({
            //         scrolling: true
            //     })
            //     if (el.scrollTop < scrollTop) {
            //         el.scrollTop += 10;
            //     } else if (el.scrollTop === scrollTop) {
            //         clearInterval(this.time)
            //     } else if (el.scrollTop > scrollTop) {
            //         el.scrollTop -= 10;
            //     }
            // }, 10)
            
            el.scrollTop = scrollTop
        }, 10)
    }

    scrollControl(el) {
        const parent = this.parent()
        if (el.offsetHeight < el.scrollHeight) {
            parent.overflowBottomControl(true)
        } else {
            parent.overflowBottomControl(false)
        }
        
        if (el.scrollTop === el.scrollHeight - el.offsetHeight) {
            parent.overflowBottomControl(false)
        }
        
        if (el.scrollTop > 0) {
            parent.overflowTopControl(true)
        } else {
            parent.overflowTopControl(false)
        }
    }
    
    handleScroll(e) {
        const el = ReactDOM.findDOMNode(this);
        const parent = this.parent()
        const { scrolling } = this.state
        this.scrollControl(el)
        parent.setScrollTop(el.scrollTop)
    }
    
    render() {
        const {className, children} = this.props
        const contentClass = classNames('content', className)

        return (
            <div className={contentClass} onScroll={this.handleScroll}>
                {children}
            </div>
        )
    }
}

MenuContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.array,
}