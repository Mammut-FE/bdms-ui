import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { Input } from '../input';
import { InputProps } from '../input/Input';
import SelectOption, { SelectOptionProps } from './option';

const cx = classNames.bind(style);

export interface SelectInputProps extends InputProps {
  searchable?: boolean;
  hoverIndex?: number;
  options?: React.ReactNode[];
  onEnter?: (optionProps: SelectOptionProps) => void;
  onHoverIndexChange?: (hoverIndex: number) => void;
  onDelete?: () => void;
}

export default class SelectInput extends React.Component<SelectInputProps> {
  public static defaultProps: Partial<SelectInputProps> = {
    searchable: false,
    hoverIndex: -1
  };
  public handleKeyDown = event => {
    const { searchable, onDelete, onKeyDown } = this.props;

    if (!searchable) return;
    switch (event.which) {
      case 8:
        onDelete && onDelete();
        break;
      case 13:
        this.handleEnter();
        break;
      case 40:
        this.handleHoverIndexChange(1);
        break;
      case 38:
        this.handleHoverIndexChange(-1);
        break;
      default:
        break;
    }
    onKeyDown && onKeyDown(event);
  };

  public handleEnter() {
    const { options, hoverIndex, onEnter } = this.props;

    if (!options || hoverIndex === undefined) return;
    const option = options[hoverIndex];
    if (React.isValidElement(option)) {
      const optionProps = option.props as SelectOptionProps;

      onEnter && onEnter(optionProps);
    }
  }

  public handleHoverIndexChange(position) {
    const { options, value, onHoverIndexChange } = this.props;
    let hoverIndex = this.props.hoverIndex + position;

    if (!options) return;
    if (hoverIndex > options.length - 1) {
      hoverIndex = 0;
    }
    if (hoverIndex < 0) {
      hoverIndex = options.length - 1;
    }
    while (hoverIndex < options.length && hoverIndex >= 0) {
      const child = options[hoverIndex];
      if (React.isValidElement(child)) {
        const childProps = child.props as SelectOptionProps;
        if (!childProps.disabled && SelectOption.isIncluded(childProps, value || '')) {
          break;
        }
      }
      hoverIndex += position;
    }
    if (hoverIndex > options.length - 1) {
      hoverIndex = 0;
    }
    onHoverIndexChange && onHoverIndexChange(hoverIndex);
  }

  public render(): React.ReactNode {
    const { searchable, onEnter, onHoverIndexChange, onDelete, onKeyDown, hoverIndex, options, ...props } = this.props;
    const inputClass = cx('input', {
      'input--searchable': searchable
    });

    return <Input className={inputClass} readOnly={!searchable} onKeyDown={this.handleKeyDown} {...props} />;
  }
}