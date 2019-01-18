import * as React from 'react';
import SelectMulti, { SelectMultiProps } from '../multi';
import { SelectOptionProps } from '../option';
import SelectTagContainer from './tag-container';
import { Independence } from '../../../lib/independence';
import { getSelectOptionDisplayValue } from '../util';

interface SelectTagProps extends SelectMultiProps {
  sortable?: boolean;
  onChange?: (value: string[], selected: SelectOptionProps[], action: 'select' | 'deselect' | 'sort') => void;
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
  public state = {
    shown: false
  };

  public static defaultProps: Partial<SelectTagProps> = {
    hideCaret: true,
    displayParser: () => ''
  };

  private getSelectedValueProps = value => {
    const { children } = this.props;
    const selected: SelectOptionProps[] = [];

    React.Children.forEach(children, (child: React.ReactElement<SelectOptionProps>) => {
      const childProps = child.props;
      const displayValue = getSelectOptionDisplayValue(childProps);

      if (value.indexOf(displayValue) > -1) selected.push(childProps);
    });

    return selected;
  };

  public handleTagRemove = val => {
    const { value, onChange } = this.props;
    const newValue = [...value!];
    const valIndex = newValue!.indexOf(val);

    if (onChange && valIndex > -1) {
      newValue.splice(valIndex, 1);
      onChange(newValue, this.getSelectedValueProps(newValue), 'deselect');
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
          ...popupProps
        }}
        onShownChange={this.handleShownChange}
        displayRender={SelectInput => {
          return (
            <SelectTagContainer
              value={value!}
              disabled={disabled}
              focused={shown}
              style={containerStyle}
              onTagRemove={this.handleTagRemove}
            >
              <SelectInput.type {...SelectInput.props} />
            </SelectTagContainer>
          );
        }}
      />
    );
  }
}
