import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './menu.scss';
import { Consumer } from './menuContext';
import { Icon } from '../icon';
import { Checkbox } from '../checkbox';

interface IMenuItemProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  icon?: string;
  title?: string; // 在group中有用，标记属于哪个group,在group中设置，其本身从group组建中获取，不需要额外写
  disabled?: boolean;
  subtitle?: string;
  visible?: boolean;
}

const cx = classNames.bind(styles);

export default class MenuItem extends Component<IMenuItemProps, any> {
  public static defaultProps: Partial<IMenuItemProps> = {
    visible: true
  };

  constructor(props: IMenuItemProps) {
    super(props);
  }

  public render() {
    const { className, style, children, value, icon, disabled, subtitle, ...otherProps } = this.props;
    return (
      <Consumer>
        {valueProp => {
          const { selected, clickItem, isTick, mode, hasCheckBox, visible, ...others } = Object.assign(
            {},
            valueProp,
            otherProps
          );
          let menuItemClasses;
          let menuItem;
          if (!hasCheckBox) {
            if (typeof selected === 'string') {
              if (mode === 'vertical') {
                menuItemClasses = cx('u-menu-item', className, {
                  'bg-selected': (selected as string) === value && !isTick,
                  disabled
                });
              } else if (mode === 'horizontal') {
                menuItemClasses = cx('u-menu-item-horizontal', className, {
                  'horztl-selected': (selected as string) === value,
                  disabled
                });
              } else if (mode === 'inline') {
                menuItemClasses = cx('u-menu-item-inline', className, {
                  selected: (selected as string) === value && !isTick
                });
              }
            } else {
              menuItemClasses = cx('u-menu-item', className, {
                'bg-selected': (selected as string[]).indexOf(value!) !== -1 && !isTick,
                disabled
              });
            }
          } else {
            menuItemClasses = cx('u-menu-checkbox', className);
          }

          if (!hasCheckBox) {
            menuItem = (
              <div
                className={menuItemClasses}
                style={style}
                onClick={() => {
                  if (!disabled) {
                    clickItem(value);
                  }
                }}
                {...others}
              >
                {isTick && typeof selected === 'string' && (selected as string) === value && (
                  <Icon className={cx('tick-icon')} name="ture" />
                )}
                {isTick && selected instanceof Array && (selected as string[]).indexOf(value!) !== -1 && (
                  <Icon className={cx('tick-icon')} name="ture" />
                )}
                {icon && <Icon name={icon} />}
                {children}
                {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
              </div>
            );
          } else {
            menuItem = (
              <div className={menuItemClasses} style={style} {...others}>
                <Checkbox
                  value={value!}
                  disabled={disabled}
                  mode="vertical"
                  checked={(selected as string[]).indexOf(value!) !== -1}
                  onChange={value => {
                    clickItem(value);
                  }}
                >
                  {children}
                </Checkbox>
                {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
              </div>
            );
          }
          return visible && menuItem;
        }}
      </Consumer>
    );
  }
}
