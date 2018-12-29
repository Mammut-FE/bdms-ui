import * as React from 'react';
import classNames from 'classnames/bind';
import style from './select.scss';
import { Input } from '../input';

const cx = classNames.bind(style);

export interface SelectInputProps {
  searchable?: boolean;
  onEnter?: () => void;
  onPosition?: (position: 1 | -1) => void;
  onDelete?: () => void;
  [propName: string]: any;
}

export default class SelectInput extends React.Component<SelectInputProps> {
  public static defaultProps: Partial<SelectInputProps> = {
    searchable: false
  };
  public handleKeyDown = event => {
    const { searchable, onEnter, onPosition, onDelete, onKeyDown } = this.props;

    if (!searchable) return;
    switch (event.which) {
      case 8:
        onDelete && onDelete();
        break;
      case 13:
        onEnter && onEnter();
        break;
      case 40:
        onPosition && onPosition(1);
        break;
      case 38:
        onPosition && onPosition(-1);
        break;
      default:
        break;
    }
    onKeyDown && onKeyDown(event);
  };

  public render(): React.ReactNode {
    const { searchable, onEnter, onPosition, onDelete, onKeyDown, ...props } = this.props;
    const inputClass = cx('input', {
      'input--searchable': searchable
    });

    return <Input className={inputClass} readOnly={!searchable} onKeyDown={this.handleKeyDown} {...props} />;
  }
}
