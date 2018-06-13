/*
 * @Author: jessica(gujing_hy@163.com) 
 * @Date: 2018-06-06 13:43:25 
 * @Last Modified by: jessica(gujing_hy@163.com)
 * @Last Modified time: 2018-06-12 18:57:37
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MixinComponent extends Component {
  public static contextTypes = {
    component: PropTypes.any
  };
  public parent() {
    return this.context.component;
  }
}
