/*
 * @Author: jessica(hzgujing@corp.netease.com) 
 * @Date: 2018-01-09 10:08:34 
 * @Last Modified by: jessica(hzgujing@corp.netease.com)
 * @Last Modified time: 2018-01-09 14:17:06
 */
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MixinComponent extends Component {
  parent() {
    return this.context.component;
  }
}

MixinComponent.contextTypes = {
  component: PropTypes.any
};