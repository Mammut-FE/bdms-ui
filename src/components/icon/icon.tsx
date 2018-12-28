/*
 * @Author: jessica(gujing_hy@163.com)
 * @Date: 2018-06-06 13:42:47
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 10:59:04
 */
import classNames from 'classnames';
import React, { Component } from 'react';

interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
}

export class Icon extends Component<IIconProps, any> {
  public render() {
    const { name, className, ...restProps } = this.props;
    const iconClass = classNames('icon', `icon-${name}`, className);
    return <i className={iconClass} {...restProps} />;
  }
}
