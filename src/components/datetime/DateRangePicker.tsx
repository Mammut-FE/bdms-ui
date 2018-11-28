import { isBefore, isSameMonth, parse } from 'date-fns';
import * as React from 'react';
import { bemClassnames } from '../../lib/classnames';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import DropdownTrigger from '../helpers/DropdownTrigger';
import { Icon } from '../icon';
import { Input } from '../input';
import { DatePickerProps } from './DatePicker';
import DateTime from './DateTime';
import {format as dateFormat} from 'date-fns';
import { TimePickerProps } from './TimePicker';

const bem = bemClassnames('ma-date-picker')

export interface DateRangePickerProps extends Omit<DatePickerProps, 'value' | 'defaultValue' | 'onChange' | 'format'> {
  value?: [Date, Date],
  defaultValue?: [Date, Date],
  onChange?: (range: [Date, Date]) => void
  format?: string | ((range: [Date, Date]) => string)
  showTime?: boolean | TimePickerProps
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
    if (this.props.onChange) {
      this.props.onChange([start, end])
    }
  }

  public renderDropdown = () => {
    const {value: [start, end] = [new Date(), new Date()]} = this.props

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
          showTime={this.props.showTime}
        />
        <span className={bem('range-middle')}>~</span>
        <DateTime
          value={end}
          rangeStart={sameMonth ? rangeStart : void 0}
          rangeEnd={rangeEnd}
          rangeHighlight={sameMonth ? 'both' : 'end'}
          onChange={time => this.onRangeChange(start, time, false)}
          showTime={this.props.showTime}
        />
      </>
    )
  }

  public render() {
    const { showTime, format = (showTime ? defaultFormat : defaultFormatWithoutTime), value, defaultValue, onChange, ...inputProps } = this.props
    const inputValue = value ?
      typeof format === 'string' ? `${dateFormat(value[0], format)} ~ ${dateFormat(value[1], format)}` : format(value)
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
