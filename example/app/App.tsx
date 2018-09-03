/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-19 16:18:40
 * @Last Modified time: 2018-08-30 14:18:24
 */
import React, { Component } from 'react';

// import { Cartesian, Detail, Example, Library } from "@compositor/kit";
import classNames from 'classnames/bind';
import styles from './App.scss';
import { Button, Checkbox, Col, Grid, Row, Icon, Layout, Switch, Tag, Menu, Select } from '../../src';

const cx = classNames.bind(styles);

const icons = [
  'file-mini',
  'ture',
  'order-down',
  'order-up',
  'choose',
  'choose-cancle',
  'stop',
  'log-big',
  'more',
  'notebook',
  'query',
  'sidebar-up',
  'sidebar-down',
  'format2',
  'fullscreen',
  'run2',
  'save2',
  'download',
  'light-off',
  'light-on',
  'rerun',
  'cancel',
  'disable',
  'result',
  'info',
  'release',
  'project',
  'project-open',
  'folder-closed',
  'folder-open',
  'taskflows',
  'node',
  'database',
  'table',
  'waiting',
  'ok',
  'warning',
  'error',
  'script',
  'loaddata',
  'top',
  'save',
  'format',
  'package',
  'run',
  'refresh',
  'setting',
  'preparing',
  'running',
  'killed',
  'paused',
  'succeeded',
  'failed',
  'field',
  'statistics',
  'instance',
  'tasklist',
  'projectcenter',
  'zoomin',
  'zoomout',
  'original',
  'search',
  'back',
  'add',
  'close-circle',
  'filter',
  'close',
  'chevron-down',
  'chevron-up',
  'caret-down',
  'message',
  'calendar',
  'time',
  'log',
  'copy',
  'delete',
  'edit',
  'view',
  'right',
  'left',
  'arrow'
];

const source = [
  {
    title: '数据开发',
    options: [
      {
        name: '新建任务',
        key: 'newTask',
        filter: 9
      }, {
        name: '开放依赖授权',
        key: 'exposeDependency',
        filter: 46
      }, {
        name: '收回依赖授权',
        key: 'withdrawDependency',
        filter: 47
      }
    ]
  }, {
    name: '新增队列',
    key: 'addQueue',
    filter: 32
  }, {
    name: '移交Owner',
    key: 'charge',
    filter: 33
  }, {
    name: '新增Hive库',
    key: 'addHive',
    filter: 34
  }
];

