import React, { Component, ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from './menu.scss';
import Icon from '../icon';

const MAX_HEIGHT = 458;
const SCROLL_UNIT = 100;

const cx = classNames.bind(styles);

interface IMenuWrapProps {
  mode?: 'horizontal' | 'vertical' | 'inline';
  className?: string;
  scrollUnit?: number;
  multiple?: boolean; // 是否多选
  isTick?: boolean; // 是否是打钩选中
  selected?: string | string[]; // 初始化选中的项目
  onSelect?: (selected: string | string[]) => void; // 外部通过这个函数获取选中的value值
}

interface IMenuWrapState {
  readonly showTopOverflow: boolean; // 出现向上滚动控制条
  readonly showBottomOverflow: boolean; // 出现向下滚动控制条
}

export default class MenuWrap extends Component<IMenuWrapProps, IMenuWrapState> {
  public static defaultProps: Partial<IMenuWrapProps> = {
    mode: 'vertical',
    multiple: false,
    isTick: false,
    scrollUnit: SCROLL_UNIT
  };
  public readonly state: Readonly<IMenuWrapState> = {
    showBottomOverflow: false,
    showTopOverflow: false
  };
  public menuContentDom: React.RefObject<any> = React.createRef<any>();
  public isRootMenu = false;
  constructor(props: IMenuWrapProps) {
    super(props);
    this.scroll = this.scroll.bind(this);
    this.wheel = this.wheel.bind(this);
    this.clickScrollUp = this.clickScrollUp.bind(this);
    this.clickScrollBottom = this.clickScrollBottom.bind(this);
  }
  public componentDidMount() {
    const contentDom = this.menuContentDom.current;
    if (contentDom.scrollHeight > MAX_HEIGHT) {
      this.toggleBottomOverflow(true);
    }
  }
  public toggleBottomOverflow(showBottomOverflow) {
    this.setState({
      showBottomOverflow
    });
  }
  public toggleTopOverflow(showTopOverflow) {
    this.setState({
      showTopOverflow
    });
  }
  public scroll(e) {
    const el = this.menuContentDom.current;
    this.scrollControl(el);
  }
  public scrollControl(el) {
    if (el.offsetHeight < el.scrollHeight) {
      this.toggleBottomOverflow(true);
    } else {
      this.toggleBottomOverflow(false);
    }

    if (el.scrollTop === el.scrollHeight - el.offsetHeight) {
      this.toggleBottomOverflow(false);
    }

    if (el.scrollTop > 0) {
      this.toggleTopOverflow(true);
    } else {
      this.toggleTopOverflow(false);
    }
  }

  public clickScrollUp(e) {
    const { scrollUnit } = this.props;
    const el = this.menuContentDom.current;
    let scrollTop = el.scrollTop;
    scrollTop -= scrollUnit!;
    el.scrollTop = scrollTop;
  }
  public clickScrollBottom(e) {
    const { scrollUnit } = this.props;
    const el = this.menuContentDom.current;
    let scrollTop = el.scrollTop;
    scrollTop += scrollUnit!;
    el.scrollTop = scrollTop;
  }

  /**
   * 防止下拉到最低端时页面也随之滚动
   * @param {domEvent} e wheel事件
   */
  public wheel(e) {
    const deltaY = e.deltaY;
    const el = this.menuContentDom.current;
    if (deltaY > 0 && el.scrollTop === el.scrollHeight - el.offsetHeight) {
      e.preventDefault();
    }
  }
  public render() {
    const { className, children } = this.props;
    const { showBottomOverflow, showTopOverflow } = this.state;
    const menuWrapClasses = cx('u-menu', className);
    return (
      <div className={menuWrapClasses}>
        {showTopOverflow && (
          <div className={cx('handle-top')} onClick={this.clickScrollUp}>
            <Icon name="chevron-up" />
          </div>
        )}
        <div className={cx('content')} ref={this.menuContentDom} onScroll={this.scroll} onWheel={this.wheel}>
          {React.Children.map(children, (child: ReactElement<any>) => {
            return React.cloneElement(child);
          })}
        </div>
        {showBottomOverflow && (
          <div className={cx('handle-bottom')} onClick={this.clickScrollBottom}>
            <Icon name="chevron-down" />
          </div>
        )}
      </div>
    );
  }
}
