import React, { MouseEvent, CSSProperties } from 'react';
import { Icon } from '../icon';
import Animate from 'rc-animate';

import styles from './backTop.scss';
import classNames from 'classnames/bind';

import { smoothScroll } from '../../lib/util';

interface IBackTopProps {
  target?: () => HTMLElement | null;
  visibilityHeight?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: CSSProperties;
}

interface IBackTopState {
  readonly visible: boolean;
}

const cx = classNames.bind(styles);

export class BackTop extends React.Component<IBackTopProps, IBackTopState> {
  public static defaultProps = {
    visibilityHeight: 200
  };

  public readonly state: Readonly<IBackTopState> = {
    visible: false
  };

  private targetDom: HTMLElement;

  constructor(props: IBackTopProps) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  public render() {
    const { className, style, children } = this.props;

    const iconNode = (
      <div className={cx('back-top-icon')}>
        <Icon name="top" />
      </div>
    );

    const classes = cx('back-top', className);

    const btnNode = this.state.visible ? (
      <div className={classes} style={style} onClick={this.scrollToTop}>
        {children || iconNode}
      </div>
    ) : null;

    return (
      <Animate transitionName={cx('back-top-fade')}>{btnNode}</Animate>
    );
  }

  public componentDidMount() {
    this.targetDom = this.getTarget();
    this.targetDom.addEventListener('scroll', this.handleScroll);
  }

  public componentWillUnmount() {
    this.targetDom.removeEventListener('scroll', this.handleScroll);
  }

  private scrollToTop(e: MouseEvent<HTMLDivElement>) {
    smoothScroll(this.targetDom, 0);
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  private getTarget() {
    let target: HTMLElement | null = null;
    if (this.props.target && typeof this.props.target === 'function') {
      target = this.props.target();
    }
    return target || document.body;
  }

  private handleScroll() {
    const scrollTop = this.targetDom.scrollTop;
    this.setState({
      visible: scrollTop > (this.props.visibilityHeight || 200)
    });
  }
}
