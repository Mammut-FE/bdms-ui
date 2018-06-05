import React, { Component } from 'react';

/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2017-10-18 14:18:29
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-06-05 11:06:19
 */
import { Cartesian, Detail, Example, Library } from '@compositor/kit';

import styles from './App.scss';
import Button from './components/button/index';
import Checkbox from './components/checkbox/index';

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
          <Detail>
            <Cartesian
              component={Button}
              type={["primary", "default"]}
              size={["small", "normal"]}
              children={["默认文字"]}
              onClick={this.clickButton}
            />
            <Button.Group>
              <Button className={styles.item} onClick={this.clickButton}>
                默认文字1
              </Button>
              <Button className={styles.item} onClick={this.clickButton}>
                默认文字2
              </Button>
            </Button.Group>
          </Detail>
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
