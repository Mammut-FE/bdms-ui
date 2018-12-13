import * as React from 'react';
import styles from './calendar.scss';
import cnb from 'classnames/bind';
const cx = cnb.bind(styles);

export default function CalendarDate(props: {
  disabled?: boolean; // 只是在显示上是否禁用
  isToday?: boolean;
  children: React.ReactNode;
  onClick?: () => void; // 即使是 disabled 了也可以触发
}) {
  return (
    <span
      className={cx('cube', 'date-cube', {
        'date-cube--disabled': props.disabled,
        'date-cube--today': props.isToday
      })}
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.children}
    </span>
  );
}
