### 基本使用方式

如果不输入 value，那么是自主模式，如果输入 value，那么就是受控模式

```javascript
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '受控模式'
    };

    this.onChange = text => {
      this.setState({ text });
    };
  }

  render() {
    return (
      <div>
        <Input defaultValue="Default Value" onChange={console.log} />
        <Input placeholder="Input Here" />
        <Input value="固定值" />
        <Input value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}

<Demo />;
```

### 前置后置标签

通过 prefix 和 suffix 指定标签

```javascript
const { Icon } = require('../icon');
<>
  <Input suffix="/" />
  <Input prefix="@" suffix={<Icon name="left" />} />
</>;
```

### 大小控制

支持 size = normal | large | small

```javascript
<>
  <Input size="small" defaultValue="small" suffix="/" />
  <Input size="normal" defaultValue="normal" prefix="@" />
  <Input size="large" defaultValue="large" prefix="@" suffix="/" />
</>
```
