# Tabs 标签页

## API

### Tabs

|   属性    | 说明               | 是否必须 | 类型     | 默认值  |
| --------  | ------------------ | ------- | -------- | ------- |
| activeKey | 当前选中标签页的key | 否 | string | 第一个Tab的tabKey属性 |
| onChange | (activeKey: string) => void | 否 | Function | - |

### Tabs

| 属性     | 说明                | 是否必须 | 类型     | 默认值  |
| -------- | -------------------- | ------ | -------- | ------- |
| title | 标签页的名称 | 是 | ReactNode \| string | - |
| tabKey | 标签页的唯一标识，和activeKey对应 | 是 | string | - |
| disabled | 是否禁用 | 否 | boolean | false |
| forceRender | 非active状态下的标签页内容是否渲染的标志 | 否 | boolean | false |
| badge | 标签页名称后面标识数量的标志 | 否 | number | - |

## 示例

```jsx
function handleChange(activeKey) {
  alert(`选中${activeKey}`);
}

<Tabs activeKey="0" onChange={handleChange}>
  <Tabs.Tab title='tab01' tabKey='1'>
    <p>tab01</p>
    <div>abc</div>
  </Tabs.Tab>
  <Tabs.Tab disabled={true} title='tab02' tabKey='2' forceRender={true}>
    tab02 disabled
  </Tabs.Tab>
  <Tabs.Tab title='tab03' tabKey='3' badge={20}>
    tab03
  </Tabs.Tab>
  <Tabs.Tab title='tab04' tabKey='4'>
    tab04
  </Tabs.Tab>
</Tabs>
```
