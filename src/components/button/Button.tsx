import classNames from 'classnames/bind';
import React, { Component, MouseEvent } from 'react';

import Icon from '../icon';
import buttonStyle from './button.scss';
import ButtonGroup from './ButtonGroup';

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  type?: "primary" | "default" | "text";
  size?: "small" | "normal";
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const cx = classNames.bind(buttonStyle);

export default class Button extends Component<IButtonProps, any> {
  public static Group = ButtonGroup;

  public static defaultProps: Partial<IButtonProps> = {
    size: "normal",
    type: "default"
  };

  constructor(props: IButtonProps) {
    super(props);
  }

  public onClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  public render() {
    const { className, disabled, children, type, size, ...others } = this.props;

    const classes = cx("u-btn", className, {
      [`u-btn-${type}`]: true,
      [`u-btn-${size}`]: true
    });

    const iconNode = others.icon ? <Icon name={others.icon} /> : null;

    const ComponentProp = others.href ? "a" : "button";

    return (
      <ComponentProp
        className={classes}
        disabled={disabled}
        onClick={this.onClick}
        {...others}
      >
        {iconNode}
        <span style={{ paddingLeft: others.icon && children ? "8px" : "" }}>
          {children}
        </span>
      </ComponentProp>
    );
  }
}
