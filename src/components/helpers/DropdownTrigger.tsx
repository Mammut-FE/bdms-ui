import './dropdown.scss'
import * as React from "react";
import { Independence } from "../../lib/independence";
import cx from 'classnames'

export interface DropdownTriggerProps {
  shown?: boolean
  onBlur?: (evt: React.FocusEvent<HTMLElement>) => void
  onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
  dropdown?: React.ReactNode | (() => React.ReactNode)
  dropdownClassName?: string
  onShownChange?: (shown: boolean) => void
}

export interface DropdownTriggerState {
  shown: boolean
}

@Independence({
  shown: {
    defaultValue: false
  }
})
export default class DropdownTrigger extends React.PureComponent<DropdownTriggerProps> {
  public $component = React.createRef<HTMLElement>()
  private blurTimer: number

  public onBlur = (evt: React.FocusEvent<HTMLElement>) => {
    this.blurTimer = setTimeout(() => {
      if (this.props.onShownChange) { this.props.onShownChange(false) }
      if (this.props.onBlur) { this.props.onBlur(evt)}
    }, 10)
  }

  public onFocus = (evt: React.FocusEvent<HTMLElement>) => {
    if (this.props.onShownChange) { this.props.onShownChange(true) }
    if (this.props.onFocus) { this.props.onFocus(evt) }
  }

  public onClick = (evt: React.MouseEvent<HTMLElement>) => {
    if (this.blurTimer) {
      clearTimeout(this.blurTimer)
    }
  }

  public renderDropdown() {
    if (!this.props.dropdown) {
      return null
    }

    return (
      <div className={cx('ma-dropdown', this.props.dropdownClassName)}>
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
    }, children.props.children, this.props.shown ? this.renderDropdown() : null)
  }
}
