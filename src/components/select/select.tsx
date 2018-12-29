import * as React from 'react';
import SelectOption, { SelectOptionProps } from './option';
import SelectDefault from './default';
import { Icon } from '../icon';

export interface SelectPropsInterface {
  width?: number;
  icon?: Icon;
  onChange?: (value: any, optionProps: SelectOptionProps) => void;
}

interface SelectProps {
  mode?: 'default' | 'tag' | 'multi';
  [propName: string]: any;
}

export class Select extends React.Component<SelectProps> {
  public static option = SelectOption;

  public static defaultProps: Partial<SelectProps> = {
    mode: 'default',
    width: 180
  };

  public static Components = {
    default: SelectDefault
  };

  public render(): React.ReactNode {
    const { mode, ...props } = this.props;
    const SelectComponent = Select.Components[mode!];

    return <SelectComponent {...props} />;
  }
}
