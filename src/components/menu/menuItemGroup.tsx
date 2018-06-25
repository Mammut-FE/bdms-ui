import React, { Component, ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from './menu.scss';

const cx = classNames.bind(styles);

interface IMenuItemGroup {
  className?: string;
  style?: React.CSSProperties;
  title?: string; // 组名，只有标题的作用，没有任何选中等效果
}
export default class MenuItemGroup extends Component<IMenuItemGroup, any> {
  public render() {
    const { children, className, title } = this.props;
    const menuGroupClasses = cx('u-menu-item-group', className);
    return (
      <div className={menuGroupClasses}>
        <div className={cx('u-menu-title')}>{title}</div>
        {React.Children.map(children, menuItem => {
          return React.cloneElement(menuItem as ReactElement<any>, {
            title
          });
        })}
      </div>
    );
  }
}
