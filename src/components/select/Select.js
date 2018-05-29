import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './select.css'
import '../../style/index.css'

import Input from '../input'
import Menu from '../menu'
import CheckBox from '../checkbox'
import Icon from '../icon'
import Tag from '../tag'

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOptions: false,
            selected: this.getSelected(),
            selectOptions: this.initSelectOptions(),
            currentPlaceholder: this.props.placeholder || '',
            cachePlaceHolder: '',
            filterKey: ''
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.handleGlobalClick.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener(this.handleGlobalClick)
    }
    handleGlobalClick(e) {
        const insertSelect = this.options
        if (!this.options) return
        if (insertSelect.contains(e.target)) return 
        if (e.target.className.indexOf('icon-close') !== -1) return 
        this.setState({
            showOptions: false
        })
    }
    getSelected() {
        return this.props.selected || ''
    }
    initSelectOptions() {
        return this.props.selectOptions || []
    }
    toggle() {
        const { showOptions, cachePlaceHolder } = this.state;
        if (!showOptions) {
            this.setState({
                selected: '',
                currentPlaceholder: cachePlaceHolder,
                filterKey: ''
            })
        }
        this.setState({
            showOptions: !showOptions
        })
    }
    inputChangeHanlder(value) {
        // this.toggle()
        console.log(value)
        this.setState(() => {
            return {
                filterKey: value,
                showOptions: true,
                selected: value
            }
        })
    }
    onCheckboxGroupChange(lists) {
        this.setState({
            selectOptions: lists
        })
    }
    deleteTag(index) {
        const { selectOptions } = this.state
        selectOptions[index].checked =false
        this.setState({
            selectOptions: selectOptions
        })
    }
    handleCommand(command, instance) {
        this.toggle()
        const name = instance.props.children
        this.setState({
            selected: name,
            cachePlaceHolder: name
        })
    }
    setOption(dom) {
        this.options = ReactDOM.findDOMNode(dom);
    }
    getSelectOptions() {
        const { multiple } = this.props
        const { selectOptions, filterKey } = this.state
        if (multiple) {
            return (
                <Menu>
                    <CheckBox.Group data={selectOptions} onChange={this.onCheckboxGroupChange.bind(this)}>
                    </CheckBox.Group>
                </Menu>
            )
        } else {
            return (
                <Menu onCommand={this.handleCommand.bind(this)}>
                    {
                        selectOptions.map((option, index) => {
                            if (option.name.indexOf(filterKey) !== -1 || !filterKey) {
                                if (option.title) {
                                    return <Menu.Title>option.name</Menu.Title>
                                } else {
                                    return <Menu.Item key={option.command} command={option.command} disabled={option.disabled} divided={option.divided}  iconName={option.iconName}>{option.name}</Menu.Item>
                                }
                            } else {
                                return null
                            }
                        })
                    }
                </Menu>
            )
        }
    }
    render() {
        const { className, style, size, searchable, multiple } = this.props
        const { showOptions, selected, selectOptions, currentPlaceholder } = this.state
        const selectClass = classNames('u-select', className)
        const multiClass = classNames('multi-selected', `multi-selected-${size}`)
        const SelectOptions = this.getSelectOptions()
        if (multiple) {
            return (
                <div className={selectClass} style={style} ref={this.setOption.bind(this)}>
                    <div className={multiClass} onClick={this.toggle.bind(this)}>
                    { 
                        selectOptions.map((tag, index) => {
                            if (tag.checked)
                               return <Tag key={tag.value} onClose={this.deleteTag.bind(this, index)}>{tag.value}</Tag>
                            else return null
                        }) 
                    }
                    <Icon name={ showOptions ? "chevron-up" : "chevron-down"}></Icon>
                    </div>
                    {showOptions && SelectOptions}
                </div>
            )
        } else {
            return (
                <div className={selectClass} style={style} ref={this.setOption.bind(this)}>
                    <Input type="text" readOnly={!searchable} size={size} iconName={showOptions ? "chevron-up" : "chevron-down"} value={selected} placeholder={currentPlaceholder} onClick={this.toggle.bind(this)} onChange={this.inputChangeHanlder.bind(this)}/>
                    {showOptions && SelectOptions}
                </div>
            )
        }
    }
}

Select.propTypes = {
    size: PropTypes.string,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    placeholder: PropTypes.string
}
Select.defaultProps = {
    size: 'small',
    searchable: false
}