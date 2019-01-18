import * as React from 'react';
import childrenToArray from 'rc-util/lib/Children/toArray';
import { SelectPropsInterface } from '../select';
import { SelectOptionProps } from '../option';
import SelectWrap from '../wrap';
import SelectInput from '../input';
import SelectDropdown from '../dropdown';
import { getSelectOptionDisplayValue } from '../util';
import DropdownTrigger from '../../helpers/DropdownTrigger';
import { Independence } from '../../../lib/independence';

export interface SelectDefaultProps extends SelectPropsInterface {
  searchable?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, selected: SelectOptionProps) => void;
}

export interface SelectDefaultState {
  keyword: string;
  shown: boolean;
  hoverIndex: number;
}

@Independence({
  value: {
    defaultValue: '',
    onChangeName: 'onChange'
  }
})
export default class SelectDefault extends React.Component<SelectDefaultProps, SelectDefaultState> {
  public state = {
    keyword: '',
    shown: false,
    hoverIndex: -1
  };

  public onChange = (optionProps: SelectOptionProps) => {
    const { onChange } = this.props;

    onChange && onChange(getSelectOptionDisplayValue(optionProps), { ...optionProps });
  };

  public handleOptionSelect = (optionProps: SelectOptionProps) => {
    if (optionProps.disabled || !this.state.shown) return;
    this.onChange(optionProps);
    this.setState({
      shown: false
    });
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
      width,
      icon,
      searchable,
      children,
      onChange,
      onShownChange,
      hideCaret,
      dropdownRender,
      placeholder,
      popupProps,
      ...props
    } = this.props;
    const childrenArray = childrenToArray(children);
    const placeholderValue = shown && value ? value : placeholder;
    const inputValue = shown && searchable ? keyword : value;
    const dropdownContent = (
      <SelectDropdown
        keyword={keyword}
        hoverIndex={hoverIndex}
        contentRender={dropdownRender}
        onOptionClick={childProps => this.handleOptionSelect(childProps)}
      >
        {childrenArray}
      </SelectDropdown>
    );

    return (
      <DropdownTrigger
        shown={shown}
        onShownChange={this.handleShownChange}
        dropdown={dropdownContent}
        popupStyle={{ width: width + 'px' }}
        {...popupProps}
      >
        <SelectWrap before={icon} caret={!hideCaret} width={width} onClick={() => this.handleShownChange(true)}>
          <SelectInput
            value={inputValue}
            placeholder={placeholderValue}
            options={childrenArray}
            hoverIndex={hoverIndex}
            searchable={searchable}
            onEnter={this.handleOptionSelect}
            onHoverIndexChange={this.handleHoverIndexChange}
            onChange={this.handleKeywordChange}
            {...props}
          />
        </SelectWrap>
      </DropdownTrigger>
    );
  }
}
