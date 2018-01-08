import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MixinComponent extends Component {
  parent() {
    return this.context.component;
  }

//   indexPath() {
//     let path = [this.props.index];
//     let parent = this.parent();

//     while (parent.instanceType !== 'Menu') {
//       if (parent.props.index) {
//         path.unshift(parent.props.index);
//       }

//       parent = parent.parent();
//     }

//     return path;
//   }

//   rootMenu() {
//     let parent = this.parent();

//     while (parent.instanceType !== 'Menu') {
//       parent = parent.parent();
//     }

//     return parent;
//   }
}

MixinComponent.contextTypes = {
  component: PropTypes.any
};