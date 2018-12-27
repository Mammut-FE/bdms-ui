import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames/bind';
import styles from './notification.scss';
import Notice, { INoticeProps } from './notice';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface INotificationState {
  readonly notices: INoticeProps[]
};

interface INotificationProps {
  className?: string;
  style?: CSSProperties;
  animationName?: string;
}

let noticeNumber = 0;

const getUuid = () => {
  return "notification-" + new Date().getTime() + "-" + noticeNumber++;
};

const cx = classNames.bind(styles);

class Notification extends React.Component<INotificationProps, INotificationState> {

  public static defaultProps: Partial<INotificationProps> = {
    animationName: 'notice'
  };

  public static newInstance(props = {}, callback) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    let called = false;

    const ref = (notification) => {
      if (called) {
        return;
      }
      called = true;
      callback({
        notice(noticeProps: INoticeProps) {
          notification.add(noticeProps);
        },
        removeNotice(id: string) {
          notification.remove(id);
        },
        component: notification,
        destroy() {
          ReactDOM.unmountComponentAtNode(div);
          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }
      });
    }

    ReactDOM.render(<Notification {...props} ref={ref} />, div);
  }

  public readonly state: Readonly<INotificationState> = {
    notices: []
  };

  public add = (notice: INoticeProps) => {
    const { notices } = this.state;
    const cloneNotices = notices.concat();
    const id = notice.id ? notice.id : notice.id = getUuid();
    if (cloneNotices.every(item => item.id !== id)) {
      cloneNotices.push(notice);
      this.setState({ notices: cloneNotices });
    }
  };

  public remove = (id: string) => {
    this.setState((previousState: INotificationState) => {
      return {
        notices: previousState.notices.filter(notice => notice.id !== id),
      };
    });
  };

  public render() {
    const { className, style, animationName } = this.props;
    const { notices } = this.state;

    const noticeNodes = notices.map((notice, index) => {
      const onClose = () => {
        this.remove.call(this, notice.id);
        if (notice.onClose) {
          notice.onClose();
        }
      };
      return (
        <Notice
          key={notice.id}
          {...notice}
          onClose={onClose}
        />
      );
    });

    const classes = cx('u-notification', className);

    return (
      <div className={classes} style={style}>
        <ReactCSSTransitionGroup
          transitionName={animationName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {noticeNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Notification;
