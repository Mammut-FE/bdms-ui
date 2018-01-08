import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkbox.css'
import '../../style/index.css'
import Checkbox from './Checkbox'

export default class CheckboxGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkLists: this.getCheckLists(props)
        }
    }

    getCheckLists(props) {
        return props.data;
    }

    onChange = (value, checked) => {

        let checkLists = this.state.checkLists;
        const index = this.getIndex(checkLists, value)

        checkLists[index].checked = checked

        this.setState({
            checkLists: checkLists
        })

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
        const {checkLists} = this.state;
        const {className} = this.props;
        return (
            <div className={`checbox-group ${className}`}>
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
    data: PropTypes.array
}