import classNames from 'classnames/bind';
import React, { Component, MouseEvent } from 'react';

import buttonStyle from './button.scss';
import ButtonGroup from './ButtonGroup';

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  type?: string;
  size?: "small" | "normal";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

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

    const cx = classNames.bind(buttonStyle);

    const classes = cx("u-btn", className, {
      [`u-btn-${type}`]: true,
      [`u-btn-${size}`]: true
    });

    console.log(classes);

    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={this.onClick}
        {...others}
      >
        {others.icon && <i className={`icon icon-${others.icon}`} />}
        <span style={{ paddingLeft: others.icon && children ? "8px" : "" }}>
          {children}
        </span>
      </button>
    );
  }
}
