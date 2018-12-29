import React, { CSSProperties } from 'react';

import classNames from 'classnames/bind';
import styles from './notice.scss';

export interface INoticeProps {
  id?: string;
  duration?: number;
  type?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  closable?: boolean;
  isNotice?: boolean;
  onClose?: () => void;
}

const cx = classNames.bind(styles);

export default class Notice extends React.Component<INoticeProps, {}> {
  public static defaultProps: Partial<INoticeProps> = {
    type: 'warning',
    duration: 2000,
    closable: false,
    isNotice: false
  };

  private closeTimer: any = null;

  constructor(props: INoticeProps) {
    super(props);
    this.close = this.close.bind(this);
  }

  public componentDidMount() {
    const duration = this.props.duration;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration);
    }
  }

  public componentWillUnmount() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  public render() {
    const { type, title = '', content = '', icon, className, style, closable, isNotice } = this.props;

    const classes = cx('u-notice', className, {
      [`u-notice-${type}`]: true,
      ['u-notice-notification']: isNotice
    });

    const iconName = type ? type === 'success' ? 'ok' : (type === 'info' ? 'waiting' : type) : null;
    const iconNode = icon ? icon : iconName ? (
      <i className={cx(isNotice ? 'i-notification' : 'i-notice') + ' icon-' + iconName} />
    ) : null;

    const closeNode = isNotice && closable ? (
      <i className={cx('i-close') + ' icon-close'} onClick={this.close} />
    ) : null;

    return isNotice ? (
      <div className={classes} style={style}>
        {iconNode}
        <div className={cx('u-notice-title')}>{title}</div>
        {closeNode}
        <div className={cx('u-notice-desc')}>{content}</div>
      </div>
    ) : (
        <div className={classes} style={style}>
          {iconNode}
          <span>{content}</span>
        </div>
      );
  }

  private close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}
