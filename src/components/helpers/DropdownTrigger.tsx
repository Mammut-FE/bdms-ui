import * as React from "react";
import { Independence } from "../../lib/independence";

import styles from './dropdown.scss'
import cn from 'classnames'
import cnb from 'classnames/bind'
const cx = cnb.bind(styles)

export interface DropdownTriggerProps {
  shown?: boolean
  onBlur?: (evt: React.FocusEvent<HTMLElement>) => void
  onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
  dropdown?: React.ReactNode | (() => React.ReactNode)
  dropdownClassName?: string
  onShownChange?: (shown: boolean) => void
}

/**
 * 下拉列表触发器，会给第一个子元素添加显示下拉列表的能力
 * 下拉列表通过 dropdown props 传入
 */
@Independence({
  shown: {
    defaultValue: false
  }
})
export default class DropdownTrigger extends React.PureComponent<DropdownTriggerProps> {
  public $component = React.createRef<HTMLElement>()
  private delayTimer: any

  public onBlur = (evt: React.FocusEvent<HTMLElement>) => {
    if (this.props.onBlur) { this.props.onBlur(evt) }
    this.clearTimer()
    if (this.props.shown) { this.delayChange(false, 10) }
  }

  public onFocus = (evt: React.FocusEvent<HTMLElement>) => {
    if (this.props.onFocus) { this.props.onFocus(evt) }
    this.clearTimer()
    if (!this.props.shown) { this.delayChange(true, 10) }
  }

  public onClick = (evt: React.MouseEvent<HTMLElement>) => {
    this.clearTimer()
    if (!this.props.shown) {
      this.delayChange(true, 10)
    }
  }

  public clearTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer)
      this.delayTimer = null
    }
  }

  public delayChange(shown: boolean, delay: number = 0) {
    if (delay) {
      this.delayTimer = setTimeout(() => this.fireChange(shown), delay)
    } else {
      this.fireChange(shown)
    }
  }

  public fireChange(shown: boolean) {
    console.log('fire', shown)
    if (this.props.onShownChange) {
      this.props.onShownChange(shown)
    }
  }

  public renderDropdown() {
    if (!this.props.dropdown) {
      return null
    }

    return (
      <div className={cn(cx('dropdown'), this.props.dropdownClassName)}>
        {typeof this.props.dropdown === 'function' ? this.props.dropdown() : this.props.dropdown}
      </div>
    )
  }

  public render() {
    const { children } = this.props

    if (typeof children !== 'object' || !children || !('props' in children)) {
      return children
    }

    return React.cloneElement(children, {
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onClick: this.onClick,
      ref: this.$component,
      tabIndex: -1,
    }, children.props.children, this.props.shown && this.renderDropdown())
  }
}
