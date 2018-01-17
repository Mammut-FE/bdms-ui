import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

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
            selectedTags: this.getSelectedTags(),
            selectOptions: this.initSelectOptions()
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
    getSelectedTags() {
        return this.props.selectedTags || []
    }
    initSelectOptions() {
        return this.props.selectOptions || []
    }
    toggle() {
        const showOptions = this.state.showOptions;
        this.setState({
            showOptions: !showOptions
        })
    }
    inputChangeHanlder(value) {
        this.toggle()
        this.setState({
            selected: value
        })
    }
    onCheckboxGroupChange(lists) {
        let selectedTags = []
        lists.forEach((item) => {
            if (item.checked) {
                selectedTags.push(item)
            }
        }) 
        this.setState({
            selectedTags: selectedTags
        })
    }
    deleteTag(index) {
        const { selectedTags, selectOptions } = this.state
        const _index = _.findIndex(selectOptions, selectedTags[index])
        selectOptions[_index].checked =false
        selectedTags.splice(index, 1)
        this.setState({
            selectOptions: selectOptions
        })
    } 
    handleCommand(command, instance) {
        this.toggle()
        const name = instance.props.children
        this.setState({
            selected: name
        })
    }
    setOption(dom) {
        this.options = ReactDOM.findDOMNode(dom);
    }
    getSelectOptions() {
        const { multiple } = this.props
        const { selectOptions } = this.state
        if (multiple) {
            return (
                <Menu>
                    <CheckBox.Group onChange={this.onCheckboxGroupChange.bind(this)} data={selectOptions}>
                    </CheckBox.Group>
                </Menu>
            )
        } else {
            return (
                <Menu onCommand={this.handleCommand.bind(this)}>
                    {
                        selectOptions.map((option, index) => {
                            if (option.title) {
                                return <Menu.Title>option.name</Menu.Title>
                            } else {
                                return <Menu.Item key={option.command} command={option.command} disabled={option.disabled} divided={option.divided}  iconName={option.iconName}>{option.name}</Menu.Item>
                            }
                            
                        })
                    }
                </Menu>
            )
        }
    }
    render() {
        const { className, style, size, searchable, multiple } = this.props
        const { showOptions, selected, selectedTags } = this.state
        const selectClass = classNames('u-select', className)
        const multiClass = classNames('multi-selected', `multi-selected-${size}`)
        const SelectOptions = this.getSelectOptions()
        if (multiple) {
            return (
                <div className={selectClass} style={style} ref={this.setOption.bind(this)}>
                    <div className={multiClass} onClick={this.toggle.bind(this)}>
                    { 
                        selectedTags.map((tag, index) => {
                            return <Tag key={tag.value} onClose={this.deleteTag.bind(this, index)}>{tag.value}</Tag>
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
                    <Input type="text" readOnly={!searchable} size={size} iconName={showOptions ? "chevron-up" : "chevron-down"} value={selected} onClick={this.toggle.bind(this)} onChange={this.inputChangeHanlder.bind(this)} />
                    {showOptions && SelectOptions}
                </div>
            )
        }
    }
}

Select.propTypes = {
    size: PropTypes.string,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool
}
Select.defaultProps = {
    size: 'small',
    searchable: true
}