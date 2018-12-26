import NotificationComp from '../notice/notification';

let notificationInstance: any;
let key = 1;

const getNotificationInstance = (callback: (i: any) => void) => {
  if (notificationInstance) {
    callback(notificationInstance);
    return;
  }
  NotificationComp.newInstance({ animationName: 'notification' }, (instance: any) => {
    notificationInstance = instance;
    callback(instance);
  });
}

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'notice';

interface INoticifationProps {
  content: string;
  duration?: number;
  type: NoticeType;
  isnotice?: boolean;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
}

const show = (args: INoticifationProps) => {
  const target = key++;

  const callback = () => {
    typeof args.onClose === 'function' && args.onClose();
  };

  getNotificationInstance(instance => {
    instance.notice(Object.assign({}, args, {
      key: target,
      style: {},
      onClose: callback
    }));
  });
}

const DEFAULT_ARGS = {
  duration: 5000,
  closable: true,
  isnotice: true
};

export const Notification = {
  info(args) {
    return show(Object.assign({}, DEFAULT_ARGS, args, {
      type: 'info'
    }));
  },
  warning(args) {
    return show(Object.assign({}, DEFAULT_ARGS, args, {
      type: 'warning'
    }));
  },
  success(args) {
    return show(Object.assign({}, DEFAULT_ARGS, args, {
      type: 'success'
    }));
  },
  error(args) {
    return show(Object.assign({}, DEFAULT_ARGS, args, {
      type: 'error'
    }));
  }
};
