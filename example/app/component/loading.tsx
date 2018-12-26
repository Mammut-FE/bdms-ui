import * as React from 'react';
import { Icon } from '../../../src/components/icon';
import { Loading } from '../../../src/components/loading';
import { Samples } from '../Demo';
import { Row, Col, Button } from '../../../src';

const samples: Samples = [
  {
    title: '基础使用',
    description:
      '不带任何参数可以正常使用，内置了两种 indicator，"cube" 和 "circle"，默认是 "circle"，支持自定义。其中 "circle" 支持自定义大小',
    component: () => (
      <div>
        <div>
          <Loading />
          <Loading indicator="cube" />
          <Loading indicator={<Icon name="right" />} />
        </div>
        <div>
          <p>只有 "circle" 类型支持大小号的调节</p>
          <Loading size="small" tip="小号" />
          <Loading size="normal" tip="正常号" />
          <Loading size="large" tip="大号" />
        </div>
      </div>
    )
  },
  {
    title: 'tip 设置',
    description: '通过添加 tip，可以在右侧显示小提示信息',
    component: () => (
      <Row>
        <Col xl={6}>
          <Loading tip="加载中..." />
        </Col>
        <Col xl={6}>
          <Loading tip="75%" />
        </Col>
      </Row>
    )
  },
  {
    title: '容器使用',
    description:
      '通过 children 传入一个元素，可以包裹这个元素加载。通过 message 可以设置下方显示文字。通过设置 delay 只有当超过一定时间之后才显示加载中。',
    component: class extends React.Component {
      public state = { loading: false };
      public onToggle = () => this.setState({ loading: !this.state.loading });
      public render() {
        return (
          <div>
            <Button onClick={this.onToggle}>Toggle</Button>
            <Loading message="加载中" tip="20%" loading={this.state.loading} delay={300}>
              <div style={{ height: 120, background: 'red' }} />
            </Loading>
          </div>
        );
      }
    }
  },
  {
    title: '全屏使用',
    description: '设置 fullscreen 字段以全屏方式显示加载。忽略 children',
    component: class extends React.Component {
      public state = { loading: false };
      public onShown = () => this.setState({ loading: true });
      public onHide = () => this.setState({ loading: false });
      public render() {
        return (
          <div>
            <Button onClick={this.onShown}>Shown Loading</Button>
            <Loading
              loading={this.state.loading}
              indicator="cube"
              fullscreen={true}
              message={
                <span>
                  全屏加载中，点击
                  <a href="javascript:void 0;" onClick={this.onHide}>
                    这里
                  </a>
                  取消
                </span>
              }
            />
          </div>
        );
      }
    }
  },
  {
    title: 'Timeout',
    description: '可以设置一个 Loading 的超时时间，方便做 Cancel 或者其他操作',
    component: class extends React.Component {
      public state = { loading: false, timeout: false };
      public onShown = () =>
        this.setState({
          loading: true,
          timeout: false
        });
      public onTimeout = () => {
        // Cancel Request
        this.setState({ timeout: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      };
      public render() {
        return (
          <div>
            <Button onClick={this.onShown}>Shown</Button>
            <Loading
              loading={this.state.loading}
              timeout={3000}
              message={!this.state.timeout ? '请求数据中，请等待 3s' : '请求超时，请重试'}
              onTimeout={this.onTimeout}
            >
              <div style={{ height: 100, background: 'blue' }} />
            </Loading>
          </div>
        );
      }
    }
  }
];

export default samples;
