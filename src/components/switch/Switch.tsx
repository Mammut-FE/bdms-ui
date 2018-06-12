import classNames from 'classnames/bind';
import React, { Component } from 'react';
import style from './switch.scss';

const cx = classNames.bind(style);

interface ISwitchProps {
  className?: string;
  open?: boolean;
  disabled?: boolean;
  onChange?: (open: boolean) => void;
}

interface ISwitchState {
  readonly open: boolean;
}

export default class Switch extends Component<ISwitchProps, ISwitchState> {
  public static defaultProps: Partial<ISwitchProps> = {
    disabled: false,
    open: false
  };

  public readonly state: Readonly<ISwitchState> = {
    open: this.getOpened(this.props)
  };

  constructor(props: ISwitchProps) {
    super(props);
  }

  public getOpened(props) {
    return Boolean(props.open);
  }

  public onChange = e => {
    const onChange = this.props.onChange;

    const open = this.state.open;

    if (!this.props.disabled) {
      this.setState({ open: !open });
    }

    if (onChange && !this.props.disabled) {
      onChange(!open);
    }
  };

  public render() {
    const { className, disabled } = this.props;
    const { open } = this.state;

    const classes = cx('u-switch', className, {
      disabled,
      open
    });

    return (
      <span className={classes} onClick={this.onChange}>
        <span className={cx('switch-button')} />
      </span>
    );
  }
}
