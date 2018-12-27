import Notification from '../notice/notification';

let messageInstance: any;
let key = 1;

const getMessageInstance = (callback: (i: any) => void) => {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance({}, (instance: any) => {
    messageInstance = instance;
    callback(instance);
  });
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'notice';

interface IMessageProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  type: NoticeType;
  onClose?: () => void;
}

const show = (args: IMessageProps) => {
  const target = key++;

  const callback = () => {
    if (typeof args.onClose === 'function') {
      args.onClose();
    }
  };

  getMessageInstance(instance => {
    instance.notice({
      ...args,
      key: target,
      style: {},
      onClose: callback
    });
  });
}

export const Message = {
  info(content: string, duration?: number, onClose?: () => void) {
    return show({
      type: 'info',
      content, duration, onClose
    });
  },
  warning(content: string, duration?: number, onClose?: () => void) {
    return show({
      type: 'warning',
      content, duration, onClose
    });
  },
  success(content: string, duration?: number, onClose?: () => void) {
    return show({
      type: 'success',
      content, duration, onClose
    });
  },
  error(content: string, duration?: number, onClose?: () => void) {
    return show({
      type: 'error',
      content, duration, onClose
    });
  },
  show(args: IMessageProps) {
    return show(args);
  }
};
