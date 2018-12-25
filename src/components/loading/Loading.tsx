import cnb from 'classnames/bind';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import * as React from 'react';
import styles from './loading.scss';
import Animate from 'rc-animate';

export type LoadingIndicatorCreator = (props: Required<Pick<LoadingProps, 'size'>>) => React.ReactNode;
export type LoadingIndicator = LoadingIndicatorCreator | React.ReactElement<any>;

const cx = cnb.bind(styles);

const builtinIndicator: {
  [k: string]: LoadingIndicator;
} = {
  circle: props => <div className={cx('indicator-circle', `indicator-circle--${props.size}`)} />,
  cube: (
    <div className={cx('indicator-cube')}>
      <i className={cx('indicator-cube-piece', 'indicator-cube-piece--top')} />
      <i className={cx('indicator-cube-piece', 'indicator-cube-piece--left')} />
      <i className={cx('indicator-cube-piece', 'indicator-cube-piece--right')} />
      <i className={cx('indicator-cube-piece', 'indicator-cube-piece--bottom')} />
    </div>
  )
};

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  /**
   * 自定义指示器，可以使用内置指示器
   * @default 'circle'
   */
  indicator?: keyof typeof builtinIndicator | LoadingIndicator;
  /**
   * 内建指示器的大小
   * @default 'normal'
   */
  size?: 'small' | 'normal' | 'large';
  /**
   * 是否是加载状态
   * @default true
   */
  loading?: boolean;
  /**
   * 简短的提示信息，也可以用于显示百分比
   */
  tip?: React.ReactNode;
  /**
   * 加载描述信息，只有当包裹容器时有效
   */
  message?: React.ReactNode;
  /**
   * 是否全屏显示加载信息
   */
  fullscreen?: boolean;
  wrapperClassName?: string;
  /**
   * 设置加载超时时间，不包括 delay
   */
  timeout?: number;
  onTimeout?: () => void;
}

interface LoadingState {
  loading: boolean;
}

export default class Loading extends React.Component<LoadingProps, LoadingState> {
  public static setDefaultIndicator(indicator: LoadingIndicator) {
    Loading.defaultIndicator = indicator;
  }

  public static setDefaultDelay(delay: number) {
    Loading.defaultDelay = delay;
  }

  private static defaultIndicator: LoadingIndicator = builtinIndicator.circle;
  private static defaultDelay: number = 0;

  public timer: any = null;
  public timeoutTimer: any = null;
  public container: HTMLDivElement | null = null;

  constructor(props) {
    super(props);
    const { loading = true } = this.props;
    this.state = {
      loading
    };
  }

  public componentDidUpdate(prevProps: Readonly<LoadingProps>, prevState: Readonly<LoadingState>): void {
    if (this.props.loading !== prevProps.loading) {
      this.changeLoading(this.props.loading);
    }
    if (this.state.loading !== prevState.loading) {
      if (this.timeoutTimer) {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }
      if (this.state.loading && this.props.timeout) {
        this.timeoutTimer = setTimeout(this.fireTimeout, this.props.timeout);
      }
    }
    // TODO: 检查 loading 状态并选择是否锁定 body 滚动
  }

  public componentWillUnmount() {
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  public fireTimeout = () => {
    if (this.props.onTimeout) {
      this.props.onTimeout();
    }
  };

  /**
   * 根据 loading 的状态和 delay 修改 state 中的状态
   * @param loading
   */
  public changeLoading(loading: boolean = true) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (!loading) {
      return this.setState({ loading });
    }

    const { delay = Loading.defaultDelay } = this.props;

    if (delay) {
      this.timer = setTimeout(
        () =>
          this.setState({
            loading
          }),
        delay
      );
    } else {
      this.setState({ loading });
    }
  }

  /**
   * 渲染加载指示器
   */
  public renderIndicator() {
    let indicator: any = this.props.indicator;
    const { size = 'normal' } = this.props;
    const indicatorProps = {
      size
    };

    indicator = typeof indicator === 'string' ? builtinIndicator[indicator] : indicator;

    indicator = typeof indicator === 'function' ? indicator(indicatorProps) : indicator;
    indicator =
      indicator ||
      (typeof Loading.defaultIndicator === 'function'
        ? Loading.defaultIndicator(indicatorProps)
        : Loading.defaultIndicator);

    return indicator as React.ReactNode;
  }

  public getContainer() {
    if (this.container) {
      return this.container;
    }

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.zIndex = '100'; // TODO: 需要确定参数，保证不会被 Modal 阻挡
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    document.body.appendChild(container);

    return (this.container = container);
  }

  public render() {
    const {
      loading: _,
      onTimeout,
      timeout,
      children,
      tip,
      message,
      fullscreen,
      className,
      wrapperClassName,
      ...restProps
    } = this.props;
    const { loading } = this.state;
    const needWrapper = !!children;

    const spinNode = (
      <div
        {...restProps}
        className={cn(
          cx('spinner', {
            // 全屏模式下不显示子元素，所以不需要 wrapper
            'spinner-in-wrapper': fullscreen || needWrapper,
            'spinner-in-fullscreen': fullscreen
          }),
          className
        )}
      >
        <div className={cx('indicator')}>
          {this.renderIndicator()}
          {tip && <span className={cx('indicator-tip')}>{tip}</span>}
        </div>
        {message && (needWrapper || fullscreen) && <div className={cx('spinner-message')}>{message}</div>}
      </div>
    );

    if (fullscreen) {
      return ReactDOM.createPortal(
        <Animate
          component="div"
          className={wrapperClassName}
          transitionName={cx('spinner-wrapper')}
          transitionAppear={true}
        >
          {loading && (
            <div key="spinner" className={cx('spinner-wrapper')}>
              {spinNode}
            </div>
          )}
        </Animate>,
        this.getContainer()
      );
    } else if (needWrapper) {
      // 当作为容器使用时需要进行包裹
      return (
        <Animate
          component="div"
          className={cn(cx('wrapper'), wrapperClassName)}
          transitionName={cx('spinner-wrapper')}
          transitionAppear={true}
        >
          {loading && (
            <div key="spinner" className={cx('spinner-wrapper')}>
              {spinNode}
            </div>
          )}
          <div key="container">{children}</div>
        </Animate>
      );
    } else {
      return loading && spinNode;
    }
  }
}
