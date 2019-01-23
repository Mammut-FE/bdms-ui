import * as React from 'react';
import classNames from 'classnames/bind';
import SelectOption, { SelectOptionProps } from './option';
import SelectDefault, { SelectDefaultValue } from './default';
import SelectMulti, { SelectMultiValue } from './multi';
import SelectTag, { SelectTagValue } from './tag';
import { Icon } from '../icon';
import { Omit } from '../../lib/type';
import { InputProps } from '../input/Input';
import { DropdownTriggerProps } from '../helpers/DropdownTrigger';
import style from './select.scss';

const cx = classNames.bind(style);

export type SelectValue = SelectDefaultValue | SelectMultiValue | SelectTagValue;

export interface SelectPropsInterface extends Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'width'> {
  width?: number;
  disabled?: boolean;
  icon?: Icon;
  dropdownRender?: (options: React.ReactNode) => React.ReactNode;
  hideCaret?: boolean;
  children?: React.ReactElement<SelectOptionProps>[];
  onChange?: (value: SelectValue, ...args) => void;
  onShownChange?: (shown: boolean) => void;
  popupProps?: DropdownTriggerProps;
}

interface SelectProps {
  mode?: 'default' | 'multi' | 'tag';
  [propName: string]: any;
}

export class Select extends React.Component<SelectProps> {
  public static Option = SelectOption;

  public static defaultProps: Partial<SelectProps> = {
    mode: 'default',
    width: 180,
    popupProps: {
      action: ['click'],
      popupAlign: {
        offset: [0, 4]
      },
      dropdownClassName: cx('dropdown-wrap')
    }
  };

  public static Components = {
    default: SelectDefault,
    multi: SelectMulti,
    tag: SelectTag
  };

  public render(): React.ReactNode {
    const { mode, ...props } = this.props;
    const SelectComponent = Select.Components[mode!] as React.ReactType;

    return <SelectComponent {...props} />;
  }
}
