/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-22 15:07:15
 */
import React, { Component } from 'react';

// import { Cartesian, Detail, Example, Library } from "@compositor/kit";
import classNames from 'classnames/bind';
import styles from './App.scss';
import Button from './components/button';
import Checkbox from './components/checkbox';
import { Col, Grid, Row } from './components/grid';
import Icon from './components/icon';
import Layout from './components/layout';
import Switch from './components/switch';
import Tag from './components/tag';
import Menu from './components/menu';

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

class App extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checboxCheck: false
    };
    this.checkChange = this.checkChange.bind(this);
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

  public checkMenuItem(checkLists) {
    console.log(checkLists);
  }

  public render() {
    const { checboxCheck } = this.state;
    return (
      <Layout>
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
            {icons.map((icon, iconIndex) => (
              <Col xs={2} key={iconIndex}>
                <div className={cx('item')}>
                  <Icon name={icon} />
                </div>
              </Col>
            ))}
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
                  data={[{ value: 'en', checked: false }, { value: 'check-2', checked: true }]}
                  onChange={this.checkGroupChange}
                />
              </div>
            </Col>
            <Col xs={2}>
              <div className={cx('item')}>
                <Checkbox.Group
                  mode="vertical"
                  data={[
                    { value: 'en', checked: false, text: '中文' },
                    { value: 'check-2', checked: true },
                    { value: 'check3', checked: true, text: '英文' }
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
                <Switch />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch open={true} />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch open={true} disabled={true} />
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Switch disabled={true} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <div className={cx('item')}>
                <Menu isTick={true}>
                  <Menu.Item value="1" icon="table">
                    dsdf
                  </Menu.Item>
                  <Menu.Item value="2">dsdf</Menu.Item>
                  <Menu.Item value="3">dsdf</Menu.Item>
                  <Menu.Item value="4">dsdf</Menu.Item>
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
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
                <Menu>
                  <Menu.Item value="1" icon="table">
                    dsdf
                  </Menu.Item>
                  <Menu.Item value="2">dsdf</Menu.Item>
                  <Menu.Item value="3">dsdf</Menu.Item>
                  <Menu.Item value="4">dsdf</Menu.Item>
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
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
                <Menu multiple={true}>
                  <Menu.Item value="1" icon="table">
                    dsdf
                  </Menu.Item>
                  <Menu.Item value="2">dsdf</Menu.Item>
                  <Menu.Item value="3">dsdf</Menu.Item>
                  <Menu.Item value="4">dsdf</Menu.Item>
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
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
                <Menu multiple={true} isTick={true}>
                  <Menu.Item value="1" icon="table">
                    dsdf
                  </Menu.Item>
                  <Menu.Item value="2">dsdf</Menu.Item>
                  <Menu.Item value="3">dsdf</Menu.Item>
                  <Menu.Item value="4">dsdf</Menu.Item>
                  <Menu.Item value="5">dsdf</Menu.Item>
                  <Menu.Item value="6">dsdf</Menu.Item>
                  <Menu.Item value="7">dsdf</Menu.Item>
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
          </Row>
        </Grid>
      </Layout>
    );
  }
}

export default App;
