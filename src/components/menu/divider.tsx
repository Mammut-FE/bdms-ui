import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './menu.scss';

interface IDivider {
  className?: string;
  style?: React.CSSProperties;
}

const cx = classNames.bind(styles);

export default class Divider extends Component<IDivider, any> {
  public render() {
    const { className, style } = this.props;
    const dividerClasses = cx('u-divider', className);
    return <div className={dividerClasses} style={style} />;
  }
}
