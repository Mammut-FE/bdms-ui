import * as React from 'react';
import classNames from 'classnames/bind';
import childrenToArray from 'rc-util/lib/Children/toArray';
import style from '../select.scss';
import { SelectPropsInterface } from '../select';
import { SelectOptionProps } from '../option';
import SelectSplit from '../split';
import SelectWrap from '../wrap';
import SelectInput, { SelectInputProps } from '../input';
import SelectDropdown from '../dropdown';
import { getSelectOptionDisplayValue } from '../util';
import DropdownTrigger from '../../helpers/DropdownTrigger';
import SelectMultiOption from './multi-option';
import { Independence } from '../../../lib/independence';

const cx = classNames.bind(style);

export interface SelectMultiProps extends SelectPropsInterface {
  searchable?: boolean;
  value?: string[];
  defaultValue?: string[];
  displayParser?: (value: string[]) => string;
  displayRender?: (SelectInput: React.ReactElement<SelectInputProps>) => React.ReactNode;
  showAllSelect?: boolean;
  onChange?: (value: string[], selected: SelectOptionProps[], action: 'select' | 'deselect') => void;
}

export interface SelectMultiState {
  keyword: string;
  shown: boolean;
  hoverIndex: number;
}

@Independence({
  value: {
    defaultValue: [],
    onChangeName: 'onChange'
  }
})
export default class SelectMulti extends React.Component<SelectMultiProps, SelectMultiState> {
  public state = {
    keyword: '',
    shown: false,
    hoverIndex: -1
  };

  public static defaultProps: Partial<SelectMultiProps> = {
    displayParser: value => `已选${value.length}项`,
    displayRender: SelectInput => SelectInput
  };

  private isAllSelected = (options: React.ReactElement<SelectOptionProps>[], value: string[]) => {
    return options.filter(child => !child.props.disabled).length === value.length;
  };

  public onChange = (action: 'select' | 'deselect', target: string[]) => {
    const { onChange, value, children } = this.props;
    const newValue = [...value!];
    const selected: SelectOptionProps[] = [];

    if (action === 'select') {
      React.Children.forEach(children, (child: React.ReactElement<SelectOptionProps>) => {
        const childProps = child.props;
        const displayValue = getSelectOptionDisplayValue(childProps);
        const valueIndex = newValue.indexOf(displayValue);

        if (valueIndex < 0) {
          if (target.indexOf(displayValue) > -1) {
            newValue.push(displayValue);
            selected.push(childProps);
          }
        } else {
          selected.push(childProps);
        }
      });
    } else {
      React.Children.forEach(children, (child: React.ReactElement<SelectOptionProps>) => {
        const childProps = child.props;
        const displayValue = getSelectOptionDisplayValue(childProps);
        const valueIndex = newValue.indexOf(displayValue);

        if (valueIndex > -1) {
          if (target.indexOf(displayValue) < 0) {
            selected.push(childProps);
          } else {
            newValue.splice(valueIndex, 1);
          }
        }
      });
    }
    onChange && onChange(newValue, selected, action);
  };

  public handleOptionSelect = (optionProps: SelectOptionProps) => {
    const { value } = this.props;
    const displayValue = getSelectOptionDisplayValue(optionProps);

    if (optionProps.disabled || !this.state.shown) return;
    if (optionProps.role === 'allSelect') {
      this.handleAllSelect();
      return;
    }
    if (value!.indexOf(displayValue) > -1) {
      this.onChange('deselect', [displayValue]);
    } else {
      this.onChange('select', [displayValue]);
    }
  };

  public handleAllSelect = () => {
    const { children, value, onChange } = this.props;
    const target: string[] = [];

    if (onChange && children) {
      React.Children.forEach(children, (child: React.ReactElement<SelectOptionProps>) => {
        const childProps = child.props as SelectOptionProps;

        if (!childProps.disabled) target.push(getSelectOptionDisplayValue(childProps));
      });
      if (this.isAllSelected(children, value!)) {
        this.onChange('deselect', target);
      } else {
        this.onChange('select', target);
      }
    }
  };

  public handleShownChange = (shown: boolean) => {
    const { onShownChange } = this.props;

    onShownChange && onShownChange(shown);
    this.setState({
      shown,
      keyword: '',
      hoverIndex: -1
    });
  };

  public handleKeywordChange = (keyword: string) => {
    this.setState({
      keyword,
      hoverIndex: -1
    });
  };

  public handleHoverIndexChange = hoverIndex => this.setState({ hoverIndex });

  public render(): React.ReactNode {
    const { shown, keyword, hoverIndex } = this.state;
    const {
      value,
      defaultValue,
      width,
      icon,
      searchable,
      showAllSelect,
      hideCaret,
      children,
      onChange,
      onShownChange,
      displayParser,
      displayRender,
      dropdownRender,
      placeholder,
      popupProps,
      ...props
    } = this.props;
    const childrenArray = childrenToArray(children);
    const placementValue = value && value.length ? displayParser!(value!) : '';
    const placeholderValue = shown && value && value.length ? placementValue : placeholder;
    const inputValue = shown && searchable ? keyword : placementValue;
    const allSelectOption = (
      <SelectMultiOption
        ignore
        title={'全选'}
        role={'allSelect'}
        selected={this.isAllSelected(childrenArray, value!)}
        onClick={this.handleAllSelect}
      />
    );
    const dropdownContent = (
      <SelectDropdown
        keyword={keyword}
        hoverIndex={hoverIndex}
        contentRender={dropdownRender}
        onOptionClick={childProps => this.handleOptionSelect(childProps)}
      >
        {showAllSelect && allSelectOption}
        {showAllSelect && <SelectSplit />}
        {childrenArray.map(child => {
          const childProps = child.props;
          return (
            <SelectMultiOption
              {...childProps}
              key={child.key}
              selected={value && value.indexOf(childProps.title) > -1}
            />
          );
        })}
      </SelectDropdown>
    );

    return (
      <DropdownTrigger
        action={['click']}
        shown={shown}
        dropdownClassName={cx('dropdown-wrap')}
        onShownChange={this.handleShownChange}
        dropdown={dropdownContent}
        popupStyle={{ width: width + 'px' }}
        popupAlign={{
          offset: [0, 4]
        }}
        {...popupProps}
      >
        <SelectWrap before={icon} caret={!hideCaret} width={width} onClick={() => this.handleShownChange(true)}>
          {displayRender!(
            <SelectInput
              value={inputValue}
              placeholder={placeholderValue}
              options={showAllSelect ? [allSelectOption, ...childrenArray] : childrenArray}
              hoverIndex={hoverIndex}
              searchable={searchable}
              onEnter={this.handleOptionSelect}
              onHoverIndexChange={this.handleHoverIndexChange}
              onChange={this.handleKeywordChange}
              {...props}
            />
          )}
        </SelectWrap>
      </DropdownTrigger>
    );
  }
}
