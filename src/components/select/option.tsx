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
  [propName: string]: any;
}

export default class Option extends React.Component<SelectOptionProps> {
  static isIncluded = (optionProps: SelectOptionProps, keyword: string): boolean => {
    if (optionProps.filterBy) {
      return optionProps.filterBy.some(f => {
        return f.includes(keyword);
      });
    } else {
      return optionProps.title.includes(keyword);
    }
  };

  static getDisplayValue = (optionProps: SelectOptionProps): string => {
    return optionProps.displayBy || optionProps.title;
  };

  public render(): React.ReactNode {
    const { title, subtitle, before, after, hover, disabled, ...props } = this.props;
    const optionClassName = cx({
      'option--before': !!before,
      'option--after': !!after,
      'option--hover': hover,
      'option--disabled': disabled
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
