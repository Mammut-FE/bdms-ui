/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-06 16:27:11
 */
import React, { Component } from 'react';

import { Cartesian, Detail, Example, Library } from '@compositor/kit';

// import styles from './App.scss';
import Button from './components/button/index';
import Checkbox from './components/checkbox/index';
import Icon from './components/icon';

const icons = [
  "order-down",
  "order-up",
  "choose",
  "choose-cancle",
  "stop",
  "log-big",
  "datasource",
  "more",
  "notebook",
  "query",
  "left-sidebar",
  "right-sidebar",
  "sidebar-up",
  "sidebar-down",
  "format2",
  "fullscreen",
  "run2",
  "save2",
  "download",
  "light-off",
  "light-on",
  "rerun",
  "cancel",
  "dot",
  "disable",
  "result",
  "info",
  "release",
  "project",
  "project-open",
  "folder-closed",
  "folder-open",
  "taskflows",
  "node",
  "database",
  "table",
  "waiting",
  "ok",
  "warning",
  "error",
  "script",
  "hive",
  "sqoop",
  "noop",
  "loaddata",
  "top",
  "save",
  "format",
  "package",
  "run",
  "refresh",
  "setting",
  "admin",
  "user-solid",
  "failed_finishing",
  "preparing",
  "running",
  "killed",
  "paused",
  "succeeded",
  "failed",
  "field",
  "statistics",
  "instance",
  "tasklist",
  "authmanage",
  "authsetting",
  "user",
  "projectcenter",
  "zoomin",
  "zoomout",
  "original",
  "search",
  "back",
  "add",
  "close-circle",
  "filter",
  "true",
  "close",
  "fault",
  "chevron-down",
  "chevron-up",
  "caret-right",
  "caret-down",
  "message",
  "calendar",
  "time",
  "log",
  "copy",
  "delete",
  "edit",
  "view",
  "right",
  "left",
  "arrow"
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
    console.log("button click", e);
  }

  public checkChange(e) {
    const { checboxCheck } = this.state;
    this.setState({
      checboxCheck: !checboxCheck
    });
  }

  public render() {
    const { checboxCheck } = this.state;
    return (
      <Library>
        <Example name={"button"}>
          <Button>按钮</Button>
          <Button href="www.baidu.com" icon="arrow">
            链接
          </Button>
          <Detail>
            <Cartesian
              component={Button}
              type={["primary", "default", "text"]}
              size={["small", "normal"]}
              disabled={[true, false]}
              children={["默认文字"]}
              onClick={this.clickButton}
            />
            <Button.Group>
              <Button onClick={this.clickButton}>
                默认文字1
              </Button>
              <Button onClick={this.clickButton}>
                默认文字2
              </Button>
              <Button onClick={this.clickButton}>
                默认文字3
              </Button>
            </Button.Group>
          </Detail>
        </Example>
        <Example name={"icon"}>
          <Icon name="table" />
          <Cartesian component={Icon} name={icons} />
        </Example>
        <Example name={"checkbox"}>
          <Checkbox
            value="haha"
            checked={checboxCheck}
            onChange={this.checkChange}
          >
            哈哈
          </Checkbox>
        </Example>
      </Library>
    );
  }
}

export default App;
