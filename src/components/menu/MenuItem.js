/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2018-01-05 16:11:56
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-05-30 20:00:02
 */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import menuClass from "./menu.scss";

import MixinComponent from "./MixinComponent";
import Icon from "../icon";

export default class MenuItem extends MixinComponent {
  // constructor(props) {
  //     super (props)
  //     // this.handleCheck = this.handleCheck.bind(this)
  // }

  componentDidMount() {
    setTimeout(() => {
      this.parent().setMenuItems(this);
    }, 10);
  }

  handleItemClick() {
    this.parent().handleMenuItemClick(this.props.command, this);
  }

  active() {
    const parent = this.parent();
    return parent.state.selected === this.props.command && !this.props.disabled;
  }

  render() {
    const {
      className,
      children,
      disabled,
      divided,
      iconName,
      subDesc,
      command
    } = this.props;
    const parent = this.parent();
    const { tickSelect, withCheck } = parent.props;
    const handleCheck = parent.handleCheck;

    let cx = classNames.bind(menuClass);

    const meneItemClass = cx("u-menu-item", className, {
      disabled: disabled,
      divided: divided,
      "bg-selected": this.active() && !tickSelect && !withCheck,
      "pdl-change": tickSelect && !withCheck
    });

    if (!withCheck) {
      return (
        <div
          className={meneItemClass}
          onClick={this.handleItemClick.bind(this)}
        >
          {tickSelect &&
            this.active() && (
              <Icon name="right-all" className={cx("tick-icon")} />
            )}
          {iconName && <Icon name={iconName} />}
          {children}
          {subDesc && <span className={cx("subtitle")}>{subDesc}</span>}
        </div>
      );
    } else {
      const childrenWithProps = React.cloneElement(children, {
        handleCheck: handleCheck,
        command: command
      });
      return (
        <div className={meneItemClass}>
          {childrenWithProps}
          {subDesc && <span className={cx("subtitle")}>{subDesc}</span>}
        </div>
      );
    }
  }
}

MenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  divided: PropTypes.bool,
  iconName: PropTypes.string,
  subtitle: PropTypes.string,
  tickSelect: PropTypes.string,
  command: PropTypes.string,
  subDesc: PropTypes.string
};
