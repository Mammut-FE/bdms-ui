import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './layout.scss';
import { Sider } from './sider';

const cx = classNames.bind(styles);

interface ILayoutProps {
  className?: string;
  style?: React.CSSProperties;
  hasSider?: boolean;
}

export const Header = props => (
  <div className={cx('u-header', props.className)} style={props.style}>
    {props.children}
  </div>
);

export const Footer = props => (
  <div className={cx('u-footer', props.className)} style={props.style}>
    {props.children}
  </div>
);

export const Content = props => (
  <div className={cx('u-content', props.className)} style={props.style}>
    {props.children}
  </div>
);

export class Layout extends Component<ILayoutProps, any> {
  public static Header = Header;
  public static Footer = Footer;
  public static Content = Content;
  public static Sider = Sider;

  public static defaultProps: Partial<ILayoutProps> = {
    hasSider: false
  };

  public render() {
    const { className, children, style, hasSider } = this.props;

    const classes = cx('u-layout', className, {
      'layout-with-sider': hasSider
    });
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }
}
