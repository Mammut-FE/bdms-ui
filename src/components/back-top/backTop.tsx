import React, { MouseEvent } from 'react';
import { Icon } from '../icon';

import styles from './backTop.scss';
import classNames from 'classnames/bind';

interface IBackTopProps {
  target?: () => HTMLElement | null;
  visibilityHeight?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  className?: string;
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
    const { className, children } = this.props;

    const iconNode = (
      <div className={cx('back-top-icon')}>
        <Icon name="top" />
      </div>
    );

    const classes = cx('back-top', className, {
      ['back-top-hide']: !this.state.visible
    });

    return (
      <div className={classes} onClick={this.scrollToTop}>
        {children || iconNode}
      </div>
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
    this.targetDom.scrollTop = 0;
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
