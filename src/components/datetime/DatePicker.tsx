import './date-picker.scss'
import * as React from 'react';
import { bemClassnames } from '../../lib/classnames';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import DropdownTrigger from '../helpers/DropdownTrigger';
import { Icon } from '../icon';
import { Input } from '../input';
import { InputProps } from '../input/Input';
import DateRangePicker from './DateRangePicker';
import DateTime from './DateTime';
import dateFormat from 'date-fns/format'
import { TimePickerProps } from './TimePicker';

const bem = bemClassnames('ma-date-picker')

export interface DatePickerProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  format?: string | ((date: Date) => string)
  showTime?: boolean | TimePickerProps
}

export interface DatePickerState {
  shown: boolean
}

const defaultFormatWithoutTime = (date: Date) => date && dateFormat(date, 'YYYY-MM-DD')
const defaultFormat = (date: Date) => dateFormat(date, 'YYYY-MM-DD HH:mm')

@Independence({
  value: {
    onChangeName: 'onChange'
  }
})
export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  public static DateRangePicker: typeof DateRangePicker

  public state = {
    shown: false
  }

  public onShownChange = (shown) => this.setState({shown})

  public fireChange = (value) => this.props.onChange && this.props.onChange(value)

  public onChange = (time: Date) => {
    this.fireChange(time)
  }

  public renderDropdown = () => {
    const {value = new Date()} = this.props
    const day = value.getDate()
    return (
      <DateTime
        value={value}
        onChange={this.onChange}
        rangeHighlight="both"
        rangeStart={day}
        rangeEnd={day}
        showTime={this.props.showTime}
      />
    )
  }

  public render() {
    const { value, showTime, format = (showTime ? defaultFormat : defaultFormatWithoutTime), defaultValue, onChange, ...inputProps } = this.props

    const inputValue = value ?
      typeof format === 'string' ? dateFormat(value, format) : format(value)
      : ''

    return (
      <DropdownTrigger
        shown={this.state.shown}
        onShownChange={this.onShownChange}
        dropdown={this.renderDropdown}
        dropdownClassName={bem('dropdown')}
      >
        <div className={bem()}>
          <Input
            suffix={<Icon name="calendar" className={bem('icon')}/>}
            {...inputProps}
            readOnly={true}
            value={inputValue}
          />
        </div>
      </DropdownTrigger>
    )
  }
}

DatePicker.DateRangePicker = DateRangePicker
