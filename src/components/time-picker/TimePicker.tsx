import cn from 'classnames';

import cnb from 'classnames/bind';
import * as React from 'react';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import DropdownTrigger from '../helpers/DropdownTrigger';
import { Icon } from '../icon';
import { Input } from '../input';
import { InputProps } from '../input/Input';
import styles from './time-picker.scss';
import TimePickerDropdown, { TimePickerDropdownProps } from './TimePickerDropdown';

const cx = cnb.bind(styles)

export interface TimePickerProps extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue' | 'onBlur'> {
  value?: Date
  onChange?: (time?: Date) => void
  defaultValue?: Date
  onBlur?: () => void
  renderDropdown?: (props: TimePickerDropdownProps) => React.ReactNode
  /**
   * 是否居中显示内容和下拉列表
   */
  centered?: boolean
}

export interface TimePickerState {
  shown: boolean,
  value: string
}

function parseTime(time: string): Date {
  const [ hour = 0, min = 0 ] = time.split(':').map(v => parseInt(v, 10))
  const date = new Date();
  date.setHours(hour)
  date.setMinutes(min)
  return date
}

function formatTime(time: Date) {
  return `${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(-2)}`
}

function defaultRenderDropdown(props: TimePickerDropdownProps) {
  return (
    <TimePickerDropdown {...props}/>
  )
}

/**
 * 用于选择时间的输入框
 */
@Independence({
  value: {
    onChangeName: 'onChange'
  }
})
export default class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
  public state = {
    shown: false,
    value: (this.props.value && formatTime(this.props.value)) || ''
  }

  public $self = React.createRef<HTMLDivElement>()

  public componentDidUpdate(prevProps: TimePickerProps, prevState: TimePickerState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value ? formatTime(this.props.value) : ''
      })
    }
  }

  public fireChange = (value?: Date) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  public onFocus = (evt) => {
    this.setState({shown: true})
    if (this.props.onFocus) {
      this.props.onFocus(evt)
    }
  }

  public onBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
    if (evt.target !== this.$self.current) { return }
    this.setState({shown: false})
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  public toChange = (time: [number, number]) => {
    const date = new Date()
    date.setHours(time[0])
    date.setMinutes(time[1])
    this.fireChange(date)
  }

  public changeShown = (shown) => {
    this.setState({shown})
  }

  public renderDropdown = () => {
    const { renderDropdown = defaultRenderDropdown, value } = this.props
    return renderDropdown({
      time: value ? [value.getHours(), value.getMinutes()] : [0, 0],
      onClick: this.toChange
    })
  }

  public confirmValue = () => {
    const stringValue = this.state.value
    const date = parseTime(stringValue)
    this.fireChange(date)
  }

  public onInputChange = (value: string) => {
    this.setState({value})
  }

  public onInputKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.keyCode === 13) {
      // enter code
      this.confirmValue()
    }
  }

  public clearValue = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    this.fireChange()
  }

  public render() {
    const { value, defaultValue, onChange, onFocus, className, style, centered, ...restProps } = this.props
    const suffix = this.state.value ? (<Icon className={cx('reset')} name="close-circle" onClick={this.clearValue}/>) : null
    return (
      <DropdownTrigger
        shown={this.state.shown}
        onShownChange={this.changeShown}
        dropdown={this.renderDropdown}
        dropdownClassName={cx('dropdown')}
      >
        <div className={cn(cx('container', {
          'container--centered': centered
        }), className)} style={style}>
          <Input
            suffix={suffix}
            {...restProps}
            className={cx('input')}
            value={this.state.value}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyPress}
            onBlur={this.confirmValue}
          />
        </div>
      </DropdownTrigger>
    )
  }
}
