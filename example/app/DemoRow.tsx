import * as React from 'react';
import styles from './demo.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export default function DemoRow({ children, className, ...restProps }: any) {
  return (
    <div {...restProps} className={cx('demo-row', className)}>
      {children}
    </div>
  );
}
