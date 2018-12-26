import React from 'react';
import { Samples } from '../Demo';
import { Button, Message, Notification } from '../../../src';

const showInfo = () => {
  Message.info('这是一条提示信息');
}

const showWarning = () => {
  Message.warning('这是一条警告信息');
}

const showSuccess = () => {
  Message.success('这是一条成功信息');
}

const showError = () => {
  Message.error('这是一条错误信息');
}

const showNotice = () => {
  Notification.info({
    title: '通知',
    content: '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息通知'
  });
}

const samples: Samples = [{
  title: '顶部消息提示',
  description: '这是顶部消息提示demo',
  component: () => (
    <Button.Group>
      <Button type="primary" onClick={showInfo}>提示信息</Button>
      <Button type="primary" onClick={showWarning}>警告信息</Button>
      <Button type="primary" onClick={showSuccess}>成功信息</Button>
      <Button type="primary" onClick={showError}>错误信息</Button>
    </Button.Group>
  )
}, {
  title: '侧边消息通知',
  description: '这是侧边消息通知demo',
  component: () => (
    <Button type="primary" onClick={showNotice}>通知</Button>
  )
}]

export default samples;

