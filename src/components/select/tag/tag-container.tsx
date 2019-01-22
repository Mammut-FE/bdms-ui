import * as React from 'react';
import classNames from 'classnames/bind';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Tag } from '../../tag';
import style from '../select.scss';
import inputStyle from '../../input/input.scss';
import { SelectTagValue } from './index';

const cx = classNames.bind(style);
const inputCx = classNames.bind(inputStyle);

export interface SelectTagContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  value: SelectTagValue;
  onTagRemove?: (value: string) => void;
  onSort?: (value: SelectTagValue) => void;
  disabled?: boolean;
  focused?: boolean;
  containerRef?: (container: HTMLDivElement | null) => void;
}

interface SortableTagProps {
  value: string;
  [propName: string]: any;
}

const SortableTag = SortableElement(({ value, ...props }: SortableTagProps) => (
  <Tag className={cx('tag-item')} onClose={() => props.onClose && props.onClose(value)} {...props}>
    {value}
  </Tag>
));

interface SortableTagContainerProps {
  values: SelectTagValue;
  [propName: string]: any;
}

const SortableTagContainer = SortableContainer(({ values, children, ...props }: SortableTagContainerProps) => (
  <div className={cx('tag-list')}>
    {values.map((value, index) => (
      <SortableTag key={index} index={index} value={value} onClose={props.onClose} {...props} />
    ))}
    {children}
  </div>
));

export default class SelectTagContainer extends React.PureComponent<SelectTagContainerProps> {
  public handleTagSort = ({ oldIndex, newIndex }) => {
    const { value, onSort } = this.props;

    if (onSort && oldIndex !== newIndex) {
      onSort(arrayMove(value, oldIndex, newIndex));
    }
  };

  render(): React.ReactNode {
    const { onTagRemove, onSort, value, disabled, focused, children, className, containerRef, ...props } = this.props;
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
        <SortableTagContainer
          axis={'xy'}
          pressDelay={100}
          values={value}
          onClose={onTagRemove}
          onSortEnd={this.handleTagSort}
        >
          {children}
        </SortableTagContainer>
      </div>
    );
  }
}
