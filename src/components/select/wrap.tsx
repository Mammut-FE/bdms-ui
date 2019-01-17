import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { Omit } from '../../lib/type';
import { Icon } from '../icon';

const cx = classNames.bind(style);

export interface SelectWrapProps extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'width'> {
  width?: number;
  caret?: boolean;
  before?: React.ReactNode;
}

export default class SelectWrap extends React.PureComponent<SelectWrapProps> {
  public render(): React.ReactNode {
    const { children, width, before, caret, ...props } = this.props;
    const wrapStyle = width ? { width: width + 'px' } : {};
    const wrapClass = cx('container', {
      'container--hasBefore': !!before,
      'container--hasCaret': caret
    });

    return (
      <div style={wrapStyle} className={wrapClass} {...props}>
        {before && <div className={cx('container-before')}>{before}</div>}
        {children}
        {caret && <Icon name={'caret-down'} className={cx('caret')} />}
      </div>
    );
  }
}
