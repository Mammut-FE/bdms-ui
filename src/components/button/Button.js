import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default class Button extends Component {
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };
  
  render () {
    return (
      <button className={`u-btn u-btn-${this.props.type} u-btn-${this.props.size} ${this.props.className}`}
              disabled={this.props.disabled} onClick={this.onClick}>
        {this.props.icon && <i className={`icon icon-${this.props.icon}`}></i>}
        <span style={{paddingLeft: this.props.icon && this.props.children ? '8px' : ''}}>{this.props.children}</span>
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
