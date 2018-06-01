/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2017-10-18 14:18:29
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-05-30 19:22:51
 */
import React, { Component } from 'react';
import styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return (<div className={styles.wrap}>
        <div className={styles.sidebar}>
          sidebar
        </div>
        <div className={styles.main}>
          main
        </div>
      </div>);
  }
}

export default App;
