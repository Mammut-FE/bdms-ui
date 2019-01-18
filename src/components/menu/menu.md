### 水平菜单

```javascript
<Menu mode="horizontal">
  <Menu.Item value="数据开发">数据开发</Menu.Item>
  <Menu.Item value="任务运维">任务运维</Menu.Item>
  <Menu.Item value="自助分析">自助分析</Menu.Item>
  <Menu.Item value="数据管理">数据管理</Menu.Item>
  <Menu.Item value="实时流计算">实时流计算</Menu.Item>
  <Menu.SubMenu title="sub" isRoot={true}>
    <Menu.Item value="sub-2-1">子目录一</Menu.Item>
    <Menu.Item value="sub-2-2">子目录二</Menu.Item>
    <Menu.SubMenu title="sub2">
      <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
      <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
      <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
    </Menu.SubMenu>
  </Menu.SubMenu>
  <Menu.Item value="项目中心">项目中心</Menu.Item>
</Menu>
```

### 菜单

```javascript
const { Row, Col } = require('../grid');

<Row>
  <Col xs={6}>
    <Menu isTick={true}>
      <Menu.SubMenu title="sub" subtitle="test">
        <Menu.Item value="sub-2-1">子目录一</Menu.Item>
        <Menu.Item value="sub-2-2">子目录二</Menu.Item>
        <Menu.SubMenu title="sub2">
          <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
          <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
          <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item value="2" subtitle="复制">
        dsdf
      </Menu.Item>
      <Menu.Item value="3">dsdf</Menu.Item>
      <Menu.Item value="4">dsdf</Menu.Item>
      <Menu.Divider />
      <Menu.ItemGroup title="组一">
        <Menu.Item value="5">dsdf</Menu.Item>
        <Menu.Item value="6">dsdf</Menu.Item>
        <Menu.Item value="7">dsdf</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item value="8">dsdf</Menu.Item>
      <Menu.Item value="9">dsdf</Menu.Item>
      <Menu.Item value="10">dsdf</Menu.Item>
      <Menu.Item value="11">dsdf</Menu.Item>
      <Menu.Item value="12">dsdf</Menu.Item>
      <Menu.Item value="13">dsdf</Menu.Item>
      <Menu.Item value="14">dsdf</Menu.Item>
      <Menu.Item value="15">dsdf</Menu.Item>
      <Menu.Item value="16">dsdf</Menu.Item>
      <Menu.Item value="17">dsdf</Menu.Item>
      <Menu.Item value="18">dsdf</Menu.Item>
      <Menu.Item value="19">dsdf</Menu.Item>
      <Menu.Item value="20">dsdf</Menu.Item>
      <Menu.Item value="21">dsdf</Menu.Item>
      <Menu.Item value="22">dsdf</Menu.Item>
      <Menu.Item value="23">dsdf</Menu.Item>
    </Menu>
  </Col>
  <Col xs={6}>
    <Menu selected="3">
      <Menu.Item value="1" icon="table" disabled={true}>
        dsdf
      </Menu.Item>
      <Menu.Item value="2">dsdf</Menu.Item>
      <Menu.SubMenu title="sub" subtitle="test">
        <Menu.Item value="sub-2-1">子目录一</Menu.Item>
        <Menu.Item value="sub-2-2">子目录二</Menu.Item>
        <Menu.SubMenu title="sub2">
          <Menu.Item value="sub2-2-1">子目录一</Menu.Item>
          <Menu.Item value="sub2-2-2">子目录二</Menu.Item>
          <Menu.Item value="sub2-2-3">子目录三</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item value="3">dsdf</Menu.Item>
      <Menu.Item value="4">dsdf</Menu.Item>
      <Menu.Divider />
      <Menu.ItemGroup title="组一">
        <Menu.Item value="5">dsdf</Menu.Item>
        <Menu.Item value="6">dsdf</Menu.Item>
        <Menu.Item value="7">dsdf</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item value="8">dsdf</Menu.Item>
      <Menu.Item value="9">dsdf</Menu.Item>
    </Menu>
  </Col>
</Row>;
```

### 内联带链接的菜单

```javascript
<Menu mode="inline">
  <Menu.Item value="1">
    <a href="javascript: void(0);">测试连接</a>
  </Menu.Item>
  <Menu.Item value="2">
    <a href="javascript: void(0);">测试连接</a>
  </Menu.Item>
  <Menu.SubMenu title="sub" subtitle="test">
    <Menu.Item value="sub-2-1">
      <a href="javascript: void(0);">子目录一</a>
    </Menu.Item>
    <Menu.Item value="sub-2-2">
      <a href="javascript: void(0);">子目录一</a>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.Item value="3">
    <a href="javascript: void(0);">测试连接</a>
  </Menu.Item>
  <Menu.Item value="4">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
  <Menu.Item value="5">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
  <Menu.Item value="6">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
  <Menu.Item value="7">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
  <Menu.Item value="8">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
  <Menu.Item value="9">
    <a href="javascript: void(0);">子目录一</a>
  </Menu.Item>
</Menu>
```

### 多选菜单

```javascript
<Menu multiple={true} hasCheckBox={true}>
  <Menu.Item value="haha">哈哈</Menu.Item>
  <Menu.Item value="haha2">哈哈2</Menu.Item>
</Menu>
```
