/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:29 
 * @Last Modified by:   jessica(gujing_hy@163.com) 
 * @Last Modified time: 2018-06-06 13:43:29 
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./radio.scss";

export default class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.getChecked(props)
    };
  }

  componentWillReceiveProps(props) {
    const checked = this.getChecked(props);

    if (this.state.checked !== checked) {
      this.setState({ checked });
    }
  }

  getChecked(props) {
    return Boolean(props.checked);
  }

  onChange = e => {
    const onChange = this.props.onChange;

    if (onChange) {
      onChange(this.props.value);
    }

    this.setState({ checked: e.target.checked });
  };

  render() {
    const { disabled, value, children, className } = this.props;
    const { checked } = this.state;

    return (
      <label className={`u-label ${className ? className : ""}`}>
        <span className="u-radio-input">
          <span
            className={`u-radio-inner ${checked ? "checked" : ""} ${
              disabled && checked ? "disabled-on" : ""
            } ${disabled && !checked ? "disabled-off" : ""}`}
          />
          <input
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={this.onChange}
          />
        </span>
        <span className={`u-radio-text ${disabled ? "disabled" : ""}`}>
          {children || value}
        </span>
      </label>
    );
  }
}

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
