import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './checkbox.scss';

const cx = classNames.bind(styles);


type CheckboxProps = {
  value: string,
  checked: boolean,
  disabled: boolean,
  isIndeterminate?: boolean,
  onChange: (value: string, checked: boolean) => void,
  className?: string
};
export default class Checkbox extends Component<CheckboxProps, any> {

  constructor(props: CheckboxProps) {
    super(props)
  }

  onChange = e => {
    const checked = e.target.checked;
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.props.value, checked);
    }
  };
  render() {
    const {
      children,
      value,
      disabled,
      className,
      isIndeterminate,
      checked
    } = this.props;
    const labelClass = cx('u-label', className);
    const inputClass = cx('u-checkbox-input', {
      checked: checked,
      'disabled-on': disabled && checked,
      'disabled-off': disabled && !checked,
      indeterminate: isIndeterminate
    });
    return (
      <label className={labelClass}>
        <span className={inputClass}>
          <span className={cx('u-checkbox-inner')} />
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={this.onChange}
          />
        </span>
        <span className={cx('u-checkbox-text')}>{children || value}</span>
      </label>
    );
  }
}
