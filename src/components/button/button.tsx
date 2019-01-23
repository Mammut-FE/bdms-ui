import classNames from 'classnames/bind';
import React, { Component, CSSProperties } from 'react';

import { Icon } from '../icon';
import buttonStyle from './button.scss';
import { ButtonGroup } from './buttonGroup';

export type ButtonType = 'primary' | 'default' | 'text';
export type ButtonSize = 'small' | 'normal';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  className?: string;
  icon?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const cx = classNames.bind(buttonStyle);

export class Button extends Component<ButtonProps, any> {
  public static Group = ButtonGroup;

  public static defaultProps: Partial<ButtonProps> = {
    disabled: false,
    size: 'normal',
    type: 'default'
  };

  constructor(props: ButtonProps) {
    super(props);
  }

  public handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    e.preventDefault();
    const { onClick, disabled } = this.props;
    if (onClick && !disabled) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  public render() {
    const { className, disabled, children, type, size, ...others } = this.props;

    const classes = cx('btn', className, {
      [`btn-${type}`]: true,
      [`btn-${size}`]: true,
      disabled: type === 'text' && disabled
    });

    const iconNode = others.icon ? <Icon name={others.icon} /> : null;

    if ('href' in others) {
      return (
        <a className={classes} onClick={this.handleClick} {...others}>
          {iconNode}
          <span style={{ paddingLeft: others.icon && children ? '8px' : '' }}>{children}</span>
        </a>
      );
    } else {
      // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `others`.
      const { htmlType, ...rest } = others;
      return (
        <button
          type={htmlType || 'button'}
          className={classes}
          disabled={disabled}
          onClick={this.handleClick}
          {...rest}
        >
          {iconNode}
          <span style={{ paddingLeft: others.icon && children ? '8px' : '' }}>{children}</span>
        </button>
      );
    }
  }
}
