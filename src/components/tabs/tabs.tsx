import React, { Component, ReactElement } from 'react';
import Tab from './tab';
import classNames from 'classnames/bind';
import styles from './tabs.scss';

const cx = classNames.bind(styles);

interface ITabsProps {
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

interface ITabsState {
  activeKey: string;
}

const checkActiveKey = (props, activeKey): boolean => {
  const keys = React.Children.map(props.children, (child: ReactElement<any>) => {
    return child.props.tabKey;
  });
  return keys.indexOf(activeKey) > -1;
}

const getDefaultActiveKey = (props) => {
  let activeKey: string = '';
  React.Children.forEach(props.children, (child: ReactElement<any>) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.props.tabKey;
    }
  });
  return activeKey;
}

const getStateFromProps = (props: ITabsProps): ITabsState => {
  let activeKey;
  if ('activeKey' in props && checkActiveKey(props, props.activeKey)) {
    activeKey = props.activeKey;
  } else {
    activeKey = getDefaultActiveKey(props);
  }
  return {
    activeKey
  };
}

export class Tabs extends Component<ITabsProps, ITabsState> {
  public static Tab = Tab;
  public readonly state: Readonly<ITabsState> = getStateFromProps(this.props);

  public componentWillReceiveProps(nextProps: ITabsProps) {
    this.setState(getStateFromProps(nextProps));
  }

  public handleTabClick = (key: string) => {
    const { onChange } = this.props;
    const { activeKey } = this.state;
    if (activeKey !== key) {
      this.setState({
        activeKey: key
      });
      if (onChange) {
        onChange(key);
      }
    }
  }

  public renderTab = () => {
    const { children } = this.props;
    const { activeKey } = this.state;
    return React.Children.map(children, (child: ReactElement<any>, index) => {
      return React.cloneElement(child, {
        key: `tabs__tab${index}`,
        onClick: this.handleTabClick,
        tabKey: child.props.tabKey,
        isActive: child.props.tabKey === activeKey
      });
    });
  }

  public renderTabContent = () => {
    const { children } = this.props;
    const { activeKey } = this.state;
    const panes: Array<ReactElement<any>> = [];
    React.Children.forEach(children, (child: ReactElement<any>, index) => {
      if (!child) {
        return;
      }
      const {
        tabKey,
        forceRender
      } = child.props;
      const isActive = tabKey === activeKey;
      const shouldRender = isActive || forceRender;
      const cls = cx('tabs__tab-pane', {
        ['tabs__tab-pane--active']: isActive,
        ['tabs__tab-pane--inactive']: !isActive
      });
      if (shouldRender) {
        panes.push(
          <div
            className={cls}
            aria-hidden={isActive ? 'false' : 'true'}
            role='tabpanel'
            key={`tabs__tab-pane${index}`}
          >
            {child.props.children}
          </div>
        );
      }
    });
    return panes;
  }

  public render() {
    const {
      className,
      style
    } = this.props;
    return (
      <div className={cx('tabs', className)} style={{...style}}>
        <ul className={cx('tabs__tab-list')}>
          {this.renderTab()}
        </ul>
        {this.renderTabContent()}
      </div>
    );
  }
}