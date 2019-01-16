import * as React from 'react';
import SelectOption, { SelectOptionProps } from './option';
import SelectDefault from './default';
import SelectMulti from './multi';
import { Icon } from '../icon';
import { Omit } from '../../lib/type';
import { InputProps } from '../input/Input';

export interface SelectPropsInterface extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'width'> {
  width?: number;
  disabled?: boolean;
  icon?: Icon;
  dropdownRender?: (options: React.ReactNode) => React.ReactNode;
  children?: React.ReactElement<SelectOptionProps>[];
  onChange?: (value: string | string[], ...args) => void;
}

interface SelectProps {
  mode?: 'default' | 'tag' | 'multi';
  [propName: string]: any;
}

export class Select extends React.Component<SelectProps> {
  public static Option = SelectOption;

  public static defaultProps: Partial<SelectProps> = {
    mode: 'default',
    width: 180
  };

  public static Components = {
    default: SelectDefault,
    multi: SelectMulti
  };

  public render(): React.ReactNode {
    const { mode, ...props } = this.props;
    const SelectComponent = Select.Components[mode!];

    return <SelectComponent {...props} />;
  }
}
