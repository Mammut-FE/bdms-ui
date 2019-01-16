import { Samples } from '../Demo';
import { Tabs } from '../../../src';
import * as React from 'react';

const samples: Samples = [
  {
    title: '标签页',
    description: 'tabs切换',
    component: () => {
      function handleChange(activeKey) {
        alert(`选中${activeKey}`);
      }
      return (
        <Tabs activeKey="0" onChange={handleChange}>
          <Tabs.Tab title='tab01' tabKey='1'>
            <p>tab01</p>
            <div>abc</div>
          </Tabs.Tab>
          <Tabs.Tab disabled={true} title='tab02' tabKey='2' forceRender={true}>
            tab02 disabled
          </Tabs.Tab>
          <Tabs.Tab title='tab03' tabKey='3' badge={20}>
            tab03
          </Tabs.Tab>
          <Tabs.Tab title='tab04' tabKey='4'>
            tab04
          </Tabs.Tab>
        </Tabs>
      );
    }
  }
];

export default samples;
