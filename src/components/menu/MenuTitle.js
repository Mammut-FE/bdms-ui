/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:20 
 * @Last Modified by:   jessica(gujing_hy@163.com) 
 * @Last Modified time: 2018-06-06 13:43:20 
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import menuClass from "./menu.scss";

import MixinComponent from "./MixinComponent";

export default class MenuTitle extends MixinComponent {
  render() {
    const { className, children } = this.props;

    let cx = classNames.bind(menuClass);

    const meneItemClass = cx("u-menu-title", className);

    return <div className={meneItemClass}>{children}</div>;
  }
}

MenuTitle.propTypes = {
  className: PropTypes.string
};
