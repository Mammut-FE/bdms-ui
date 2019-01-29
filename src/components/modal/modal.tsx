import cnb from 'classnames/bind';
import Animate from 'rc-animate';
import * as React from 'react';
import { Children, cloneElement, createRef, Fragment, MouseEvent, ReactElement, ReactNode } from 'react';
import { Independence } from '../../lib/independence';
import { Button } from '../button';
import { ButtonProps } from '../button/button';
import Portal from '../helpers/Portal';
import { Icon } from '../icon';
import { AlertFunc, AlertType, ConfirmFunc, createAlertFunc } from './dialog';
import styles from './modal.scss';

const cx = cnb.bind(styles);

const defaults: DefaultsModalProps = {
  sizeMap: {
    mini: 448,
    small: 548,
    normal: 640,
    large: 808
  },
  scrollInModal: false
};

function setDefaultModalProps(defaultProps: Partial<DefaultsModalProps>) {
  Object.assign(defaults, defaultProps);
}

export interface DefaultsModalProps extends Required<Pick<ModalProps, 'scrollInModal'>> {
  sizeMap: {
    [k: string]: number;
  };
}

export type ModalFooterBuilder = (
  args: {
    readonly okButton: (props?: ButtonProps) => ReactElement<ButtonProps>;
    readonly cancelButton: (props?: ButtonProps) => ReactElement<ButtonProps>;
    readonly onOk: () => any;
    readonly onCancel: () => any;
  }
) => ReactNode;

export interface ModalProps {
  /**
   * 是否显示模态框
   */
  visible?: boolean;
  /**
   * 显示状态变化
   * @param visible
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * 非可控模式下默认的状态
   */
  defaultVisible?: boolean;
  /**
   * 点击确定按钮事件
   */
  onOk?: () => any;
  /**
   * 点击取消按钮事件
   */
  onCancel?: () => any;
  /**
   * 模态框关闭事件
   */
  onClose?: () => any;
  /**
   * 模态框关闭之后事件，等待动画完成之后触发
   */
  onAfterClose?: () => void;
  /**
   * 确认按钮文字
   */
  okText?: ReactNode;
  /**
   * 取消按钮文字
   */
  cancelText?: ReactNode;
  /**
   * 模态框的位置，支持顶部/底部/居中
   * @default 'top'
   */
  placement?: 'top' | 'bottom' | 'center';
  /**
   * 模态框底部栏自定义，支持传入 ReactNode 或者函数，null 为隐藏
   */
  footer?: ReactNode | ModalFooterBuilder;
  /**
   * 模态框顶部栏自定义，null 为隐藏
   */
  header?: ReactNode;
  /**
   * 模态框的 z-index 值
   */
  zIndex?: number;
  /**
   * 是否隐藏模态框背景的遮罩。注意：这里只是隐藏，但是你无法点击到遮罩后面的内容
   */
  hideMask?: boolean;
  /**
   * 是否可以点击模态框的遮罩关闭
   * @default true
   */
  maskCloseable?: boolean;
  /**
   * 模态框标题
   */
  title?: ReactNode;
  /**
   * 模态框大小，支持内置大小或者传入自定义的宽度
   * @default normal
   */
  size?: 'mini' | 'small' | 'normal' | 'large' | 'fullscreen' | string | number;
  /**
   * 让 Modal Body 进行滚动，而不是 Modal 进行滚动
   * @default false
   */
  scrollInModal?: boolean;
  /**
   * TODO
   * @default false
   */
  keepAlive?: boolean;

  /**
   * 当显示的时候锁定 Document 的滚动条
   * @default false
   */
  lockDocument?: boolean;

  /**
   * 单击触发元素。让 Modal 接管展示和关闭逻辑，让你专注于核心逻辑的编写
   */
  triggerNode?: ReactNode;
}

@Independence({
  visible: {
    defaultValue: false
  }
})
export default class Modal extends React.Component<ModalProps> {
  /**
   * Modal.confirm 确认提示框
   * @public
   */
  public static confirm: ConfirmFunc;

  /**
   * Modal.info 一般信息提示框
   * @public
   */
  public static info: AlertFunc;

  /**
   * Modal.success 成功信息提示框
   * @public
   */
  public static success: AlertFunc;

  /**
   * Modal.warning 警告信息提示框
   * @public
   */
  public static warning: AlertFunc;

  /**
   * Modal.error 错误信息提示框
   * @public
   */
  public static error: AlertFunc;
  // TODO: 实现 Prompt 功能

  public static setDefaultModalProps: typeof setDefaultModalProps;

  private wrapperRef = createRef<HTMLDivElement>();
  private prevDocumentOverflow: string | null = null;

