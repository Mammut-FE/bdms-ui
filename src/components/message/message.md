# Message 非模态提示框

## Message API
| 属性     | 说明                                                  | 是否必须 | 类型     | 默认值  |
| -------- | ----------------------------------------------------- | ------ | -------- | ------- |
| content     | 提示内容                                    | 是 | string   | -       |
| duration | 显示时长，单位ms                                       | 否 | number  | 2000   |
| onClose     | 关闭事件，提示框消失后触发 | 否 | function   | - |

## Message 示例
```
Message.info('这是一条提示信息');

Message.warning('这是一条警告信息', 3000);

Message.success('这是一条成功信息');

Message.error('这是一条错误信息');
```

# Notification 右上角通知

## Notification API
| 属性     | 说明                                                  | 是否必须 | 类型     | 默认值  |
| -------- | ----------------------------------------------------- | -------- | -------- | ------- |
| title     | 通知标题                                   | 是 | string   | -       |
| content     | 提示内容                                  | 是 | string   | -       |
| duration | 显示时长，单位ms                                        | 否 | number  | 5000   |
| closable     | 是否显示关闭按钮        | 否 | boolean   | true  |
| onClose     | 关闭事件，提示框消失后触发 | 否 | function   | - |

## Notification 示例
```
Notification.info({
  title: '通知',
  content: '这是一条提示通知'
});

Notification.warning({
  title: '通知',
  content: '这是一条警告通知',
  duration: 3000
});

Notification.success({
  title: '通知',
  content: '这是一条成功通知'
});

Notification.error({
  title: '通知',
  content: '这是一条错误通知'
});
```
