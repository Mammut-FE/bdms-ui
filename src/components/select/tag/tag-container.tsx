import * as React from 'react';
import classNames from 'classnames/bind';
import { Tag } from '../../tag';
import style from '../select.scss';
import inputStyle from '../../input/input.scss';
import { SelectTagValue } from './index';

const cx = classNames.bind(style);
const inputCx = classNames.bind(inputStyle);

export interface SelectTagContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  value: SelectTagValue;
  onTagRemove?: (value: string) => void;
  disabled?: boolean;
  focused?: boolean;
  containerRef?: (container: HTMLDivElement | null) => void;
}

export default class SelectTagContainer extends React.PureComponent<SelectTagContainerProps> {
  render(): React.ReactNode {
    const { onTagRemove, value, disabled, focused, children, className, containerRef, ...props } = this.props;
    const containerClassName = cx(
      inputCx('input'),
      'tag-con',
      {
        'tag--focused': focused
      },
      className
    );

    return (
      <div ref={containerRef} className={containerClassName} {...props}>
        {value.map(val => (
          <Tag key={val} className={cx('tag-item')} closable={!disabled} onClose={() => onTagRemove!(val)}>
            {val}
          </Tag>
        ))}
        {children}
      </div>
    );
  }
}
