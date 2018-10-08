import * as React from 'react';
import { Independence } from '../../lib/independence';
import ClassNames from 'classnames/bind'
import styles from './input.scss'
import { Omit } from '../../lib/type'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}

const cx = ClassNames.bind(styles)

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
    const {value, ...restProps} = this.props
    return <input className={cx('u-input')} type="text" value={value} {...restProps} onChange={this.onChange}/>
  }
}
