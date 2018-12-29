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

interface INotificationNoTypeProps {
  content: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  title?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}
interface INotificationProps extends INotificationNoTypeProps {
  type: NoticeType;
}

const DEFAULT_ARGS = {
  type: 'info',
  duration: 5000,
  closable: true
};

const show = (args: INotificationProps) => {
  const target = key++;

  const callback = () => {
    if (typeof args.onClose === 'function') {
      args.onClose();
    }
  };

  getNotificationInstance(instance => {
    instance.notice({
      ...DEFAULT_ARGS,
      ...args,
      isNotice: true,
      key: target,
      style: {},
      onClose: callback
    });
  });
}

export const Notification = {
  info(args: INotificationNoTypeProps) {
    return show({
      ...args,
      type: 'info'
    });
  },
  warning(args: INotificationNoTypeProps) {
    return show({
      ...args,
      type: 'warning'
    });
  },
  success(args: INotificationNoTypeProps) {
    return show({
      ...args,
      type: 'success'
    });
  },
  error(args: INotificationNoTypeProps) {
    return show({
      ...args,
      type: 'error'
    });
  },
  show(args: INotificationProps) {
    return show(args);
  }
};
