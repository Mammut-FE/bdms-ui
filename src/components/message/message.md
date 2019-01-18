# Message 非模态提示框

## Message API

| 属性     | 说明                       | 是否必须 | 类型      | 默认值 |
| -------- | -------------------------- | -------- | --------- | ------ |
| type     | 消息类型                   | 是       | string    | -      |
| content  | 提示内容                   | 是       | ReactNode | -      |
| icon     | 图标                       | 否       | ReactNode | -      |
| duration | 显示时长，单位 ms          | 否       | number    | 2000   |
| onClose  | 关闭事件，提示框消失后触发 | 否       | function  | -      |

## Message 示例

```javascript static
Message.info('这是一条提示信息');

Message.warning('这是一条警告信息', 3000);

Message.success('这是一条成功信息');

Message.error('这是一条错误信息');

Message.show({
  type: 'info',
  content: '这是一条测试消息'
});
```

### 顶部消息提示

```javascript
const { Button } = require('../button/button.tsx');
const { Message } = require('./message.tsx');
const showInfo = () => {
  Message.info('这是一条提示信息');
};

const showWarning = () => {
  Message.warning('这是一条警告信息');
};

const showSuccess = () => {
  Message.success('这是一条成功信息');
};

const showError = () => {
  Message.error('这是一条错误信息');
};

<Button.Group>
  <Button type="primary" onClick={showInfo}>
    提示信息
  </Button>
  <Button type="primary" onClick={showWarning}>
    警告信息
  </Button>
  <Button type="primary" onClick={showSuccess}>
    成功信息
  </Button>
  <Button type="primary" onClick={showError}>
    错误信息
  </Button>
</Button.Group>;
```

# Notification 右上角通知

## Notification API

| 属性     | 说明                       | 是否必须 | 类型      | 默认值 |
| -------- | -------------------------- | -------- | --------- | ------ |
| type     | 消息类型                   | 是       | string    | -      |
| title    | 通知标题                   | 是       | ReactNode | -      |
| content  | 提示内容                   | 是       | ReactNode | -      |
| icon     | 图标                       | 否       | ReactNode | -      |
| duration | 显示时长，单位 ms          | 否       | number    | 5000   |
| closable | 是否显示关闭按钮           | 否       | boolean   | true   |
| onClose  | 关闭事件，提示框消失后触发 | 否       | function  | -      |

## Notification 示例

```javascript static
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

Notification.show({
  type: 'info',
  title: '通知',
  content: '这是一条通知'
});
```

### 侧边消息通知

```javascript
const { Button } = require('../button');
const { Notification } = require('../notice/notification');

const showNotice = () => {
  Notification.info({
    title: '通知',
    content: '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息通知'
  });
};

const showErrorNotice = () => {
  Notification.show({
    type: 'error',
    title: '错误通知',
    content: '这是一条错误消息'
  });
};

<Button.Group>
  <Button type="primary" onClick={showNotice}>
    通知
  </Button>
  <Button type="primary" onClick={showErrorNotice}>
    错误通知
  </Button>
</Button.Group>;
```
