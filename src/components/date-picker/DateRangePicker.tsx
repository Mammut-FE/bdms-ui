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
  changeAfterConfirm?: boolean
}

export interface DateRangePickerState {
  shown: boolean
  startCache?: Date
  endCache?: Date
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
    shown: false,
    startCache: this.props.value ? this.props.value[0] : new Date(),
    endCache: this.props.value ? this.props.value[1]: new Date()
  }

  public onShownChange = shown => this.setState({shown})

  public onRangeChange = (start, end, isStartChange) => {
    const { changeAfterConfirm } = this.props
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
    this.setState({
      startCache: start,
      endCache: end
    })

    if (this.props.onChange && !changeAfterConfirm) {
      this.props.onChange([start, end])
    }
  }

  public onSubmit = () => {
    const { value: [start, end] = [new Date(), new Date()], onChange } = this.props;
    const { startCache = start , endCache = end } = this.state;
    if (onChange) {
      onChange([startCache, endCache]);
    }
    this.onShownChange(false);
  }

  public clear = () => {
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  public renderDropdown = () => {
    const {value: [start, end] = [new Date(), new Date()], showToday, showTime, todayText, min, max, changeAfterConfirm} = this.props
    const { startCache = start , endCache = end } = this.state;
    const dateTimeProps = {
      showTime,
      showToday,
      todayText,
      min,
      max,
    }

    const rangeStart = startCache.getDate()
    const rangeEnd = endCache.getDate()
    const sameMonth = isSameMonth(startCache, endCache)

    return (
      <>
        <DateTime
          value={startCache}
          rangeStart={rangeStart}
          rangeEnd={sameMonth ? rangeEnd : void 0}
          rangeHighlight={sameMonth ? 'both' : 'start'}
          onChange={time => this.onRangeChange(time, endCache, true)}
          {...dateTimeProps}
        />
        <span className={cx('range-middle')}>~</span>
        <DateTime
          value={endCache}
          rangeStart={sameMonth ? rangeStart : void 0}
          rangeEnd={rangeEnd}
          rangeHighlight={sameMonth ? 'both' : 'end'}
          onChange={time => this.onRangeChange(startCache, time, false)}
          showTime={showTime}
          {...dateTimeProps}
        />
        {changeAfterConfirm && (
          <div className={cx('range-confirm-footer')}>
            <a className={cx('range-confirm-btn')} href="javascript:void(0)" onClick={this.onSubmit}>确定</a>
          </div>)
        }
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
      changeAfterConfirm,
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
