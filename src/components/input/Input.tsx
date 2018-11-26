import cx from 'classnames';
import * as React from 'react';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import './input.scss'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'> {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

@Independence({
  value: {
    defaultValue: '',
    onChangeName: 'onChange',
  }
})
export class Input extends React.Component<InputProps> {
  public onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  public render() {
    const {value, className, prefix, suffix, ...restProps} = this.props
    const needWrapper = !!(prefix || suffix)
    const input = <input className={cx('ma-input', {
      'ma-input_has_prefix': !!prefix,
      'ma-input_has_suffix': !!suffix
    }, className)} type="text" value={value} {...restProps} onChange={this.onChange}/>
    if (needWrapper) {
      return (
        <span className="ma-input__wrapper">
          {prefix ? (<span className="ma-input__prefix">{prefix}</span>) : null}
          {input}
          {suffix ? (<span className="ma-input__suffix">{suffix}</span>) : null}
        </span>
      )
    } else {
      return input
    }
  }
}
