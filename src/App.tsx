/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2017-10-18 14:18:29
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-06-04 19:26:51
 */
import React, { Component } from 'react';

import styles from './App.scss';
import Button from './components/button/Button';

class App extends Component {
  constructor(props) {
    super(props);
  }

  public clickButton(e) {
    console.log("button click", e);
  }

  public render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.sidebar}>
          <ul>
            <li>Button</li>
          </ul>
        </div>
        <div className={styles.main}>
          <Button
            className={styles.item}
            type="primary"
            icon="search"
            onClick={this.clickButton}
          >
            默认文字
          </Button>
          <Button
            type="primary"
            icon="search"
            onClick={this.clickButton}
            size="small"
          >
            默认文字
          </Button>
          <Button icon="search" onClick={this.clickButton}>
            默认文字
          </Button>
          <Button icon="search" onClick={this.clickButton} size="small">
            默认文字
          </Button>
          <Button type="text" onClick={this.clickButton}>
            默认文字
          </Button>
          <Button type="text" size="small" onClick={this.clickButton}>
            默认文字
          </Button>
          <Button.Group>
            <Button className={styles.item} onClick={this.clickButton}>
              默认文字1
            </Button>
            <Button className={styles.item} onClick={this.clickButton}>
              默认文字2
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default App;
