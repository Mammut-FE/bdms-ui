import classNames from 'classnames/bind';
import _ from 'lodash';
import React, { Component } from 'react';

import Checkbox from './Checkbox';
import checkboxClass from './checkbox.scss';

interface ICheckData {
  checked: boolean;
  value: string;
  disabled: boolean;
}

interface ICheckboxGroupProps {
  indeterminate: boolean;
  data: ICheckData[];
  onChange?: (lists: ICheckData[]) => void;
  className: string;
}

interface ICheckboxGroupState {
  checkLists: ICheckData[];
  isIndeterminate: boolean;
  checkAll: boolean;
}

/**
 * @param {Array} data  checkbox列表数组，数组中每个项是对象，必须包含字段：checked,value
 */

export default class CheckboxGroup extends Component<
  ICheckboxGroupProps,
  ICheckboxGroupState
> {
  public static defaultProps: Partial<ICheckboxGroupProps> = {
    indeterminate: true
  };

  constructor(props: ICheckboxGroupProps) {
    super(props);
    this.state = {
      checkAll: false,
      checkLists: this.getCheckLists(props),
      isIndeterminate: false
    };
    this.changeAll = this.changeAll.bind(this);
  }

  public componentDidMount() {
    this.updateIsIndeterminate();
  }

  public componentWillReceiveProps(nextProps) {
    if (_.isEqual(nextProps.data, this.props.data)) {
      this.setState({
        checkLists: nextProps.data
      });
      this.updateIsIndeterminate();
    }
  }

  public updateIsIndeterminate() {
    const { checkLists } = this.state;
    let checkedNum = 0;
    const checkLen = checkLists.length;
    checkLists.forEach(item => {
      if (item.checked) {
        checkedNum++;
      }
    });

    if (checkedNum > 0 && checkedNum < checkLen) {
      this.setState({
        checkAll: false,
        isIndeterminate: true
      });
    } else if (checkedNum === checkLen) {
      this.setState({
        checkAll: true,
        isIndeterminate: false
      });
    } else {
      this.setState({
        checkAll: false,
        isIndeterminate: false
      });
    }
  }

  public getCheckLists(props) {
    return props.data;
  }

  public changeAll(value, checked) {
    const { checkLists } = this.state;
    this.setState({
      checkAll: checked,
      isIndeterminate: false
    });
    checkLists.forEach(item => {
      item.checked = checked;
    });
    this.setState({
      checkLists
    });

    if (this.props.onChange) {
      this.props.onChange(checkLists);
    }
  }

  public onChange = (value, checked) => {
    const checkLists = this.state.checkLists;
    const index = this.getIndex(checkLists, value);

    checkLists[index].checked = checked;

    this.setState({
      checkLists
    });
    this.updateIsIndeterminate();

    if (this.props.onChange) {
      this.props.onChange(checkLists);
    }
  };

  public getIndex(array, value) {
    let index = -1;

    array.forEach((item, index2) => {
      if (item.value === value) {
        index = index2;
      }
    });

    return index;
  }

  public render() {
    const { checkLists, isIndeterminate, checkAll } = this.state;
    const { className, indeterminate } = this.props;

    const cx = classNames.bind(checkboxClass);

    const gourpClassName = cx("checbox-group", className);

    return (
      <div className={gourpClassName}>
        {indeterminate && (
          <Checkbox
            isIndeterminate={isIndeterminate}
            checked={checkAll}
            value="全选"
            onChange={this.changeAll}
          />
        )}
        {checkLists.map((item, index) => (
          <Checkbox
            checked={item.checked}
            value={item.value}
            disabled={item.disabled}
            key={index}
            onChange={this.onChange}
          />
        ))}
      </div>
    );
  }
}