export default class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checboxCheck: false
    };
    this.checkChange = this.checkChange.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectItemWithCheck = this.selectItemWithCheck.bind(this);
  }

  public clickButton(e) {
    console.log('button click', e);
  }

  public checkChange(e) {
    const { checboxCheck } = this.state;
    this.setState({
      checboxCheck: !checboxCheck
    });
  }

  public checkGroupChange(checkLists: object[]) {
    console.log(checkLists);
  }

  public selectItem(selected) {
    console.log(selected);
  }

  public selectItemWithCheck(selected) {
    console.log(selected);
  }

  public selectHandle(selected) {
    console.log(selected);
  }

  public render() {
    const { checboxCheck } = this.state;
    return (<Layout>
      <Grid fluid={true}>
        <Row>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button>按钮s</Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button icon="add">有icon</Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="primary" icon="table">
                primary
              </Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="default" icon="table">
                default
              </Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="primary" size="small" icon="table">
                primary-small
              </Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="default" size="normal" icon="table">
                default-normal
              </Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="text" href="http://www.baidu.com">
                text
              </Button>
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Button type="text" size="normal" href="http://www.baidu.com" target="blank">
                text
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className={cx('item')}>
              <Button.Group>
                <Button onClick={this.clickButton}>默认文字2</Button>
                <Button onClick={this.clickButton}>默认文字2</Button>
                <Button onClick={this.clickButton}>默认文字1</Button>
              </Button.Group>
            </div>
          </Col>
        </Row>
        <Row>
          {icons.map((icon, iconIndex) => (<Col xs={2} key={iconIndex}>
            <div className={cx('item')}>
              <Icon name={icon}/>
            </div>
          </Col>))}
        </Row>
        <Row>
          <Col xs={2}>
            <div className={cx('item')}>
              <Checkbox value="haha" checked={checboxCheck} onChange={this.checkChange}>
                哈哈
              </Checkbox>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <div className={cx('item')}>
              <Checkbox.Group
                data={[
                  {
                    value: 'en',
                    checked: false
                  }, {
                    value: 'check-2',
                    checked: true
                  }
                ]}
                onChange={this.checkGroupChange}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className={cx('item')}>
              <Checkbox.Group
                mode="vertical"
                data={[
                  {
                    value: 'en',
                    checked: false,
                    text: '中文'
                  }, {
                    value: 'check-2',
                    checked: true
                  }, {
                    value: 'check3',
                    checked: true,
                    text: '英文'
                  }
                ]}
                onChange={this.checkGroupChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <div className={cx('item')}>
              <Tag>你好</Tag>
              <Tag>你好hsh</Tag>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div className={cx('item')}>
              <Switch/>
            </div>
          </Col>
          <Col xs={3}>
            <div className={cx('item')}>
              <Switch open={true}/>
            </div>
          </Col>
          <Col xs={3}>
            <div className={cx('item')}>
              <Switch open={true} disabled={true}/>
            </div>
          </Col>
          <Col xs={3}>
            <div className={cx('item')}>
              <Switch disabled={true}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className={cx('item')}>
              <Menu onSelect={this.selectItem} mode="horizontal">
                <Menu.Item value="数据开发">数据开发</Menu.Item>
                <Menu.Item value="任务运维">任务运维</Menu.Item>
                <Menu.Item value="自助分析">自助分析</Menu.Item>
                <Menu.Item value="数据管理">数据管理</Menu.Item>
                <Menu.Item value="实时流计算">实时流计算</Menu.Item>
                <Menu.SubMenu title="sub" isRoot={true}>
                  <Menu.Item value="sub-2-1">子目录一</Menu.Item>
                  <Menu.Item value="sub-2-2">子目录二</Menu.Item>
                  <Menu.SubMenu title="sub2">
                    <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
                    <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
                    <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.Item value="项目中心">项目中心</Menu.Item>
              </Menu>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div className={cx('item')}>
              <Menu isTick={true} onSelect={this.selectItem}>
                <Menu.SubMenu title="sub" subtitle="test">
                  <Menu.Item value="sub-2-1">子目录一</Menu.Item>
                  <Menu.Item value="sub-2-2">子目录二</Menu.Item>
                  <Menu.SubMenu title="sub2">
                    <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
                    <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
                    <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.Item value="2" subtitle="复制">
                  dsdf
                </Menu.Item>
                <Menu.Item value="3">dsdf</Menu.Item>
                <Menu.Item value="4">dsdf</Menu.Item>
                <Menu.Divider/>
                <Menu.ItemGroup title="组一">
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
                </Menu.ItemGroup>
                <Menu.Divider/>
                <Menu.Item value="8">dsdf</Menu.Item>
                <Menu.Item value="9">dsdf</Menu.Item>
                <Menu.Item value="10">dsdf</Menu.Item>
                <Menu.Item value="11">dsdf</Menu.Item>
                <Menu.Item value="12">dsdf</Menu.Item>
                <Menu.Item value="13">dsdf</Menu.Item>
                <Menu.Item value="14">dsdf</Menu.Item>
                <Menu.Item value="15">dsdf</Menu.Item>
                <Menu.Item value="16">dsdf</Menu.Item>
                <Menu.Item value="17">dsdf</Menu.Item>
                <Menu.Item value="18">dsdf</Menu.Item>
                <Menu.Item value="19">dsdf</Menu.Item>
                <Menu.Item value="20">dsdf</Menu.Item>
                <Menu.Item value="21">dsdf</Menu.Item>
                <Menu.Item value="22">dsdf</Menu.Item>
                <Menu.Item value="23">dsdf</Menu.Item>
              </Menu>
            </div>
          </Col>
          <Col xs={3}>
            <div className={cx('item')}>
              <Menu selected="3" onSelect={this.selectItem}>
                <Menu.Item value="1" icon="table" disabled={true}>
                  dsdf
                </Menu.Item>
                <Menu.Item value="2">dsdf</Menu.Item>
                <Menu.SubMenu title="sub" subtitle="test">
                  <Menu.Item value="sub-2-1">子目录一</Menu.Item>
                  <Menu.Item value="sub-2-2">子目录二</Menu.Item>
                  <Menu.SubMenu title="sub2">
                    <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
                    <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
                    <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.Item value="3">dsdf</Menu.Item>
                <Menu.Item value="4">dsdf</Menu.Item>
                <Menu.Divider/>
                <Menu.ItemGroup title="组一">
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
                </Menu.ItemGroup>
                <Menu.Divider/>
                <Menu.Item value="8">dsdf</Menu.Item>
                <Menu.Item value="9">dsdf</Menu.Item>
              </Menu>
            </div>
          </Col>
          <Col xs={3} style={{ height: '500px' }}>
            <div className={cx('item')}>
              <Menu onSelect={this.selectItem} mode="inline">
                <Menu.Item value="1">
                  <a href="javascript: void(0);">测试连接</a>
                </Menu.Item>
                <Menu.Item value="2">
                  <a href="javascript: void(0);">测试连接</a>
                </Menu.Item>
                <Menu.SubMenu title="sub" subtitle="test">
                  <Menu.Item value="sub-2-1">
                    <a href="javascript: void(0);">子目录一</a>
                  </Menu.Item>
                  <Menu.Item value="sub-2-2">
                    <a href="javascript: void(0);">子目录一</a>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item value="3">
                  <a href="javascript: void(0);">测试连接</a>
                </Menu.Item>
                <Menu.Item value="4">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
                <Menu.Item value="5">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
                <Menu.Item value="6">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
                <Menu.Item value="7">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
                <Menu.Item value="8">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
                <Menu.Item value="9">
                  <a href="javascript: void(0);">子目录一</a>
                </Menu.Item>
              </Menu>
            </div>
          </Col>
          <Col xs={3}>
            <div className={cx('item')}>
              <Menu onSelect={this.selectItemWithCheck} multiple={true} hasCheckBox={true}>
                <Menu.Item value="haha">哈哈</Menu.Item>
                <Menu.Item value="haha2">哈哈2</Menu.Item>
              </Menu>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div className={cx('item')}>
              <Select source={source} title="全部动作" onBlur={this.selectHandle}>
                恩
              </Select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <div style={{ height: 500 }}/>
          </Col>
        </Row>
      </Grid>
    </Layout>);
  }
}
