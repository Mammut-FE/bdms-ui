import classNames from "classnames/bind";
import React, { Component } from "react";

import styles from "./layout.scss";

const cx = classNames.bind(styles);

interface ILayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Header = props => (
  <div className={cx("u-header")}>{props.children}</div>
);

export const Footer = props => (
  <div className={cx("u-footer")}>{props.children}</div>
);

export default class Layout extends Component<ILayoutProps, any> {
  public static Header;
  public static Footer;
  public render() {
    const { className, children, style } = this.props;

    const classes = cx("u-layout", className);
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }
}
