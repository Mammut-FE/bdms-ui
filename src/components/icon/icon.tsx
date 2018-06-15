/*
* @Author: jessica(gujing_hy@163.com) 
* @Date: 2018-06-06 13:42:47 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 10:59:04
*/
import classNames from 'classnames';
import React, { Component, CSSProperties, MouseEvent } from 'react';

interface IIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export default class Icon extends Component<IIconProps, any> {
  public render() {
    const { name, className, onClick, style } = this.props;
    const iconClass = classNames('icon', className, `icon-${name}`);
    return <i className={iconClass} style={style} onClick={onClick} />;
  }
}
