import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';

const cx = classNames.bind(style);

export interface SelectOptionProps {
  title: string;
  subtitle?: string;
  filterBy?: string[];
  displayBy?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  hover?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  [propName: string]: any;
}

export default class Option extends React.Component<SelectOptionProps> {
  public render(): React.ReactNode {
    const { title, subtitle, before, after, hover, disabled, onClick, className } = this.props;
    const optionClassName = cx({
      'option--before': !!before,
      'option--after': !!after,
      'option--hover': hover,
      'option--disabled': disabled
    });

    return (
      <div className={cx('option', optionClassName, className)} title={title} onClick={onClick}>
        {before}
        {title}
        {subtitle && <span className={cx('Option-subtitle')}>（{subtitle}）</span>}
        {after}
      </div>
    );
  }
}
