/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:42:37 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-08 17:06:50
 */
import React, { Component } from "react";

// import { Cartesian, Detail, Example, Library } from "@compositor/kit";

// import styles from './App.scss';
import Button from "./components/button/index";
import Checkbox from "./components/checkbox/index";
import { Col, Grid, Row } from "./components/grid";
import Icon from "./components/icon";
import Layout from "./components/layout";

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

  public checkGroupChange(checkLists: object[]) {
    console.log(checkLists);
  }

  public render() {
    const { checboxCheck } = this.state;
    return (
      <Layout>
        <Grid>
          <Row>
            <Col xs={2}>
              <Button>按钮</Button>
            </Col>
            <Col xs={2}>
              <Button href="www.baidu.com" icon="arrow">
                链接
              </Button>
            </Col>
            <Col xs={2}>
              <Button type="primary" icon="table">
                primary
              </Button>
            </Col>
            <Col xs={2}>
              <Button type="default" icon="table">
                default
              </Button>
            </Col>
            <Col xs={2}>
              <Button type="text">text</Button>
            </Col>
            <Col xs={2}>
              <Button type="primary" size="small" icon="table">
                primary-small
              </Button>
            </Col>
            <Col xs={2}>
              <Button type="default" size="normal" icon="table">
                default-normal
              </Button>
            </Col>
            <Col xs={2} sm={3} md={2}>
              <Button type="text" size="normal">
                text
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button.Group>
                <Button onClick={this.clickButton}>默认文字2</Button>
                <Button onClick={this.clickButton}>默认文字2</Button>
                <Button onClick={this.clickButton}>默认文字1</Button>
              </Button.Group>
            </Col>
          </Row>
          <Row>
            {icons.map((icon, iconIndex) => (
              <Col xs={2}>
                <Icon name={icon} key={iconIndex} />
              </Col>
            ))}
          </Row>
          <Row>
            <Checkbox
              value="haha"
              checked={checboxCheck}
              onChange={this.checkChange}
            >
              哈哈
            </Checkbox>
          </Row>
          <Row>
            <Checkbox.Group
              data={[
                { value: "en", checked: false },
                { value: "check-2", checked: true }
              ]}
              onChange={this.checkGroupChange}
            />
          </Row>
        </Grid>
      </Layout>
    );
  }
}

export default App;
