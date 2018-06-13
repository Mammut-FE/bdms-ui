# Menu 组件接口说明

## props

```javascript
interface IMenuProps {
  className?: string;
  selected?: string; // 初始化默认选中的key值
  withCheck?: boolean; // menu的item项是否含有chekbox
  style?: CSSProperties; // 嵌入的样式
  tickSelect?: boolean; // 打勾选择
  onCommand?: (key: string, instance: Component) => void; // 点击item项目的回调函数
  onCheck?: (checkItem: any[]) => void; //当item项目中有checkbox时的回调
}
```

## MenuItem

```javascript
interface IMenuItemProps {
  className?: string;
  children?: any;
  disabled?: boolean; // 是否禁用选项
  divided?: boolean; //是否包含分隔
  iconName?: string; //若有图标，图标icon名称
  command?: string; // 选项的关键key，判断是否选中就用这个字段
  subDesc?: string; // 描述信息，在item右边的小字补充信息
}
```

## 示例

```javascript
<Menu selected="1" tickSelect={true}>
  <Menu.Item command="1">项目一</Menu.Item>
  <Menu.Item command="2">项目二</Menu.Item>
  <Menu.Item command="3" divided={true}>
    项目三
  </Menu.Item>
  <Menu.Item command="4">项目四</Menu.Item>
  <Menu.Item command="5">项目五</Menu.Item>
</Menu>
```

## 当 menu 带有 checkbox 时，写法：

```javascript
<Menu withCheck={true} onCheck={this.checkMenuItem}>
  <Checkbox.Group
    box={true}
    data={[
      { value: '选项一', checked: false },
      { value: '选项二', checked: true },
      { value: '选项三', checked: false },
      { value: '选项四', checked: false },
      { value: '选项五', checked: false },
      { value: '选项六', checked: false }
    ]}
    onChange={this.checkGroupChange} //该函数返回所有checked的列表，具体列表数据同checkbox.group组件
  />
</Menu>
```
