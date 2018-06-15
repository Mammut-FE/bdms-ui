/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-13 16:46:13
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
                <Menu selected="1">
                  <Menu.Title>组一</Menu.Title>
                  <Menu.Item command="1">项目一</Menu.Item>
                  <Menu.Item command="2" divided={true}>
                    项目二
                  </Menu.Item>
                  <Menu.Title>组二</Menu.Title>
                  <Menu.Item command="3" subDesc="ctrl c">
                    项目三
                  </Menu.Item>
                  <Menu.Item command="4" subDesc="ctrl v">
                    项目四
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Menu selected="1" tickSelect={true}>
                  <Menu.Item command="1">项目一</Menu.Item>
                  <Menu.Item command="2">项目二</Menu.Item>
                  <Menu.Item command="3" divided={true}>
                    项目三
                  </Menu.Item>
                  <Menu.Item command="4">项目四</Menu.Item>
                  <Menu.Item command="5">项目五</Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Menu selected="1" tickSelect={true}>
                  <Menu.Item command="1" iconName="database">
                    项目一
                  </Menu.Item>
                  <Menu.Item command="2" iconName="database">
                    项目二
                  </Menu.Item>
                  <Menu.Item command="3" divided={true} iconName="database">
                    项目三
                  </Menu.Item>
                  <Menu.Item command="4" iconName="database">
                    项目四
                  </Menu.Item>
                  <Menu.Item command="5" iconName="database">
                    项目五
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col xs={3}>
              <div className={cx('item')}>
                <Menu withCheck={true} onCheck={this.checkMenuItem}>
                  <Checkbox.Group
                    box={true}
                    data={[
                      { value: '选项一', checked: false },
                      { value: '选项二', checked: true },
                      { value: '选项三', checked: false },
                      { value: '选项四', checked: false },
                      { value: '选项五', checked: false },
                      { value: '选项六', checked: false }
                    ]}
                    onChange={this.checkGroupChange}
                  />
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
