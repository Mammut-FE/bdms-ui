import classNames from 'classnames/bind';
import React, { Component, MouseEvent } from 'react';

import buttonStyle from './button.scss';
import ButtonGroup from './ButtonGroup';

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  type?: string;
  size?: 'small' | 'normal';
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export default class Button extends Component<IButtonProps, any> {
  public static Group = ButtonGroup;

  constructor(props: IButtonProps) {
    super(props);
    const initialState = {
      size: 'normal',
      type: 'default'
    };
    this.state = Object.assign({}, initialState, props);
  }

  public onClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  public render() {
    const {className, disabled, icon, children, type, size} = this.props;

    const cx = classNames.bind(buttonStyle);

    const classes = cx('u-btn', className, {
      [`u-btn-${type}`]: true,
      [`u-btn-${size}`]: true
    });

    return (<button className={classes} disabled={disabled} onClick={this.onClick}>
      {icon && <i className={`icon icon-${icon}`}/>}
      <span style={{paddingLeft: icon && children ? '8px' : ''}}>
          {children}
        </span>
    </button>);
  }
}
