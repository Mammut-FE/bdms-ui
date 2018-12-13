import React from 'react';
import styles from './demo.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export interface DemoCardProps {
  title: string;
  description: string;
  component: React.ComponentType;
}

export default class DemoCard extends React.Component<DemoCardProps> {
  public render() {
    const Component = this.props.component;
    return (
      <div className={cx('demo-card')}>
        <div className={cx('demo-area')}>
          <Component />
        </div>
        <div className={cx('demo-title')}>{this.props.title}</div>
        <div className={cx('demo-description')}>{this.props.description}</div>
      </div>
    );
  }
}
