import cnb from 'classnames/bind';
import * as React from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { isReactNode } from '../../lib/util';
import { Icon } from '../icon';
import Modal, { ModalProps } from './modal';
import styles from './modal.scss';

const cx = cnb.bind(styles);
const ALERT_ICON_MAP = new Map<AlertType, string>([
  ['info', 'warning'],
  ['success', 'ok'],
  ['warning', 'warning'],
  ['error', 'error']
]);

export type BuiltinModalOptions = ModalProps & {
  content?: ReactNode;
};

export type DialogFuncResult<P = BuiltinModalOptions, D = void> = Promise<D> & {
  destroy: () => void;
  update: (props: P) => void;
  noReject: Promise<{
    error: Error | null;
    data?: D;
  }>;
};

export type AlertType = 'info' | 'error' | 'warning' | 'success';

export interface DialogFunc<I> {
  /**
   * 参数选项，和 ModalProps 基本一致
   * @param options
   */
  (options: I): DialogFuncResult<I>;

  /**
   * 简便调用
   * @param title 标题
   * @param options 参数
   */
  (title: ReactNode, options?: I): DialogFuncResult<I>;

  /**
   * 简便调用
   * @param title 标题
   * @param content 内容
   * @param options 参数
   */
  (title: ReactNode, content: ReactNode, options?: I): DialogFuncResult<I>;
}

export type AlertFunc = DialogFunc<DialogFuncProps>;
export type ConfirmFunc = DialogFunc<DialogFuncProps>;

export type DialogFuncProps = ModalProps & {
  content?: ReactNode;
};

export type DialogProps = DialogFuncProps & {
  type?: AlertType;
};

export function Dialog(props: DialogProps) {
  const { content, title, type = 'warning', ...modalProps } = props;
  return (
    <Modal size="mini" placement="center" maskCloseable={false} {...modalProps}>
      <div className={cx('dialog-layer', `dialog--${type}`)}>
        <div className={cx('dialog-header')}>
          <div className={cx('dialog-icon')}>
            <Icon name={ALERT_ICON_MAP.get(type) || 'warning'} />
          </div>
          <div className={cx('dialog-title')}>{title}</div>
        </div>
        <div className={cx('dialog-content')}>{content}</div>
      </div>
    </Modal>
  );
}

function showDialog(options: DialogProps): DialogFuncResult {
  let props = { ...options, visible: true };
  const container = document.createElement('div');
  let destroyed = false;
  document.body.appendChild(container);

  let modalResolve: any;
  let modalReject: any;
  const promise: DialogFuncResult = new Promise<void>((resolve, reject) => {
    modalResolve = resolve;
    modalReject = reject;
  }) as any;

  promise.update = update;
  promise.destroy = destroy;
  promise.noReject = promise.then(data => ({ error: null, data }), error => ({ error, data: void 0 }));

  function onCancel() {
    if (props.onCancel) {
      props.onCancel();
    }
    modalReject(new Error('Modal canceled, please use .catch or .noReject to prevent display this error.'));
    destroy();
  }

  function onOk() {
    if (props.onOk) {
      props.onOk();
    }
    modalResolve();
    destroy();
  }

  function destroy() {
    props = {
      ...props,
      visible: false
    };
    render({
      onAfterClose: clean
    });
  }

  function update(updateOptions: DialogFuncProps) {
    if (destroyed) {
      return;
    }
    props = {
      ...props,
      ...updateOptions
    };
    render();
  }

  function clean() {
    if (destroyed) {
      return;
    }
    destroyed = true;
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    if (props.onAfterClose) {
      props.onAfterClose();
    }
  }

  function render(otherProps: DialogProps = {}) {
    ReactDOM.render(<Dialog {...props} {...otherProps} onOk={onOk} onCancel={onCancel} />, container);
  }

  render();

  return promise;
}

export function createAlertFunc(defaultProps: DialogProps = {}): DialogFunc<DialogFuncProps> {
  return (title: ReactNode | DialogFuncProps, content?: DialogFuncProps | ReactNode, options?: DialogFuncProps) => {
    const props = { ...defaultProps };
    if (isReactNode(title)) {
      props.title = title;

      if (isReactNode(content)) {
        props.content = content;

        if (options) {
          Object.assign(props, options);
        }
      } else {
        Object.assign(props, content);
      }
    } else {
      Object.assign(props, title);
    }

    return showDialog(props);
  };
}
