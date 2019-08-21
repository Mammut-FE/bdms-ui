import * as React from 'react';
import { Component, Fragment } from 'react';
import { Button } from '../../../src/components/button';
import { Icon } from '../../../src/components/icon';
import { Modal } from '../../../src/components/modal';
import { Switch } from '../../../src/components/switch';
import { Samples } from '../Demo';

const samples: Samples = [
  {
    title: '基本使用方式',
    description: '通过 visible 控制 modal',
    component: class extends Component {
      public state = { visible: false };
      public render() {
        return (
          <div>
            <Button onClick={() => this.setState({ visible: true })}>Open Modal</Button>
            <Modal
              visible={this.state.visible}
              onOk={() => this.setState({ visible: false })}
              onCancel={() => this.setState({ visible: false })}
              title="这里是标题"
            >
              这里是内容，你可以控制显示
            </Modal>
          </div>
        );
      }
    }
  },
  {
    title: '快捷触发',
    description:
      '有的时候你只关心用户打开了对话框这个操作，而不需要处理相关逻辑，那么可以通过 triggerNode 字段全权交给 Modal 处理。',
    component: () => (
      <Modal title="条款描述" triggerNode={<Button type="primary">Click Me</Button>} footer={null}>
        请阅读这些条款，blahblah
      </Modal>
    )
  },
  {
    title: '自定义 Footer',
    description: 'footer 支持 ReactNode 或者 null(不显示) 或者 Function，提供自定义的能力。',
    component: () => (
      <Fragment>
        <Modal triggerNode={<Button>footer = null</Button>} footer={null} key="null">
          不显示 Footer
        </Modal>
        <Modal
          triggerNode={<Button>footer = ReactNode</Button>}
          footer={
            <div>
              可以显示一段文字，或者图标 <Icon name="ok" />
              ，默认右对齐
            </div>
          }
          key="react-node"
        >
          显示其他的内容
        </Modal>
        <Modal
          triggerNode={<Button>footer = function</Button>}
          footer={props => (
            <div>
              {props.cancelButton()}
              {props.okButton({ size: 'small' })}
              <Button type="text" onClick={props.onOk}>
                Same As Ok
              </Button>
            </div>
          )}
          key="function"
        >
          修改了顺序，自定义 props，通过传入的属性，可以让其他的元素同样具有 ok/cancel 的功能。
        </Modal>
      </Fragment>
    )
  },
  {
    title: '大小控制',
    description: '通过 size 字段控制大小，默认是 normal',
    component: () => (
      <Fragment>
        {['mini', 'small', 'normal', 'large', 'fullscreen', 1200].map((size: any) => (
          <Modal triggerNode={<Button>{size}</Button>} size={size} key={`size-${size}`}>
            size: {size}
          </Modal>
        ))}
      </Fragment>
    )
  },
  {
    title: '位置控制',
    description: '通过 placement 字段控制模态框在顶部，底部，还是居中显示，默认是居中显示',
    component: () => (
      <Fragment>
        {['top', 'center', 'bottom'].map((placement: any) => (
          <Modal triggerNode={<Button>{placement}</Button>} placement={placement} key={`placement-${placement}`}>
            placement: {placement}
          </Modal>
        ))}
      </Fragment>
    )
  },
  {
    title: '滚动条位置控制',
    description:
      '当内容体过长的时候，可以通过控制 scrollInModal 字段选择是让整个 Modal 滚动还是仅仅让内容在 Modal 内滚动并固定头部和尾部',
    component: class extends Component {
      public state = { body: false };
      public toggle = () => this.setState({ body: !this.state.body });
      public render() {
        return (
          <Fragment>
            <Switch open={this.state.body} onChange={this.toggle} /> 是否在 Modal 内滚动
            <Modal title="滚动测试" scrollInModal={this.state.body} triggerNode={<Button>Show</Button>}>
              <Switch open={this.state.body} onChange={this.toggle} /> 是否在 Modal 内滚动
              {new Array(100).fill(0).map((_, index) => (
                <div key={index}>{index}</div>
              ))}
            </Modal>
          </Fragment>
        );
      }
    }
  },
  {
    title: '配置 Mask',
    description: '隐藏 Mask，Mask 是否可点击关闭等等',
    component: class extends Component {
      public state = { mask: true, click: true };
      public render() {
        return (
          <Fragment>
            <div>
              <Switch open={this.state.mask} onChange={open => this.setState({ mask: open })} />
              显示遮罩
            </div>
            <div>
              <Switch open={this.state.click} onChange={open => this.setState({ click: open })} />
              可点击关闭
            </div>
            <Modal maskCloseable={this.state.click} hideMask={!this.state.mask} triggerNode={<Button>Show</Button>}>
              Mash: {this.state.mask + ''}
              <br />
              Closeable: {this.state.click + ''}
            </Modal>
          </Fragment>
        );
      }
    }
  },
  {
    title: 'confirm',
    description: 'Modal.confirm() 返回一个 Promise，当用户通过之后，promise resolved，用户拒绝之后，promise rejected',
    component: () => <Button onClick={() => Modal.confirm('删除', '确认删除么')}>删除</Button>
  },
  {
    title: 'alert 提示',
    description: '内置了几种方便的提示，Modal.[info|success|warning|error]，同样返回 promise，但是不会被 reject',
    component: () => (
      <Fragment>
        {['info', 'success', 'warning', 'error'].map(type => (
          <Button
            key={type}
            onClick={() =>
              Modal[type]({
                title: type + ' 类型',
                content: type + ' 内容体'
              })
            }
          >
            {type}
          </Button>
        ))}
      </Fragment>
    )
  }
];

export default samples;
