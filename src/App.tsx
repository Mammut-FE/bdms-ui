/*
 * @Author: jessica(hzgujing@corp.netease.com)
 * @Date: 2017-10-18 14:18:29
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-05-30 19:22:51
 */
import { Cartesian, Detail, Example, Library } from '@compositor/kit';
import React, { Component } from 'react';
import styles from './App.scss';

import Button from './components/button/Button';

class App extends Component {
  constructor(props) {
    super(props);
  }

  public clickButton() {
    console.log('button click');
  }

  public render() {
    return (<Library>
      <Example name={'button'}>
        <Button>按钮</Button>
        <Detail>
          <Cartesian component={Button}
                     type={['primary', 'default']}
                     size={['small', 'normal']}
                     children={['默认文字']}
                     onClick={this.clickButton}/>
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
    </Library>);
  }
}

export default App;
