import * as React from 'react';
import classNames from 'classnames/bind';
import SelectWrap from './wrap';
import SelectOption from './option';
import SelectDefault from './default';
import style from './select.scss';

const cx = classNames.bind(style);

export interface SelectProps {
  mode?: 'default' | 'tag' | 'multi';
  width?: number;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => {};
  [propName: string]: any;
}

const SelectSplit = function(): React.ReactNode {
  return <hr className={cx('split')} />;
};

export class Select extends React.Component<SelectProps> {
  public static wrap = SelectWrap;
  public static option = SelectOption;
  public static split = SelectSplit;

  public static defaultProps: Partial<SelectProps> = {
    mode: 'default'
  };

  public static Components = {
    default: SelectDefault
  };

  render(): React.ReactNode {
    const { mode, ...props } = this.props;

    return (
      <SelectWrap acceptor={Select.Components[mode || 'default']} {...props}>
        {this.props.children}
      </SelectWrap>
    );
  }
}
