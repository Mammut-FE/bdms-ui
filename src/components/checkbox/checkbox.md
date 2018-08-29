# checkbox 多选框

## 何时使用

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。

## API

### Checkbox

| 属性            | 说明                                                                          | 类型     | 默认值     |
| --------------- | ----------------------------------------------------------------------------- | -------- | ---------- |
| value           | checkbox 的 value 值，必传                                                    | string   | -          |
| disabled        | checkbox 的失效状态                                                           | boolean  | false      |
| checked         | 指定当前是否选中                                                              | boolean  | false      |
| isIndeterminate | 设置 indeterminate 状态，只负责样式控制                                       | boolean  | true       |
| className       | 样式名                                                                        | string   | -          |
| mode            | 设置 checkbox 呈内联水平放置还是垂直竖直放置，可选值为 horizontal 和 vertical | string   | horizontal |
| onChange        | 变化时回调函数                                                                | function | -          |

### Checkbox Group

```javascript
interface ICheckData {
  checked: boolean;
  value: string;
  disabled?: boolean;
  text?: string; // 显示的checkbox内容，若为空，则默认显示value值
  [propName: string]: any;
}
```

| 属性          | 说明                                                                          | 类型     | 默认值     |
| ------------- | ----------------------------------------------------------------------------- | -------- | ---------- |
| data          | checkbox 属性值，结构类似 ICheckData                                          | string   | -          |
| indeterminate | 是否显示 indeterminate 控制                                                   | boolean  | true       |
| className     | 样式名                                                                        | string   | -          |
| mode          | 设置 checkbox 呈内联水平放置还是垂直竖直放置，可选值为 horizontal 和 vertical | string   | horizontal |
| onChange      | 变化时回调函数                                                                | function | -          |
