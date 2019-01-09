import React from 'react';
import styles from './button.scss';
import classNames from 'classnames/bind';

import { ButtonSize } from './button';

export interface ButtonGroupProps {
  size?: ButtonSize;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const cx = classNames.bind(styles);

export const ButtonGroup = (props: ButtonGroupProps) => {
  const { size = 'normal' } = props;
  const classes = cx('button-group', {
    [`button-group-${size}`]: size
  });
  return (
    <div className={classes} style={props.style}>
      {props.children}
    </div>
  );
};
