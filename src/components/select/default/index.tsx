import * as React from 'react';
import classNames from 'classnames/bind';
import childrenToArray from 'rc-util/lib/Children/toArray';
import style from '../select.scss';
import { SelectPropsInterface } from '../select';
import { SelectOptionProps } from '../option';
import SelectWrap from '../wrap';
import SelectInput from '../input';
import SelectDropdown from '../dropdown';
import { getSelectOptionDisplayValue } from '../util';
import DropdownTrigger from '../../helpers/DropdownTrigger';
import SelectSelectableOption from './selectable-option';
import { Independence } from '../../../lib/independence';
import { Icon } from '../../icon';

const cx = classNames.bind(style);

export interface SelectDefaultProps extends SelectPropsInterface {
  searchable?: boolean;
  selectable?: boolean;
  value?: string;
  defaultValue?: string;
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
    const { value, width, icon, searchable, selectable, children, onChange, dropdownRender, ...props } = this.props;
    const childrenArray = childrenToArray(children);
    const inputValue = shown && searchable ? keyword : value;
    const dropdownContent = (
      <SelectDropdown
        keyword={keyword}
        hoverIndex={hoverIndex}
        contentRender={dropdownRender}
        onOptionClick={childProps => this.handleOptionSelect(childProps)}
      >
        {selectable
          ? childrenArray.map(child => {
              const childProps = child.props;
              return <SelectSelectableOption key={child.key} selected={value === childProps.title} {...childProps} />;
            })
          : childrenArray}
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
      >
        <SelectWrap before={icon} width={width} onClick={() => this.handleShownChange(true)}>
          <SelectInput
            value={inputValue}
            options={childrenArray}
            hoverIndex={hoverIndex}
            searchable={searchable}
            onEnter={this.handleOptionSelect}
            onHoverIndexChange={this.handleHoverIndexChange}
            onChange={this.handleKeywordChange}
            {...props}
          />
          <Icon name={'caret-down'} className={cx('caret')} />
        </SelectWrap>
      </DropdownTrigger>
    );
  }
}
