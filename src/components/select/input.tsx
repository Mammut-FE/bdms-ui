import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { Input } from '../input';
import { InputProps } from '../input/Input';
import { SelectOptionProps } from './option';
import { isSelectOptionIncluded } from './util';

const cx = classNames.bind(style);

export interface SelectInputProps extends InputProps {
  searchable?: boolean;
  hoverIndex?: number;
  options?: React.ReactElement<SelectOptionProps>[];
  onEnter?: (optionProps: SelectOptionProps) => void;
  onHoverIndexChange?: (hoverIndex: number) => void;
  onDelete?: () => void;
}

export default class SelectInput extends React.Component<SelectInputProps> {
  public static defaultProps: Partial<SelectInputProps> = {
    searchable: false,
    hoverIndex: -1
  };
  /**
   * 处理键盘事件
   * @param event
   */
  public handleKeyDown = event => {
    const { searchable, onDelete, onKeyDown } = this.props;

    if (!searchable) return;
    switch (event.which) {
      case 8: // 删除键
        onDelete && onDelete();
        break;
      case 13: // 回车键
        this.handleEnter();
        break;
      case 40: // 方向键上键
        this.handleHoverIndexChange(1);
        break;
      case 38: // 方向键下键
        this.handleHoverIndexChange(-1);
        break;
      default:
        break;
    }
    onKeyDown && onKeyDown(event);
  };

  /**
   * 处理回车事件
   */
  public handleEnter() {
    const { options, hoverIndex, onEnter } = this.props;

    if (!options || hoverIndex === undefined) return;
    onEnter && onEnter(options[hoverIndex].props);
  }

  /**
   * 处理方向键事件
   * @param position
   */
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
    // 查找下一个（上一个）不为disabled的option
    while (hoverIndex < options.length && hoverIndex >= 0) {
      const childProps = options[hoverIndex].props;

      if (!childProps.disabled && isSelectOptionIncluded(childProps, value || '')) break;
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
