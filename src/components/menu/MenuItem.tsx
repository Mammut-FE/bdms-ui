/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:14 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 19:08:28
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import menuClass from './menu.scss';

import MixinComponent from './MixinComponent';
import Icon from '../icon';

const cx = classNames.bind(menuClass);

interface IMenuItemProps {
  className?: string;
  children?: any;
  disabled?: bool;
  divided?: bool;
  iconName?: string;
  subtitle?: string;
  tickSelect?: string;
  command?: string;
  subDesc?: string;
}

export default class MenuItem extends MixinComponent {
  constructor(props: IMenuItemProps) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  public componentDidMount() {
    setTimeout(() => {
      this.parent().setMenuItems(this);
    }, 10);
  }

  public handleItemClick() {
    this.parent().handleMenuItemClick(this.props.command, this);
  }

  public active() {
    const parent = this.parent();
    return parent.state.selected === this.props.command && !this.props.disabled;
  }

  public render() {
    const { className, children, disabled, divided, iconName, subDesc, command } = this.props;
    const parent = this.parent();
    const { tickSelect, withCheck } = parent.props;
    const handleCheck = parent.handleCheck;

    const meneItemClass = cx('u-menu-item', className, {
      'bg-selected': this.active() && !tickSelect && !withCheck,
      disabled,
      divided,
      'pdl-change': tickSelect && !withCheck
    });

    if (!withCheck) {
      return (
        <div className={meneItemClass} onClick={this.handleItemClick}>
          {tickSelect && this.active() && <Icon name="right-all" className={cx('tick-icon')} />}
          {iconName && <Icon name={iconName} />}
          {children}
          {subDesc && <span className={cx('subtitle')}>{subDesc}</span>}
        </div>
      );
    } else {
      const childrenWithProps = React.cloneElement(children, {
        command,
        handleCheck
      });
      return (
        <div className={meneItemClass}>
          {childrenWithProps}
          {subDesc && <span className={cx('subtitle')}>{subDesc}</span>}
        </div>
      );
    }
  }
}
