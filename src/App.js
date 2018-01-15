/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2017-10-18 14:18:29 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-15 16:21:12
 */
import React, { Component } from 'react';
import './App.css';

import Icon from './components/icon'
import Button from './components/button'
import Radio from './components/radio'
import CheckBox from './components/checkbox'
import Switch from './components/switch'
import Menu from './components/menu'
import Input from './components/input'
import Select from './components/select'
// import Dropdown from './components/dropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      value: '选项一',
      errorShow: false
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

  changeCheckBox(value, checked) {
    console.log(value, checked)
  }

  onCheckboxGroupChange(lists) {
    console.log(lists)
  }
  
  switchChange(open) {
    console.log(open)
  }
  onItemClick(command, instance) {
    console.log(command)
  }
  onItemCheck(itemCheck) {
    console.log(itemCheck)
  }

  changeInput(value) {
    console.log(value)
  }

  checkError(value) {
    if (value.length > 5) {
      this.setState({
        errorShow: true
      })
    } else {
      this.setState({
        errorShow: false
      })
    }
    
  }

  handleIconClick(e) {
    console.log(e)
  }

  render() {
    const checkGroupData = [{value: '苹果', checked: true}, {value: '香蕉', checked: false}, {value: '桃子', checked: false}, {value: '梨子', checked: false}]


    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome!</h2>
        </div>
        <div className="components">
          <div className="item">
            <Icon name='table'></Icon>
            <Icon name='folder-closed'></Icon>
            <Icon name='folder-open'></Icon>
            <Icon name='message'></Icon>
          </div>
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
            <CheckBox value='check-off' onChange={this.changeCheckBox.bind(this)}></CheckBox>
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
            <Menu className="f-ib" onCommand={this.onItemClick.bind(this)} selected="3" tickSelect>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="1">项目一</Menu.Item>
              <Menu.Item command="2" disabled>项目二</Menu.Item>
              <Menu.Item command="3" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="4" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="5" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="6" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="7" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="11">项目一</Menu.Item>
              <Menu.Item command="22" disabled>项目二</Menu.Item>
              <Menu.Item command="33" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="44" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="55" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="66" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="77" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="111">项目一</Menu.Item>
              <Menu.Item command="222" disabled>项目二</Menu.Item>
              <Menu.Item command="333" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="444" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="555" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="666" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="777" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="1111">项目一</Menu.Item>
              <Menu.Item command="2222" disabled>项目二</Menu.Item>
              <Menu.Item command="3333" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="4444" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="5555" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="6666" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="7777" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="12">项目一</Menu.Item>
              <Menu.Item command="23" disabled>项目二</Menu.Item>
              <Menu.Item command="34" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="45" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="56" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="67" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="78" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="122">项目一</Menu.Item>
              <Menu.Item command="233" disabled>项目二</Menu.Item>
              <Menu.Item command="344" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="455" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="566" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="677" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="788" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="1222">项目一</Menu.Item>
              <Menu.Item command="2333" disabled>项目二</Menu.Item>
              <Menu.Item command="3444" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="4555" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="5666" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="6777" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="7888" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="121">项目一</Menu.Item>
              <Menu.Item command="221" disabled>项目二</Menu.Item>
              <Menu.Item command="321" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="421" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="521" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="621" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="721" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="131">项目一</Menu.Item>
              <Menu.Item command="231" disabled>项目二</Menu.Item>
              <Menu.Item command="331" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="431" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="531" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="631" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="731" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
            </Menu>
          </div>
          <div className="item">
            <Menu className="f-ib" onCommand={this.onItemClick.bind(this)} selected="3">
              <Menu.Title>分组一</Menu.Title>
              <Menu.Item command="1-1">项目一</Menu.Item>
              <Menu.Item command="2-1" disabled>项目二</Menu.Item>
              <Menu.Item command="3-1" divided>项目三</Menu.Item>
              <Menu.Title>分组二</Menu.Title>
              <Menu.Item command="4-1" iconName="folder-open">项目一</Menu.Item>
              <Menu.Item command="5-1" iconName="folder-open">项目二</Menu.Item>
              <Menu.Item command="6-1" iconName="folder-open">项目三</Menu.Item>
              <Menu.Item command="7-1" iconName="folder-open" subDesc="Ctrl+C">项目三</Menu.Item>
            </Menu>
          </div>
          <div className="item">
            <Menu className="f-ib" onCheck={this.onItemCheck.bind(this)}withCheck>
              <CheckBox.Group onChange={this.onCheckboxGroupChange} data={checkGroupData}>
              </CheckBox.Group>
            </Menu>
          </div>
        </div>
        <div className="components">
          <div className="item">
            <Input type="text" name="test" placeholder="请输入" value="e" onChange={this.changeInput.bind(this)}></Input>
          </div>
          <div className="item">
            <Input type="text" name="test" placeholder="请输入数字" value="e" onChange={this.checkError.bind(this)} error={this.state.errorShow} errorMessage = "不能超过长度5" iconName="search" onIconClick={this.handleIconClick.bind(this)}></Input>
          </div>
        </div>
        <div className="components">
          <div className="item">
            <Select></Select>
          </div>
        </div>
        <div className="components">
          <div className="item">
          </div>
        </div>
        <div className="components">
          <div className="item">
          </div>
        </div>
        <div className="components">
          <div className="item">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
