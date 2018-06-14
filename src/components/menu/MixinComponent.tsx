/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:25 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-13 14:51:35
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MixinComponent<IProps, IStates> extends Component<IProps, IStates> {
  public static contextTypes = {
    component: PropTypes.any
  };
  public parent() {
    return this.context.component;
  }
}
