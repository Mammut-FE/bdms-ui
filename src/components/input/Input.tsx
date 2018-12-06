import cn from 'classnames/bind';
import * as React from 'react';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import styles from './input.scss'

const cx = cn.bind(styles)

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix' | 'size'> {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: 'normal' | 'small' | 'large' | string
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
    const {value, className, prefix, suffix, size = 'normal', ...restProps} = this.props
    const needWrapper = !!(prefix || suffix)
    const input = <input className={cx('input', `input--size-${size}`, {
      'input--has-prefix': !!prefix,
      'input--has-suffix': !!suffix,
    }, className)} type="text" value={value} {...restProps} onChange={this.onChange}/>
    if (needWrapper) {
      return (
        <span className={cx('wrapper')}>
          {prefix ? (<span className={cx('prefix')}>{prefix}</span>) : null}
          {input}
          {suffix ? (<span className={cx('suffix')}>{suffix}</span>) : null}
        </span>
      )
    } else {
      return input
    }
  }
}
