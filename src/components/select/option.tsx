import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';

const cx = classNames.bind(style);

export interface SelectOptionProps {
  title?: string;
  subtitle?: string;
  filterBy?: string | string[];
  displayBy?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  [propName: string]: any;
}

export default class Option extends React.Component<SelectOptionProps> {
  render(): React.ReactNode {
    const { title, subtitle, before, after, ...props } = this.props;
    const optionClassName = cx({
      option_before: !!before,
      option_after: !!after
    });

    return (
      <div className={cx('option', optionClassName)} {...props}>
        {before}
        {title}
        {subtitle && <span className={cx('subtitle')}>（{subtitle}）</span>}
        {after}
      </div>
    );
  }
}
