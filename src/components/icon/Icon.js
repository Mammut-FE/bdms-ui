/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:47 
 * @Last Modified by:   jessica(gujing_hy@163.com) 
 * @Last Modified time: 2018-06-06 13:42:47 
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

export default class Icon extends Component {
  render() {
    const { name, className, onClick } = this.props;
    const iconClass = classNames("icon", className, `icon-${name}`);
    return <i className={iconClass} onClick={onClick} />;
  }
}

Icon.propTypes = {
  name: PropTypes.string
};
