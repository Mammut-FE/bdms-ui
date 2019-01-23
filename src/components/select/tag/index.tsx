import * as React from 'react';
import SelectMulti, { SelectMultiProps } from '../multi';
import { SelectOptionProps } from '../option';
import SelectTagContainer from './tag-container';
import { Independence } from '../../../lib/independence';
import { getSelectOptionDisplayValue } from '../util';

export type SelectTagValue = string[];

export type SelectTagAction = 'select' | 'deselect' | 'sort';

interface SelectTagProps extends SelectMultiProps {
  sortable?: boolean;
  onChange?: (value: SelectTagValue, selected: SelectOptionProps[], action: SelectTagAction) => void;
}

interface SelectTagState {
  shown: boolean;
}

@Independence({
  value: {
    defaultValue: [],
    onChangeName: 'onChange'
  }
})
export default class SelectTag extends React.Component<SelectTagProps, SelectTagState> {
  private container: HTMLDivElement | null;
  private popupDomNode: HTMLDivElement | null;
  public state = {
    shown: false
  };

  public static defaultProps: Partial<SelectTagProps> = {
    hideCaret: true,
    searchable: true,
    displayParser: () => ''
  };

  private getSelectedValueProps = value => {
    const { children } = this.props;
    const selected: SelectOptionProps[] = [];

    React.Children.forEach(children, (child: React.ReactElement<SelectOptionProps>) => {
      const childProps = child.props;
      const displayValue = getSelectOptionDisplayValue(childProps);
      const valueIndex = value.indexOf(displayValue);

      if (valueIndex > -1) selected[valueIndex] = childProps;
    });

    return selected;
  };

  public componentDidUpdate(prevProps, prevState) {
    const popupAlign = this.props.popupProps!.popupAlign;

    // 校正下拉框位置
    if (this.state.shown) {
      setTimeout(() => {
        if (this.container && this.popupDomNode && popupAlign) {
          this.popupDomNode.style.top = this.container.getBoundingClientRect().bottom + popupAlign.offset[1] + 'px';
        }
      }, 150);
    }
  }

  public handleTagRemove = val => {
    const { value, onChange } = this.props;
    const newValue = [...value!];
    const valIndex = newValue!.indexOf(val);

    if (onChange && valIndex > -1) {
      newValue.splice(valIndex, 1);
      onChange(newValue, this.getSelectedValueProps(newValue), 'deselect');
    }
  };

  public handleTagSort = (value: SelectTagValue) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value, this.getSelectedValueProps(value), 'sort');
    }
  };

  public handleShownChange = shown => {
    const { onShownChange } = this.props;

    onShownChange && onShownChange(shown);
    this.setState({ shown });
  };

  public render(): React.ReactNode {
    const { shown } = this.state;
    const { placeholder, popupProps, ...props } = this.props;
    const { value, disabled, icon } = props;
    const containerStyle = { paddingLeft: icon ? '28px' : 0 };
    const placeholderValue = value!.length ? '' : placeholder;

    return (
      <SelectMulti
        {...props}
        placeholder={placeholderValue}
        popupProps={{
          onPopupAlign: popupDomNode => (this.popupDomNode = popupDomNode),
          ...popupProps
        }}
        onShownChange={this.handleShownChange}
        displayRender={SelectInput => {
          return (
            <SelectTagContainer
              containerRef={ref => (this.container = ref)}
              value={value!}
              disabled={disabled}
              focused={shown}
              style={containerStyle}
              onTagRemove={this.handleTagRemove}
              onSort={this.handleTagSort}
            >
              {SelectInput}
            </SelectTagContainer>
          );
        }}
      />
    );
  }
}
