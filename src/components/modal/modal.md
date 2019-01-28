### 基本使用

通过 visible 控制 modal 显示或者隐藏

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
  }

  render() {
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

<Demo />;
```

### 快捷使用

有的时候你只关心用户打开了对话框这个操作，而不需要处理相关逻辑，那么可以通过 triggerNode 字段全权交给 Modal 处理。

```javascript
<Modal title="条款描述" triggerNode={<Button type="primary">Click Me</Button>} footer={null}>
  请阅读这些条款，blahblah
</Modal>
```

### 自定义 Footer

footer 支持 ReactNode 或者 null(不显示) 或者 Function，提供自定义的能力。

```javascript
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
```

### 大小控制

通过 size 字段控制大小，默认是 normal，也可以传入数字来使用固定的宽度，或者百分比字符串

```javascript
['mini', 'small', 'normal', 'large', 'fullscreen', 1200].map(size => (
  <Modal triggerNode={<Button>{size}</Button>} size={size} key={`size-${size}`}>
    size: {size}
  </Modal>
));
```

### 位置控制

通过 placement 字段控制模态框在顶部，底部，还是居中显示，默认是居中显示

```javascript
['top', 'center', 'bottom'].map(placement => (
  <Modal triggerNode={<Button>{placement}</Button>} placement={placement} key={`placement-${placement}`}>
    placement: {placement}
  </Modal>
));
```

### 滚动条位置控制

当内容体过长的时候，可以通过控制 scrollInModal 字段选择是让整个 Modal 滚动还是仅仅让内容在 Modal 内滚动并固定头部和尾部

```javascript
class Demo extends React.Component {
  constructor() {
    super();
    this.state = { body: false };
    this.toggle = () => this.setState({ body: !this.state.body });
  }

  render() {
    return (
      <React.Fragment>
        <Switch open={this.state.body} onChange={this.toggle} /> 是否在 Modal 内滚动
        <Modal title="滚动测试" scrollInModal={this.state.body} triggerNode={<Button>Show</Button>}>
          <Switch open={this.state.body} onChange={this.toggle} /> 是否在 Modal 内滚动
          {new Array(100).fill(0).map((_, index) => (
            <div key={index}>{index}</div>
          ))}
        </Modal>
      </React.Fragment>
    );
  }
}

<Demo />;
```

### 遮罩

隐藏 Mask，Mask 是否可点击关闭等等

```javascript
class Demo extends React.Component {
  constructor() {
    super();
    this.state = { mask: true, click: true };
  }
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

<Demo />;
```

### 内置类型

在 `Modal` 上面挂载了一些常用的静态方法用于直接显示常用的弹窗，比如 confirm/alert，支持回调和 promise 两种方式。

#### Modal.confirm

Modal.confirm() 返回一个 Promise，当用户点击确认按钮之后，promise resolved，用户拒绝或者关闭之后，promise rejected

```javascript
<Button onClick={() => Modal.confirm('删除', '确认删除么')}>删除</Button>
```

#### Modal.[info|success|warning|error]

内置了几种方便的提示，Modal.[info|success|warning|error]，同样返回 promise。
因为这里只是用于提示作用，所以当用户点击确认或者关闭按钮的时候，返回的 promise 不会被 reject，只会被 resolve。

```javascript
['info', 'success', 'warning', 'error'].map(type => (
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
));
```
