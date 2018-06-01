import classNames from 'classnames/bind';
import React, { Component } from 'react';

import buttonStyle from './button.scss';
import ButtonGroup from './ButtonGroup';

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  type?: string;
  size?: string;
  onClick?: (e: Event) => void;
}

export default class Button extends Component<IButtonProps> {
  public static Group = ButtonGroup;

  public onClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  public render() {
    const {className, disabled, icon, children} = this.props;

    const cx = classNames.bind(buttonStyle);

    const classes = cx('u-btn', className, {
      [`u-btn-${this.props.type}`]: true,
      [`u-btn-${this.props.size}`]: true
    });

    return (<button className={classes} disabled={disabled} onClick={this.onClick}>
      {icon && <i className={`icon icon-${icon}`}/>}
      <span style={{paddingLeft: icon && children ? '8px' : ''}}>
          {children}
        </span>
    </button>);
  }
}
