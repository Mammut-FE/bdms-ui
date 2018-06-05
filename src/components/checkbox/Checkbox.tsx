import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './checkbox.scss';

const cx = classNames.bind(styles);

interface ICheckboxProps {
  value: string;
  checked: boolean;
  disabled?: boolean;
  isIndeterminate?: boolean;
  onChange: (value: string, checked: boolean) => void;
  className?: string;
}
export default class Checkbox extends Component<ICheckboxProps, {}> {
  constructor(props: ICheckboxProps) {
    super(props);
  }

  public render(): any {
    const {
      children,
      value,
      disabled,
      className,
      isIndeterminate,
      checked
    } = this.props;
    const labelClass = cx("u-label", className);
    const inputClass = cx("u-checkbox-input", {
      checked,
      "disabled-off": disabled && !checked,
      "disabled-on": disabled && checked,
      indeterminate: isIndeterminate
    });
    return (
      <label className={labelClass}>
        <span className={inputClass}>
          <span className={cx("u-checkbox-inner")} />
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={this.onChange}
          />
        </span>
        <span className={cx("u-checkbox-text")}>{children || value}</span>
      </label>
    );
  }

  private onChange = e => {
    const checked = e.target.checked;
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.props.value, checked);
    }
  };
}