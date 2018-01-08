/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2017-10-18 14:18:29 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-08 14:49:29
 */
import React, { Component } from 'react';
import './App.css';

import Button from './components/button'
import Radio from './components/radio'
import CheckBox from './components/checkbox'
import Switch from './components/switch'
import Menu from './components/menu'
import Dropdown from './components/dropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: '选项一'
    }
  }
  clickButton(e) {
    console.log(e.type);
  }

  onChange(value) {
    this.setState({
      value
    })
  }
  onCheckChange(value, checked) {
    console.log(value, checked)
  }

  onCheckboxGroupChange(lists) {
    console.log(lists)
  }
  
  switchChange(open) {
    console.log(open)
  }
  onItemClick(command) {
    console.log(command)
  }

  render() {
    const checkGroupData = [{value: '苹果', checked: false}, {value: '香蕉', checked: false}, {value: '桃子', checked: false}, {value: '梨子', checked: false}]


    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome!</h2>
        </div>
        <div className="components">
          <Button className='item' type="primary" icon="search" onClick={this.clickButton}>默认文字</Button>
          <Button type="primary" icon="search" onClick={this.clickButton} size='small'>默认文字</Button>
          <Button icon="search" onClick={this.clickButton}>默认文字</Button>
          <Button icon="search" onClick={this.clickButton} size='small'>默认文字</Button>
          <Button type="text" onClick={this.clickButton}>默认文字</Button>
          <Button type="text" size='small' onClick={this.clickButton}>默认文字</Button>
          <Button.Group>
            <Button className='item' onClick={this.clickButton}>默认文字1</Button>
            <Button className='item' onClick={this.clickButton}>默认文字2</Button>
          </Button.Group>
        </div>
        <div className="components">
          <div className="item">
            <Radio value='选项一' onChange={this.onChange} checked={this.state.value === '选项一'}></Radio>
            <Radio value='选项二' onChange={this.onChange} checked={this.state.value === '选项二'}></Radio>
          </div>
          <div className="item">
            <Radio value='one' onChange={this.onChange} checked disabled >我是选中disabled的</Radio>
            <Radio value='two' onChange={this.onChange} disabled >我是未选中disabled的</Radio>
          </div>
        </div>
        <div className="components">
          <div className="item">
            <CheckBox value='check-off'></CheckBox>
            <CheckBox value='check-on' checked></CheckBox>
            <CheckBox value='checked-disabled' checked disabled></CheckBox>
            <CheckBox value='disabled' disabled></CheckBox>
          </div>
          <div className="item">
            <CheckBox.Group onChange={this.onCheckboxGroupChange} data={checkGroupData}>
            </CheckBox.Group>
          </div>
        </div>
        <div className="components">
          <div className="item">
            <Switch onChange={this.switchChange}></Switch>
            <Switch disabled onChange={this.switchChange}></Switch>
            <Switch disabled open onChange={this.switchChange}></Switch>
          </div>
        </div>
        {/* <div className="components">
          <div className="item">
            <Dropdown></Dropdown>
          </div>
        </div> */}
        <div className="components">
          <div className="item">
            <Menu onCommand={this.onItemClick.bind(this)}>
              <Menu.Item command="1" disabled>项目一</Menu.Item>
              <Menu.Item command="2" divided>项目二</Menu.Item>
              <Menu.Item command="3">项目三</Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
