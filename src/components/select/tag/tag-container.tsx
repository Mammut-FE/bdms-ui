import * as React from 'react';
import classNames from 'classnames/bind';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Tag } from '../../tag';
import { ITagProps } from '../../tag/tag';
import style from '../select.scss';
import inputStyle from '../../input/input.scss';
import { SelectTagValue } from './index';
import { Omit } from '../../../lib/type';

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

interface SortableTagProps extends ITagProps {
  value: string;
  onTagRemove?: (value: string) => void;
}

const SortableTag = SortableElement(({ value, onTagRemove, ...props }: SortableTagProps) => (
  <Tag className={cx('tag-item')} onClose={() => onTagRemove && onTagRemove(value)} {...props}>
    {value}
  </Tag>
));

interface SortableTagContainerProps extends Omit<ITagProps, 'value'> {
  values: SelectTagValue;
  onTagRemove?: (value: string) => void;
}

const SortableTagContainer = SortableContainer(({ values, children, ...props }: SortableTagContainerProps) => (
  <div className={cx('tag-list')}>
    {values.map((value, index) => (
      <SortableTag key={index} index={index} value={value} onTagRemove={props.onTagRemove} {...props} />
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

  public handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const targetClassList = target.classList;

    if (targetClassList.contains(cx('tag-list')) || targetClassList.contains(cx('tag-item'))) {
      event.stopPropagation();
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
      <div ref={containerRef} className={containerClassName} onClick={this.handleContainerClick} {...props}>
        <SortableTagContainer
          axis={'xy'}
          distance={1}
          values={value}
          onTagRemove={onTagRemove}
          onSortEnd={this.handleTagSort}
        >
          {children}
        </SortableTagContainer>
      </div>
    );
  }
}
