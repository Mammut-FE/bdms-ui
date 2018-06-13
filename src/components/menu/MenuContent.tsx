import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import menuClass from './menu.scss';

import classNames from 'classnames/bind';

import MixinComponent from './MixinComponent';

interface IMenuContentProps {
  className?: string;
  children?: any[] | ReactNode;
  scrollTop?: number;
}
interface IMenuContentState {
  scrollTop: number;
}

const cx = classNames.bind(menuClass);

export default class MenuContent extends MixinComponent {
  public readonly state: IMenuContentState = {
    scrollTop: 0
  };
  constructor(props: IMenuContentProps) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  public componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.scrollControl(el);
  }

  public scrollControl(el) {
    const parent = this.parent();
    if (el.offsetHeight < el.scrollHeight) {
      parent.overflowBottomControl(true);
    } else {
      parent.overflowBottomControl(false);
    }

    if (el.scrollTop === el.scrollHeight - el.offsetHeight) {
      parent.overflowBottomControl(false);
    }

    if (el.scrollTop > 0) {
      parent.overflowTopControl(true);
    } else {
      parent.overflowTopControl(false);
    }
  }

  public handleScroll(e) {
    const el = ReactDOM.findDOMNode(this);
    const parent = this.parent();
    this.scrollControl(el);
    parent.setScrollTop(el.scrollTop);
  }

  /**
   * 防止下拉到最低端时页面也随之滚动
   * @param {domEvent} e wheel事件
   */
  public handleWheel(e) {
    const deltaY = e.deltaY;
    const el = ReactDOM.findDOMNode(this);
    if (deltaY > 0 && el.scrollTop === el.scrollHeight - el.offsetHeight) {
      e.preventDefault();
    }
  }

  public render() {
    const { className, children } = this.props;

    const contentClasses = cx('content', className);

    return (
      <div className={contentClasses} onScroll={this.handleScroll} onWheel={this.handleWheel}>
        {children}
      </div>
    );
  }
}
