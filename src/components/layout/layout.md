# layout 布局

##  用法示例

```javascript
<Layout>
  <Header style={{ backgroundColor: '#09f', color: '#fff', height: '80px' }}>头部</Header>
  <Content>
    <Layout hasSider={true}>
      <Sider draggable={false}>侧边</Sider>
      <Content>内容</Content>
    </Layout>
  </Content>
  <Footer>底部</Footer>
</Layout>
```

## API

interface ISiderProps {
className?: string;
style?: React.CSSProperties;
width?: number; // 组件宽度
maxWidth?: number; // 可拖拽的最大宽度，仅当 draggable 为 true 有效，若不存在则为 560（窗口大于 1280）或窗口宽-680（窗口小于 1280）
minWidth?: number; // 可拖拽的最小宽度
draggable?: boolean;
}

### Layout

| 属性      | 说明                 | 类型                | 默认值 |
| --------- | -------------------- | ------------------- | ------ |
| className | 样式名               | string              | -      |
| style     | 指定样式             | React.CSSProperties | -      |
| hasSider  | 表示子元素里有 Sider | boolean             | false  |

### Header, Footer, Content

| 属性      | 说明     | 类型                | 默认值 |
| --------- | -------- | ------------------- | ------ |
| className | 样式名   | string              | -      |
| style     | 指定样式 | React.CSSProperties | -      |

### Layout.Sider 侧边栏

| 属性      | 说明                                                                                                     | 类型                | 默认值 |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| className | 样式名                                                                                                   | string              | -      |
| style     | 指定样式                                                                                                 | React.CSSProperties | -      |
| width     | 组件宽度                                                                                                 | number              | 240    |
| maxWidth  | 组件可拖拽的最大宽度，仅当 draggable 为 true 时有效，若窗口大于 1280，则值为 560，否则，值为窗口宽度-680 | number              | 240    |
| minWidth  | 组件最小宽度                                                                                             | number              | 200    |
| draggable | 是否可拖拽                                                                                               | boolean             | false  |
