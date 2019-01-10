import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { Omit } from '../../lib/type';

const cx = classNames.bind(style);

export interface SelectWrapProps extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'width'> {
  width?: number;
  before?: React.ReactNode;
}

export default class SelectWrap extends React.PureComponent<SelectWrapProps> {
  public render(): React.ReactNode {
    const { children, width, before, ...props } = this.props;
    const wrapStyle = width ? { width: width + 'px' } : {};
    const wrapClass = cx('container', {
      'container--hasBefore': !!before
    });

    return (
      <div style={wrapStyle} className={wrapClass} {...props}>
        {before && <div className={cx('container-before')}>{before}</div>}
        {children}
      </div>
    );
  }
}
