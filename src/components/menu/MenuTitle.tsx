/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:20 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 19:08:48
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import menuClass from './menu.scss';

import MixinComponent from './MixinComponent';

const cx = classNames.bind(menuClass);

interface IMenuTitle {
  className?: string;
}

export default class MenuTitle extends MixinComponent {
  public render() {
    const { className, children } = this.props;

    const meneItemClass = cx('u-menu-title', className);

    return <div className={meneItemClass}>{children}</div>;
  }
}
