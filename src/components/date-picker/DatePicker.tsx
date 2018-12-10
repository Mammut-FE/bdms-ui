import cn from 'classnames';
import cnb from 'classnames/bind';
import dateFormat from 'date-fns/format';
import * as React from 'react';
import { clampDateDay } from '../../lib/datetime';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import DropdownTrigger from '../helpers/DropdownTrigger';
import { Icon } from '../icon';
import { Input } from '../input';
import { InputProps } from '../input/Input';
import styles from './date-picker.scss';
import DateRangePicker from './DateRangePicker';
import DateTime, { DateTimeMixins } from './DateTime';

const cx = cnb.bind(styles)

export interface DatePickerProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'min' | 'max'>, DateTimeMixins {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  format?: string | ((date: Date) => string)
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

  public fireChange = (value?) => this.props.onChange && this.props.onChange(value)

  public onChange = (time: Date) => {
    time = clampDateDay(time, this.props.max, this.props.min)
    // 只对日期进行修正，对时间不限制
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
        showToday={this.props.showToday}
        todayText={this.props.todayText}
        min={this.props.min}
        max={this.props.max}
      />
    )
  }

  public render() {
    const {
      value, showTime, format = (showTime ? defaultFormat : defaultFormatWithoutTime),
      defaultValue, onChange, todayText, showToday, min, max, className, style,
      ...inputProps
    } = this.props

    const inputValue = value ?
      typeof format === 'string' ? dateFormat(value, format) : format(value)
      : ''

    return (
      <DropdownTrigger
        shown={this.state.shown}
        onShownChange={this.onShownChange}
        dropdown={this.renderDropdown}
        dropdownClassName={cx('dropdown')}
        action={['click']}
      >
        <div className={cn(cx('host'), className)} style={style}>
          <Input
            suffix={<Icon name="calendar" className={cx('input-icon')}/>}
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
