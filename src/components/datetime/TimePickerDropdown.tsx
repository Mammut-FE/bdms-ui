import './time-picker.scss'
import * as React from "react"
import cx from 'classnames'

const defaultHourRanger = new Array<number>(24).fill(0).map((_, index) => index)
const defaultMintueRanger = new Array<number>(60).fill(0).map((_, index) => index)
const defaultRanger = [defaultHourRanger, defaultMintueRanger]

export interface TimePickerDropdownProps {
  time: [number, number],
  ranger?: [number[], number[]],
  onClick?: (values: [number, number]) => void
}

export default class TimePickerDropdown extends React.Component<TimePickerDropdownProps> {
  public moveToTop = (dom?: HTMLDivElement) => {
    if (!dom) { return }
    const parent = dom.parentElement as HTMLDivElement
    const top = dom.offsetTop
    parent.scrollTo({
      top,
      behavior: 'smooth'
    })
  }

  public onClick = (time) => {
    if (this.props.onClick) {
      this.props.onClick(time)
    }
  }

  public render() {
    const { time, ranger = defaultRanger } = this.props
    const emptyBlock = new Array(4).fill(0).map((_, index) => (<div key={`empty-${index}`} className="ma-time-picker-dropdown__option ma-time-picker-dropdown__option_empty"/>))
    return (
      <div className="ma-time-picker-dropdown">
        {time.map((value, index) => {
          const range = ranger[index] || defaultRanger[index]
          return (
            <div key={index} className="ma-time-picker-dropdown__select">
              {range.map(option => {
                const props: any = { className: 'ma-time-picker-dropdown__option' }

                if (option === value) {
                  props.ref = this.moveToTop
                  props.className = cx(props.className, 'ma-time-picker-dropdown__option_active')
                } else {
                  props.onClick = () => {
                    const array = [...time]
                    array[index] = option
                    this.onClick(array)
                  }
                }

                return (
                  <div key={option} {...props}>{option}</div>
                )
              })}
              {emptyBlock}
            </div>
          )
        })}
      </div>
    )
  }
}
