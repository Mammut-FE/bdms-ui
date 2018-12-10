import cn from 'classnames';
import cnb from 'classnames/bind';
import { format as dateFormat, isBefore, isSameMonth, parse } from 'date-fns';
import * as React from 'react';
import { clampDateDay } from '../../lib/datetime';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import DropdownTrigger from '../helpers/DropdownTrigger';
import { Icon } from '../icon';
import { Input } from '../input';
import styles from './date-picker.scss';
import { DatePickerProps } from './DatePicker';
import DateTime from './DateTime';

const cx = cnb.bind(styles)

export interface DateRangePickerProps extends Omit<DatePickerProps, 'value' | 'defaultValue' | 'onChange' | 'format'> {
  value?: [Date, Date],
  defaultValue?: [Date, Date],
  onChange?: (range?: [Date, Date]) => void
  format?: string | ((range: [Date, Date]) => string)
}

export interface DateRangePickerState {
  shown: boolean
}

function defaultFormat(range: [Date, Date]) {
  return `${dateFormat(range[0], 'YYYY-MM-DD HH:mm')} ~ ${dateFormat(range[1], 'YYYY-MM-DD HH:mm')}`
}

function defaultFormatWithoutTime(range: [Date, Date]) {
  return `${dateFormat(range[0], 'YYYY-MM-DD')} ~ ${dateFormat(range[1], 'YYYY-MM-DD')}`
}

@Independence({
  value: {
    onChangeName: 'onChange'
  }
})
export default class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
  public state = {
    shown: false
  }

  public onShownChange = shown => this.setState({shown})

  public onRangeChange = (start, end, isStartChange) => {
    if (isBefore(end, start)) {
      if (isStartChange) {
        // 起始位置点到了终止位置后面
        end = parse(start)
      } else {
        // 终止位置点击到了起始位置前面
        start = parse(end)
      }
    }
    start = clampDateDay(start, this.props.max, this.props.min)
    end = clampDateDay(end, this.props.max, this.props.min)
    if (this.props.onChange) {
      this.props.onChange([start, end])
    }
  }

  public clear = () => {
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  public renderDropdown = () => {
    const {value: [start, end] = [new Date(), new Date()], showToday, showTime, todayText, min, max} = this.props
    const dateTimeProps = {
      showTime,
      showToday,
      todayText,
      min,
      max,
    }

    const rangeStart = start.getDate()
    const rangeEnd = end.getDate()
    const sameMonth = isSameMonth(start, end)

    return (
      <>
        <DateTime
          value={start}
          rangeStart={rangeStart}
          rangeEnd={sameMonth ? rangeEnd : void 0}
          rangeHighlight={sameMonth ? 'both' : 'start'}
          onChange={time => this.onRangeChange(time, end, true)}
          {...dateTimeProps}
        />
        <span className={cx('range-middle')}>~</span>
        <DateTime
          value={end}
          rangeStart={sameMonth ? rangeStart : void 0}
          rangeEnd={rangeEnd}
          rangeHighlight={sameMonth ? 'both' : 'end'}
          onChange={time => this.onRangeChange(start, time, false)}
          showTime={showTime}
          {...dateTimeProps}
        />
      </>
    )
  }

  public renderInputSuffix() {
    const { hideClear, value } = this.props
    const suffixIcon = <Icon name="calendar" className={cx('input-icon')}/>
    return hideClear ? suffixIcon : (
      value ? (<Icon name="close-circle" className={cx('input-icon', 'clear-icon')} onClick={this.clear}/>) : suffixIcon
    )
  }

  public render() {
    const {
      showTime, format = (showTime ? defaultFormat : defaultFormatWithoutTime), value,
      defaultValue, onChange, showToday, todayText, min, max, className, style, hideClear,
      ...inputProps
    } = this.props
    const inputValue = value ?
      typeof format === 'string' ? `${dateFormat(value[0], format)} ~ ${dateFormat(value[1], format)}` : format(value)
      : ''
    return (
      <DropdownTrigger
        shown={this.state.shown}
        onShownChange={this.onShownChange}
        dropdown={this.renderDropdown}
        dropdownClassName={cx('dropdown',  'range-dropdown')}
        action={['click']}
      >
        <div className={cn(cx('host'), className)} style={style}>
          <Input
            suffix={this.renderInputSuffix()}
            {...inputProps}
            readOnly={true}
            value={inputValue}
          />
        </div>
      </DropdownTrigger>
    )
  }
}
