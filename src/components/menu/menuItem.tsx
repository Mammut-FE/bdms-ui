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
}

const cx = classNames.bind(styles);

export default class MenuItem extends Component<IMenuItemProps, any> {
  public static key;
  constructor(props: IMenuItemProps) {
    super(props);
  }
  public render() {
    const { className, style, children, value, icon } = this.props;
    return (
      <Consumer>
        {valueProp => {
          const { selected, clickItem, isTick } = valueProp;
          let menuItemClasses;
          if (typeof selected === 'string') {
            menuItemClasses = cx('u-menu-item', className, {
              'bg-selected': (selected as string) === value && !isTick,
              'pdl-change': isTick
            });
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
