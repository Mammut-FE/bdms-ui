import React, { CSSProperties } from 'react';

import classNames from 'classnames/bind';
import styles from './notice.scss';

export interface INoticeProps {
  id?: string;
  duration?: number;
  type?: string;
  title?: string;
  content?: string;
  className?: string;
  style?: CSSProperties;
  closable?: boolean;
  isnotice?: boolean;
  onClose?: () => void;
}

const cx = classNames.bind(styles);

export default class Notice extends React.Component<INoticeProps, {}> {
  public static defaultProps: Partial<INoticeProps> = {
    type: 'warning',
    duration: 2000,
    closable: false,
    isnotice: false
  };

  private closeTimer: any = null;

  public componentDidMount() {
    const duration = this.props.duration;
    duration && (this.closeTimer = setTimeout(() => {
      this.close();
    }, duration));
  }

  public componentWillUnmount() {
    this.closeTimer && clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  public render() {
    const { type, title = '', content = '', className, style, closable, isnotice } = this.props;

    const classes = cx('u-notice', className, {
      [`u-notice-${type}`]: true,
      ['u-notice-notification']: isnotice
    });

    const iconName = type ? type === 'success' ? 'ok' : (type === 'info' ? 'waiting' : type) : null;
    const IconNode = iconName ? (
      <i style={isnotice ? {
        position: 'absolute',
        fontSize: '28px',
        left: '20px',
        top: '14px'
      } : {
          fontSize: '20px',
          marginRight: '12px',
          verticalAlign: 'middle'
        }} className={'icon-' + iconName} />
    ) : null;

    const closeNode = isnotice && closable ? (
      <i style={{
        position: 'absolute',
        fontSize: '12px',
        right: '20px',
        top: '20px',
        color: '#666',
        cursor: 'pointer'
      }} className='icon-close' onClick={this.close.bind(this)} />
    ) : null;

    return isnotice ? (
      <div className={classes} style={style}>
        {IconNode}
        <div className={cx('u-notice-title')}>{title}</div>
        {closeNode}
        <div className={cx('u-notice-desc')}>{content}</div>
      </div>
    ) : (
        <div className={classes} style={style}>
          {IconNode}
          <span>{content}</span>
        </div>
      );
  }

  private close() {
    this.props.onClose && this.props.onClose();
  }
}
