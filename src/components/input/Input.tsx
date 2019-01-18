import cn from 'classnames';
import cnb from 'classnames/bind';
import * as React from 'react';
import { Independence } from '../../lib/independence';
import { Omit } from '../../lib/type';
import styles from './input.scss';

const cx = cnb.bind(styles);

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix' | 'size'> {
  /**
   * 文本值
   */
  value?: string;
  /**
   * 变化事件
   * @param value 文本值
   */
  onChange?: (value: string) => void;
  /**
   * 默认值，只有当 `value` 不存在时生效
   */
  defaultValue?: string;
  /**
   * 输入框前置显示内容
   */
  prefix?: React.ReactNode;
  /**
   * 输入框后置显示内容
   */
  suffix?: React.ReactNode;
  /**
   * 输入框大小
   * @default 'normal'
   */
  size?: 'normal' | 'small' | 'large' | string;
}

/**
 * 文本输入框，属性继承自 HTMLInputElement，只显示专属属性。
 */
@Independence({
  value: {
    defaultValue: '',
    onChangeName: 'onChange'
  }
})
export class Input extends React.Component<InputProps> {
  public onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  };

  public render() {
    const { value, className, prefix, suffix, size = 'normal', ...restProps } = this.props;
    const needWrapper = !!(prefix || suffix);
    const input = (
      <input
        className={cx('input', `input--size-${size}`, {
          'input--has-prefix': !!prefix,
          'input--has-suffix': !!suffix
        })}
        type="text"
        value={value}
        {...restProps}
        onChange={this.onChange}
      />
    );
    if (needWrapper) {
      return (
        <span className={cn(cx('wrapper'), className)}>
          {prefix ? <span className={cx('prefix')}>{prefix}</span> : null}
          {input}
          {suffix ? <span className={cx('suffix')}>{suffix}</span> : null}
        </span>
      );
    } else {
      return React.cloneElement(input, {
        className: cn(input.props.className, className)
      });
    }
  }
}
