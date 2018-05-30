import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind'

import buttonStyle from './button.scss';
import commonStyle from '../../style/index.scss';

export default class Button extends Component {
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };
  
  render () {
    const { className, disabled, icon, children } = this.props

    
    let cx = classNames.bind(buttonStyle);
    
    const classes = cx('u-btn', className, {
      [`u-btn-${this.props.type}`]: true,
      [`u-btn-${this.props.size}`]: true
    });

    return (
      <button className={classes}
              disabled={disabled} onClick={this.onClick}>
        {icon && <i className={`icon icon-${icon}`}></i>}
        <span style={{paddingLeft: icon && children ? '8px' : ''}}>{children}</span>
      </button>
    );
  }
}

/**
 * @param type {String} value: default primary text
 */

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string
};

Button.defaultProps = {
  type: 'default',
  size: 'normal',
  disabled: false
};
