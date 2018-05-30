import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import './checkbox.scss'
import '../../style/index.scss'
import Checkbox from './Checkbox'

export default class CheckboxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkLists: this.getCheckLists(props),
            isIndeterminate: false,
            checkAll: false
        }
        this.changeAll = this.changeAll.bind(this)
    }

    componentDidMount() {
        this.updateIsIndeterminate()
    }
    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps.data, this.props.data)) {
            this.setState({
                checkLists: nextProps.data
            });
            this.updateIsIndeterminate()
        }
    }

    updateIsIndeterminate() {
        const {checkLists} = this.state;
        let checkedNum = 0
        const checkLen = checkLists.length
        checkLists.forEach((item) => {
            if (item.checked) {
                checkedNum++
            }
        })
        
        if (checkedNum > 0 && checkedNum < checkLen) {
            this.setState({
                isIndeterminate: true,
                checkAll: false
            })
        } else if (checkedNum === checkLen) {
            this.setState({
                isIndeterminate: false,
                checkAll: true
            })
        } else {
            this.setState({
                isIndeterminate: false,
                checkAll: false
            })
        }
    }

    getCheckLists(props) {
        return props.data;
    }

    changeAll(value, checked) {
        console.log(value, checked)
        const { checkLists } = this.state;
        this.setState({
            isIndeterminate: false,
            checkAll: checked
        })
        checkLists.forEach(function(item) {
            item.checked = checked
        })
        this.setState({
            checkLists: checkLists
        })

        if (this.props.onChange) {
            this.props.onChange(checkLists)
        }
    }

    onChange = (value, checked) => {

        let checkLists = this.state.checkLists;
        const index = this.getIndex(checkLists, value)

        checkLists[index].checked = checked

        this.setState({
            checkLists: checkLists
        })
        this.updateIsIndeterminate()

        if (this.props.onChange) {
            this.props.onChange(checkLists)
        }
    }

    getIndex(array, value) {
        let _index = -1;

        array.forEach(function(item, index) {
            if (item.value === value) {
                _index = index;
            }
        })

        return _index;
    }

    render() {
        const {checkLists, isIndeterminate, checkAll} = this.state;
        const {className, indeterminate} = this.props;

        const gourpClassName = classNames('checbox-group', className)

        return (
            <div className={gourpClassName}>
                {
                    indeterminate && (<Checkbox isIndeterminate={isIndeterminate} checked={checkAll} value="全选" onChange={this.changeAll}></Checkbox>)
                }
                {
                    checkLists.map((item, index) =>
                        <Checkbox checked={item.checked} value={item.value} disabled={item.disabled} key={index} onChange={this.onChange}></Checkbox>)
                }
            </div>
        )
    }
}

/**
 * @param {Array} data  checkbox列表数组，数组中每个项是对象，必须包含字段：checked,value
 */

CheckboxGroup.propTypes = {
    data: PropTypes.array,
    indeterminate: PropTypes.bool
}

CheckboxGroup.defaultProps = {
    indeterminate: true
}
