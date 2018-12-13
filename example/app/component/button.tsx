import { Samples } from '../Demo';
import { Button } from '../../../src';
import * as React from 'react';
import DemoRow from '../DemoRow';

function defaultClick() {
  alert('You clicked');
}

const samples: Samples = [
  {
    title: '普通按钮',
    description: '普通按钮示例',
    component: () => <Button>按钮</Button>
  },
  {
    title: '有 Icon 按钮',
    description: '有 Icon',
    component: () => <Button icon="add">有icon</Button>
  },
  {
    title: '各个状态的按钮',
    description: '有 primary, default, text',
    component: () => (
      <div>
        <Button type="primary">primary</Button>
        <Button type="default">default</Button>
        <Button type="text">text</Button>
      </div>
    )
  },
  {
    title: '大小控制',
    description: '通过 size 控制大小，有 small, normal',
    component: () => (
      <div>
        {['small', 'normal'].map((size: any) => (
          <DemoRow>
            {['primary', 'default', 'text'].map((type: any) => (
              <Button size={size} type={type}>
                {type} - {size}
              </Button>
            ))}
          </DemoRow>
        ))}
      </div>
    )
  },
  {
    title: '超链接',
    description: '通过 href 和 target 可以指定按钮的链接',
    component: () => (
      <div>
        <Button type="text" href="http://www.baidu.com">
          Go to baidu.com
        </Button>
        <Button type="text" size="small" href="http://www.baidu.com" target="_blank">
          Go to baidu.com with target = _blank
        </Button>
      </div>
    )
  },
  {
    title: '按钮组',
    description: 'Button.Group 按钮组',
    component: () => (
      <div>
        <DemoRow>
          <Button.Group>
            <Button onClick={defaultClick}>默认文字1</Button>
            <Button onClick={defaultClick}>默认文字2</Button>
            <Button onClick={defaultClick}>默认文字3</Button>
          </Button.Group>
        </DemoRow>
        <DemoRow>
          <Button.Group>
            <Button type="primary" onClick={defaultClick}>
              默认文字1
            </Button>
            <Button type="primary" onClick={defaultClick}>
              默认文字2
            </Button>
            <Button type="primary" onClick={defaultClick}>
              默认文字3
            </Button>
          </Button.Group>
        </DemoRow>
      </div>
    )
  }
];

export default samples;
