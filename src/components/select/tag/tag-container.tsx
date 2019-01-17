import * as React from 'react';
import classNames from 'classnames/bind';
import { Tag } from '../../tag';
import style from '../select.scss';
import inputStyle from '../../input/input.scss';

const cx = classNames.bind(style);
const inputCx = classNames.bind(inputStyle);

export interface SelectTagContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  value: string[];
  onRemove?: (value: string) => void;
  disabled?: boolean;
}

export default class SelectTagContainer extends React.PureComponent<SelectTagContainerProps> {
  render(): React.ReactNode {
    const { onRemove, value, disabled, children, className, ...props } = this.props;
    const containerClassName = cx(inputCx('input'), 'tag-con', className);

    return (
      <div className={containerClassName} {...props}>
        {value.map(val => (
          <Tag key={val} className={cx('tag-item')} closable={!disabled} onClose={() => onRemove!(val)}>
            {val}
          </Tag>
        ))}
        {children}
      </div>
    );
  }
}
