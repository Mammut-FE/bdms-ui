import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './layout.scss';

const cx = classNames.bind(styles);

interface ISiderProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number; // 组件宽度
  maxWidth?: number; // 可拖拽的最大宽度，仅当draggable为true有效，若不存在则为560（窗口大于1280）或窗口宽-680（窗口小于1280）
  minWidth?: number; // 可拖拽的最小宽度
  draggable?: boolean;
}
interface ISiderState {
  readonly width: string | number;
}
export class Sider extends Component<ISiderProps, ISiderState> {
  public static defaultProps: Partial<ISiderProps> = {
    draggable: false,
    maxWidth: window.innerWidth >= 1280 ? 560 : window.innerWidth - 680,
    minWidth: 200,
    width: 240
  };
  public readonly state: Readonly<ISiderState> = {
    width: this.getDefaultWidth(this.props)
  };
  constructor(props: ISiderProps) {
    super(props);
    this.startDrag = this.startDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }
  public getDefaultWidth(props) {
    return props.width;
  }
  public startDrag(e) {
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.endDrag);
  }
  public onDrag(e) {
    const { maxWidth, minWidth } = this.props;
    let width = e.x;
    if (width > maxWidth!) {
      width = maxWidth;
    }
    if (width < minWidth!) {
      width = minWidth;
    }
    this.setState({
      width
    });
  }
  public endDrag(e) {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.endDrag);
  }
  public render() {
    const { className, children, style, draggable } = this.props;
    const { width } = this.state;

    const classes = cx('u-sider', className);

    const divStyle = {
      ...style,
      flex: `0 0 ${width}`,
      width: `${width}px`
    };
    return (
      <div className={classes} style={divStyle}>
        {children}
        {draggable && <div className={cx('drag-bar')} onMouseDown={this.startDrag} />}
      </div>
    );
  }
}
