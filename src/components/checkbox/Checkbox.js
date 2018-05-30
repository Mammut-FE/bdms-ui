import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './checkbox.scss';

const cx = classNames.bind(styles);

export default class Checkbox extends Component {
  onChange = (e) => {
    const checked = e.target.checked;
    const {onChange} = this.props;
    
    if (onChange) {
      onChange(this.props.value, checked);
    }
  };
  
  render () {
    const {children, value, disabled, className, isIndeterminate, checked} = this.props;
    
    const labelClass = cx('u-label', className);
    const inputClass = cx('u-checkbox-input', {
      'checked': checked,
      'disabled-on': disabled && checked,
      'disabled-off': disabled && !checked,
      'indeterminate': isIndeterminate
    });
    
    return (
      <label className={labelClass}>
        <span className={inputClass}>
          <span className={cx('u-checkbox-inner')}/>
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

Checkbox.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  isIndeterminate: PropTypes.bool
};
