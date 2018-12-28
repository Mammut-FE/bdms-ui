import React from 'react';
import { BackTop } from '../../../src';
import { Samples } from '../Demo';

const samples: Samples = [{
  title: '回到顶部',
  description: '滚动超过200px后出现，回到页面顶部后消失',
  component: () => {
    const target = () => {
      const nodes = document.getElementsByClassName('ma-layout__u-content');
      return nodes.length ? nodes[0] as HTMLElement : null;
    };

    return (
      <div id="back-top-demo" style={{ height: '2000px' }}>
        <BackTop target={target} />
      </div>
    );
  }
}];

export default samples;
