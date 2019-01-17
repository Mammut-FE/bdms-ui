import * as React from 'react';
import SelectMulti, { SelectMultiProps } from '../multi';
import { SelectOptionProps } from '../option';
import SelectTagContainer from './tag-container';
import { Independence } from '../../../lib/independence';

interface SelectTagProps extends SelectMultiProps {
  sortable?: boolean;
  onChange?: (value: string[], selected: SelectOptionProps[], action: 'select' | 'deselect' | 'sort') => void;
}

@Independence({
  value: {
    defaultValue: [],
    onChangeName: 'onChange'
  }
})
export default class SelectTag extends React.Component<SelectTagProps> {
  public static defaultProps: Partial<SelectTagProps> = {
    hideCaret: true
  };

  public handleTagRemove = () => {};

  public render(): React.ReactNode {
    const { displayRender, ...props } = this.props;
    const { value, disabled, icon } = props;
    const containerStyle = { paddingLeft: icon ? '28px' : 0 };

    return (
      <SelectMulti
        displayRender={SelectInput => {
          return (
            <SelectTagContainer
              value={value!}
              disabled={disabled}
              style={containerStyle}
              onRemove={this.handleTagRemove}
            >
              <SelectInput.type {...SelectInput.props} />
            </SelectTagContainer>
          );
        }}
        {...props}
      />
    );
  }
}