  public componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.visible !== prevProps.visible) {
      if (!this.props.visible && this.props.onClose) {
        this.props.onClose();
      }

      if (this.props.visible) {
        this.lock();
      } else {
        this.unlock();
      }
    }
  }

  public componentDidMount(): void {
    if (this.props.visible) {
      // 针对第一次渲染就是 true 的情况
      this.lock();
    }
  }

  public componentWillUnmount(): void {
    if (this.props.visible) {
      // 针对 true 的情况下被卸载的情况
      this.unlock();
    }
  }

  public lock = () => {
    if (!this.props.lockDocument) {
      return;
    }
    this.prevDocumentOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  };

  public unlock = () => {
    if (!this.props.lockDocument) {
      return;
    }
    document.body.style.overflow = this.prevDocumentOverflow;
  };

  public close = () => {
    // 触发 visible 改变事件
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(false);
    }
  };

  public onOk = () => {
    if (this.props.onOk) {
      this.props.onOk();
    }
    this.close();
  };

  public onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.close();
  };

  public onMaskClick = (e: MouseEvent<HTMLDivElement>) => {
    const { maskCloseable = true } = this.props;

    if (!maskCloseable || e.target !== this.wrapperRef.current) {
      return;
    }
    this.onCancel();
  };

  public onIconClick = () => {
    this.onCancel();
  };

  public onTriggerNodeClick = () => {
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(true);
    }
  };

  public onAnimateEnd = (key: string, exists: boolean) => {
    if (!exists && this.props.onAfterClose) {
      this.props.onAfterClose();
    }
  };

  public renderOkButton = (buttonProps: ButtonProps = {}) => {
    const { okText } = this.props;
    return (
      <Button key="ok-button" type="primary" className={cx('footer-button')} {...buttonProps} onClick={this.onOk}>
        {okText || '确认'}
      </Button>
    );
  };

  public renderCancelButton = (buttonProps: ButtonProps = {}) => {
    const { cancelText } = this.props;
    return (
      <Button key="cancel-button" className={cx('footer-button')} {...buttonProps} onClick={this.onCancel}>
        {cancelText || '取消'}
      </Button>
    );
  };

  public renderHeader() {
    const { title } = this.props;
    return (
      <div className={cx('header')} key="header">
        <div className={cx('header-content')}>{title}</div>
        <div className={cx('header-close')} onClick={this.onIconClick}>
          <Icon name="close" />
        </div>
      </div>
    );
  }

  public renderFooter() {
    const { footer } = this.props;

    return (
      <div className={cx('footer')} key="footer">
        {typeof footer === 'function'
          ? footer.call(null, {
              okButton: this.renderOkButton,
              cancelButton: this.renderCancelButton,
              onOk: this.onOk,
              onCancel: this.onCancel
            })
          : footer || footer === null || [this.renderOkButton(), this.renderCancelButton()]}
      </div>
    );
  }

  public renderMask() {
    // 添加这一层只是用于展示动画
    const { hideMask, visible } = this.props;

    if (hideMask) {
      return null;
    }

    return (
      <Animate transitionName={cx('mask')} transitionAppear={true} component="" key="mask">
        {visible ? <div key="mask" className={cx('mask')} /> : null}
      </Animate>
    );
  }

  public renderWrapper() {
    const {
      visible,
      children,
      scrollInModal = defaults.scrollInModal,
      placement = 'center',
      size = 'normal'
    } = this.props;

    const width = size === 'fullscreen' ? '100%' : typeof size === 'string' ? defaults.sizeMap[size] : size;

    return (
      <Animate
        transitionName={cx('wrapper')}
        transitionAppear={true}
        component=""
        key="wrapper"
        onEnd={this.onAnimateEnd}
      >
        {visible ? (
          <div
            key="wrapper"
            className={cx('wrapper', !scrollInModal && 'wrapper--scroll')}
            onClick={this.onMaskClick}
            ref={this.wrapperRef}
          >
            <div
              className={cx('modal', `modal--placement-${placement}`)}
              style={{
                width
              }}
            >
              {this.renderHeader()}
              <div key="body" className={cx('body', scrollInModal && 'body--scroll')}>
                {children}
              </div>
              {this.renderFooter()}
            </div>
          </div>
        ) : null}
      </Animate>
    );
  }

  public render() {
    const { triggerNode } = this.props;

    const portalNode = (
      <Portal>
        <div>
          {this.renderMask()}
          {this.renderWrapper()}
        </div>
      </Portal>
    );

    if (triggerNode) {
      const node = Children.only(triggerNode);
      return (
        <Fragment>
          {cloneElement(node, { onClick: this.onTriggerNodeClick })}
          {portalNode}
        </Fragment>
      );
    }

    return portalNode;
  }
}

Modal.setDefaultModalProps = setDefaultModalProps;
Modal.confirm = createAlertFunc();

for (const type of ['info', 'success', 'warning', 'error'] as AlertType[]) {
  Modal[type] = createAlertFunc({
    type,
    okText: '知道了',
    footer: ({ okButton }) => okButton()
  });
}
