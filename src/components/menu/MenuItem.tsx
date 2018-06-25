import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './menu.scss';
import { Consumer } from './menuContext';
import Icon from '../icon';

interface IMenuItemProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  icon?: string;
  title?: string; // 在group中有用，标记属于哪个group,在group中设置，其本身从group组建中获取，不需要额外写
}

const cx = classNames.bind(styles);

export default class MenuItem extends Component<IMenuItemProps, any> {
  public static key;
  constructor(props: IMenuItemProps) {
    super(props);
  }
  public render() {
    const { className, style, children, value, icon, ...otherProps } = this.props;
    return (
      <Consumer>
        {valueProp => {
          const { selected, clickItem, isTick, mode } = valueProp;
          let menuItemClasses;
          if (typeof selected === 'string') {
            if (mode === 'vertical') {
              menuItemClasses = cx('u-menu-item', className, {
                'bg-selected': (selected as string) === value && !isTick,
                'pdl-change': isTick
              });
            } else if (mode === 'horizontal') {
              menuItemClasses = cx('u-menu-item-horizontal', className, {
                'horztl-selected': (selected as string) === value
              });
            }
          } else {
            menuItemClasses = cx('u-menu-item', className, {
              'bg-selected': (selected as string[]).indexOf(value!) !== -1 && !isTick,
              'pdl-change': isTick
            });
          }
          return (
            <div
              className={menuItemClasses}
              style={style}
              onClick={() => {
                clickItem(value);
              }}
              {...otherProps}
            >
              {isTick &&
                typeof selected === 'string' &&
                (selected as string) === value && <Icon className={cx('tick-icon')} name="ture" />}
              {isTick &&
                selected instanceof Array &&
                (selected as string[]).indexOf(value!) !== -1 && <Icon className={cx('tick-icon')} name="ture" />}
              {icon && <Icon name={icon} />}
              {children}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
