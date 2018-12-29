import * as React from 'react';
import classNames from 'classnames/bind';
import style from '../select.scss';
import { SelectPropsInterface } from '../select';
import SelectOption, { SelectOptionProps } from '../option';
import SelectWrap from '../wrap';
import SelectInput from '../input';
import SelectDropdown from '../dropdown';
import DropdownTrigger from '../../helpers/DropdownTrigger';
import { Independence } from '../../../lib/independence';
import { Icon } from '../../icon';

const cx = classNames.bind(style);

export interface SelectDefaultProps extends SelectPropsInterface {
  searchable?: boolean;
  [propName: string]: any;
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
  private trigger: any;

  public state = {
    keyword: '',
    shown: false,
    hoverIndex: -1
  };

  public onChange = (optionProps: SelectOptionProps) => {
    const { onChange } = this.props;

    onChange && onChange(SelectOption.getDisplayValue(optionProps), { ...optionProps });
  };

  public handleOptionClick = (optionProps: SelectOptionProps) => {
    if (optionProps.disabled) return;
    this.onChange(optionProps);
    this.setState({
      shown: false
    });
  };

  public handleInputEnter = () => {
    const { children } = this.props;
    const { hoverIndex } = this.state;

    if (!(children instanceof Array)) return;
    const child = children[hoverIndex];
    if (React.isValidElement(child)) {
      const childProps = child.props as SelectOptionProps;
      if (!childProps.disabled) {
        this.onChange(childProps);
        this.setState({
          shown: false
        });
      }
    }
  };

  public handleShownChange = (shown: boolean) => {
    this.setState({
      shown,
      keyword: '',
      hoverIndex: -1
    });
  };

  public handleHoverIndexChange = (position: number) => {
    const { children } = this.props;
    let hoverIndex = this.state.hoverIndex + position;

    if (!(children instanceof Array)) return;
    if (hoverIndex > children.length - 1) {
      hoverIndex = 0;
    }
    if (hoverIndex < 0) {
      hoverIndex = children.length - 1;
    }
    while (hoverIndex < children.length) {
      const child = children[hoverIndex];
      if (React.isValidElement(child)) {
        const childProps = child.props as SelectOptionProps;
        if (!childProps.disabled) {
          break;
        }
      }
      hoverIndex += position;
    }
    this.setState({
      hoverIndex
    });
  };

  public handleKeywordChange = (keyword: string) => this.setState({ keyword });

  public renderDropdownContent = () => {
    const { keyword, hoverIndex } = this.state;
    const { children } = this.props;
    const optionProps: SelectOptionProps[] = [];

    if (!(children instanceof Array)) return null;
    children.forEach(child => {
      if (React.isValidElement(child)) {
        const childProps = child.props as SelectOptionProps;
        const title = childProps.title;

        if (title && SelectOption.isIncluded(childProps, keyword)) {
          optionProps.push(childProps);
        }
      }
    });

    return (
      <SelectDropdown
        optionProps={optionProps}
        hoverIndex={hoverIndex}
        onOptionClick={childProps => this.handleOptionClick(childProps)}
      />
    );
  };

  public render(): React.ReactNode {
    const { shown, keyword } = this.state;
    const { value, width, icon, searchable, children, onChange, ...props } = this.props;
    const inputValue = shown && searchable ? keyword : value;

    return (
      <DropdownTrigger
        ref={ref => (this.trigger = ref)}
        action={['click']}
        shown={shown}
        dropdownClassName={cx('dropdown-wrap')}
        onShownChange={this.handleShownChange}
        dropdown={this.renderDropdownContent}
        popupStyle={{ width: width + 'px' }}
      >
        <SelectWrap before={icon} width={width} onClick={() => this.handleShownChange(true)}>
          <SelectInput
            value={inputValue}
            searchable={searchable}
            onEnter={this.handleInputEnter}
            onPosition={position => this.handleHoverIndexChange(position)}
            onChange={this.handleKeywordChange}
            {...props}
          />
          <Icon name={'caret-down'} className={cx('caret')} />
        </SelectWrap>
      </DropdownTrigger>
    );
  }
}
