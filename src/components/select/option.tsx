import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';

const cx = classNames.bind(style);

export interface SelectOptionProps {
  title: string; // 标题
  subtitle?: string; // 副标题
  filterBy?: string[]; // 过滤项，默认根据title过滤
  displayBy?: string; // 选择结果，默认点击后以title作为选择结果
  before?: React.ReactNode;
  after?: React.ReactNode;
  hover?: boolean; // hover状态
  disabled?: boolean; // 禁用
  onClick?: () => void;
  [propName: string]: any;
}

export default class Option extends React.Component<SelectOptionProps> {
  public render(): React.ReactNode {
    const { title, subtitle, before, after, hover, disabled, onClick, className } = this.props;
    const divTitle = subtitle ? `${title}（${subtitle}）` : title;
    const optionClassName = cx({
      'option--before': !!before,
      'option--after': !!after,
      'option--hover': hover,
      'option--disabled': disabled
    });

    return (
      <div className={cx('option', optionClassName, className)} title={divTitle} onClick={onClick}>
        {before}
        {title}
        {subtitle && <span className={cx('option-subtitle')}>（{subtitle}）</span>}
        {after}
      </div>
    );
  }
}
