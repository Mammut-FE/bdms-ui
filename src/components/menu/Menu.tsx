/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:07 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-13 15:40:57
 */

import classNames from 'classnames/bind';
import React, { Component, CSSProperties, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import menuClass from './menu.scss';
import PropTypes from 'prop-types';

import Icon from '../icon';
import MenuContent from './MenuContent';
import _ from 'lodash';
import MenuItem from './MenuItem';
import MenuTitle from './MenuTitle';

const SCROLL_UNIT = 400;
const cx = classNames.bind(menuClass);

interface IMenuProps {
  className?: string;
  selected?: string;
  withCheck?: boolean;
  style?: CSSProperties;
  tickSelect?: boolean;
  onCommand?: (key: string, instance: Component) => void;
  onCheck?: (checkItem: any[]) => void;
}

/**
 * @param {Boolean} overflowTop 是否显示顶部三角箭头
 * @param {Boolean} overflowBottom  是否显示底部三角箭头
 */

interface IMenuState {
  readonly selected: boolean;
  readonly menuItems: object;
  readonly overflowTop: boolean;
  readonly overflowBottom: boolean;
  readonly offsetHeight: number;
  readonly scrollHeight: number;
  readonly scrollTop: number;
  readonly baseScrollTop: number;
  readonly checkItem: any[];
  readonly menuContent: any;
}

export default class Menu extends Component<IMenuProps, IMenuState> {
  public static Item = MenuItem;
  public static Title = MenuTitle;

  public static childContextTypes = {
    component: PropTypes.any
  };

  public readonly state: Readonly<IMenuState> = {
    baseScrollTop: 0,
    checkItem: [],
    menuContent: null,
    menuItems: {},
    offsetHeight: 0,
    overflowBottom: false,
    overflowTop: false,
    scrollHeight: 0,
    scrollTop: 0,
    selected: this.getSelected(this.props)
  };
  constructor(props: IMenuProps) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.getMenuContent = this.getMenuContent.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
  }

  public getSelected(props) {
    return props.selected;
  }

  public setMenuItems(instance) {
    const menuItems = Object.assign({}, this.state.menuItems);
    menuItems[instance.props.command] = instance;
    this.setState({
      menuItems
    });
  }

  public getChildContext() {
    return {
      component: this
    };
  }

  public handleMenuItemClick(key, instance) {
    this.setState({
      selected: key
    });
    if (this.props.onCommand) {
      this.props.onCommand(key, instance);
    }
  }

  public overflowBottomControl(overflow) {
    this.setState({
      overflowBottom: overflow
    });
  }

  public overflowTopControl(overflow) {
    this.setState({
      overflowTop: overflow
    });
  }

  public setScrollTop(scrollTop) {
    this.setState({
      scrollTop
    });
  }

  public setBaseScrollTop(scrollTop) {
    this.setState({
      baseScrollTop: scrollTop
    });
  }

  public getMenuContent(content) {
    this.setState({
      menuContent: content
    });
  }

  public scrollUp() {
    let scrollTop = this.state.scrollTop - SCROLL_UNIT;
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    this.setScrollTop(scrollTop);
    this.slideScroll(scrollTop);
  }

  public scrollDown() {
    const el: HTMLElement = ReactDOM.findDOMNode(this.state.menuContent) as HTMLElement;
    let scrollTop: number = this.state.scrollTop + SCROLL_UNIT;
    if (el as Element) {
      if (scrollTop > el.scrollHeight - el.offsetHeight) {
        scrollTop = el.scrollHeight - el.offsetHeight;
      }
      this.setScrollTop(scrollTop);
      this.slideScroll(scrollTop);
    }
  }

  public slideScroll(scrollTop) {
    const el: HTMLElement = ReactDOM.findDOMNode(this.state.menuContent) as HTMLElement;
    if (el) {
      const time = setInterval(() => {
        if (el.scrollTop < scrollTop) {
          el.scrollTop += 40;
        } else if (el.scrollTop === scrollTop) {
          clearInterval(time);
        } else if (el.scrollTop > scrollTop) {
          el.scrollTop -= 40;
        }
      }, 5);
    }
  }

  public handleCheck(command, checked) {
    const checkItem = this.state.checkItem;
    if (checked) {
      checkItem.push(command);
    } else {
      checkItem.splice(_.indexOf(command), 1);
    }
    this.setState({
      checkItem
    });

    if (this.props.onCheck) {
      this.props.onCheck(checkItem);
    }
  }

  public render() {
    const { className, children, style } = this.props;
    const { overflowBottom, overflowTop, scrollTop, selected } = this.state;

    const menuClasses = cx('u-menu', className, {
      'pdb-change': overflowBottom,
      'pdt-change': overflowTop
    });

    const childrenWithProps = React.Children.map(children, (child: ReactElement<any>, index) => {
      if (!child) {
        return null;
      }

      return React.cloneElement(
        child as ReactElement<any>,
        Object.assign({}, child.props, {
          selected
        })
      );
    });

    return (
      <div className={menuClasses} style={style}>
        {overflowTop && (
          <div className={cx('handle-top')} onClick={this.scrollUp}>
            <Icon name="chevron-up" />
          </div>
        )}
        <MenuContent scrollTop={scrollTop} ref={this.getMenuContent}>
          {childrenWithProps}
        </MenuContent>
        {overflowBottom && (
          <div className={cx('handle-bottom')} onClick={this.scrollDown}>
            <Icon name="chevron-down" />
          </div>
        )}
      </div>
    );
  }
}
