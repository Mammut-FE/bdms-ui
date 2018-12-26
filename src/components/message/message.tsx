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
  content: string;
  duration?: number;
  type: NoticeType;
  isnotice?: boolean;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
}

const show = (args: IMessageProps) => {
  const target = key++;

  const callback = () => {
    typeof args.onClose === 'function' && args.onClose();
  };

  getMessageInstance(instance => {
    instance.notice(Object.assign({}, args, {
      key: target,
      style: {},
      onClose: callback
    }));
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
  notice(args) {
    return show(Object.assign({
      duration: 5000,
      closable: true
    }, args, {
      isnotice: true
    }));
  }
};
