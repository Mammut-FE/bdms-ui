import * as React from "react";
import Trigger from 'rc-trigger'

import styles from './dropdown.scss'
import cn from 'classnames'
import cnb from 'classnames/bind'
const cx = cnb.bind(styles)

const builtinPlacements = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
}

export type TriggerAction = 'click' | 'hover' | 'focus' | 'contextMenu'

/**
 * 处理 Dropdown 相关的触发操作
 */
export interface DropdownTriggerProps {
  shown?: boolean
  action?: TriggerAction[]
  onBlur?: (evt: React.FocusEvent<HTMLElement>) => void
  onFocus?: (evt: React.FocusEvent<HTMLElement>) => void
  dropdown?: React.ReactNode | (() => React.ReactNode)
  dropdownPlacement?: keyof typeof builtinPlacements
  dropdownClassName?: string
  onShownChange?: (shown: boolean) => void
}

/**
 * 下拉列表触发器，会给第一个子元素添加显示下拉列表的能力
 * 下拉列表通过 dropdown props 传入
 */
export default class DropdownTrigger extends React.PureComponent<DropdownTriggerProps> {
  public renderDropdown() {
    if (!this.props.dropdown) {
      return null
    }

    return (
      <div className={cn(cx('inner-dropdown'), this.props.dropdownClassName)}>
        {typeof this.props.dropdown === 'function' ? this.props.dropdown() : this.props.dropdown}
      </div>
    )
  }

  public render() {
    const { children, dropdownPlacement, action, shown, onShownChange } = this.props

    return (
      <Trigger
        action={action || ['click']}
        builtinPlacements={builtinPlacements}
        popupPlacement={dropdownPlacement || 'bottomLeft'}
        popup={this.renderDropdown()}
        popupClassName={cx('trigger-dropdown')}
        destroyPopupOnHide={true}
        popupVisible={shown}
        onPopupVisibleChange={onShownChange}
        popupAlign={{
          overflow: {
            adjustX: true,
            adjustY: true,
          }
        }}
      >
        {children}
      </Trigger>
    )
  }
}
