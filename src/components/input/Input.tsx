import cx from 'classnames';
import * as React from 'react';
import { bemClassnames } from '../../lib/classnames';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import './input.scss'

const bem = bemClassnames('ma-input')

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
    const input = <input className={cx(bem('@', `_size-${size}`, {
      '_has-prefix': !!prefix,
      '_has-suffix': !!suffix,
    }), className)} type="text" value={value} {...restProps} onChange={this.onChange}/>
    if (needWrapper) {
      return (
        <span className={bem('wrapper')}>
          {prefix ? (<span className={bem('prefix')}>{prefix}</span>) : null}
          {input}
          {suffix ? (<span className={bem('suffix')}>{suffix}</span>) : null}
        </span>
      )
    } else {
      return input
    }
  }
}
