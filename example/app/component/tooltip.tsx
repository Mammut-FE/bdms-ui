import React from 'react';
import { Button } from '../../../src/components/button';
import { Input } from '../../../src/components/input';
import { IconTooltip, Tooltip } from '../../../src/components/tooltip';
import { Samples } from '../Demo';

const samples: Samples = [
  {
    title: '简单使用',
    description: '设置 content 即可',
    component: () => (
      <Tooltip content="This is tooltip">
        <span>This is a text, hover me</span>
      </Tooltip>
    )
  },
  {
    title: '12种方向可选',
    description: '通过设置 placement 设置不同的方向',
    component: () => (
      <div>
        {[
          ['', 'topLeft', 'top', 'topRight', ''],
          ['leftTop', '', '', '', 'rightTop'],
          ['left', '', '', '', 'right'],
          ['leftBottom', '', '', '', 'rightBottom'],
          ['', 'bottomLeft', 'bottom', 'bottomRight', '']
        ].map(line => (
          <div key={line.join()} style={{ display: 'flex', flexDirection: 'row' }}>
            {line.map((placement: any, index) => (
              <div style={{ padding: 16, flex: '1 1 auto', textAlign: 'center' }} key={`${placement}${index}`}>
                {placement && (
                  <Tooltip placement={placement} content={placement}>
                    <span>{placement}</span>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  },
  {
    title: '类型大小可选',
    description: '通过 size=small/normal/large 控制大小，通过 type=normal/error/warning 控制类型',
    component: () => (
      <div>
        <Tooltip size="small" content="小小的提示">
          <Button>小，普通类型</Button>
        </Tooltip>
        <Tooltip type="warning" content="中等的警告">
          <Button>正常大小，警告类型</Button>
        </Tooltip>
        <Tooltip type="error" size="large" content="巨大的错误">
          <Button>大，错误类型</Button>
        </Tooltip>
      </div>
    )
  },
  {
    title: 'IconTooltip',
    description: '封装常用用法，一个图标的提示信息',
    component: () => (
      <div>
        <IconTooltip>这是一个提示信息</IconTooltip>
        <IconTooltip size="small" type="error" placement="bottomLeft">
          几乎支持 Tooltip 的所有参数
        </IconTooltip>
        <IconTooltip icon="right-double" type="warning" placement="rightTop">
          你也可以自定义图标
        </IconTooltip>
      </div>
    )
  },
  {
    title: '触发方式',
    description: '通过 trigger 设置触发方式',
    component: () => (
      <div>
        <Tooltip trigger="click" content="Click Trigger">
          <Button>Click</Button>
        </Tooltip>
        <Tooltip trigger="hover" content="Hover Trigger">
          <Button>Hover</Button>
        </Tooltip>
        <Tooltip trigger="focus" content="Focus Trigger">
          <Input placeholder="Input something" />
        </Tooltip>
        <Tooltip trigger="contextMenu" content="ContextMenu Trigger">
          <Button>Try right click</Button>
        </Tooltip>
      </div>
    )
  },
  {
    title: '可控状态',
    description: '通过设置 visible 进入可控状态',
    component: class extends React.Component {
      public state = {
        visible: false
      };

      public toggle = () => {
        this.setState({ visible: !this.state.visible });
      };

      public render() {
        return (
          <div>
            <Tooltip content="Controllable Component" visible={this.state.visible} placement="left">
              <Button onClick={this.toggle}>Toggle</Button>
            </Tooltip>
            &nbsp;
            {this.state.visible ? 'Shown' : 'Hidden'}
          </div>
        );
      }
    }
  }
];

export default samples;
