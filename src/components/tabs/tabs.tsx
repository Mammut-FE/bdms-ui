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

export default class Tabs extends Component<ITabsProps, ITabsState> {
  public static Tab = Tab;
  public readonly state: Readonly<ITabsState> = getStateFromProps(this.props);

  public componentWillReceiveProps(nextProps: ITabsProps) {
    this.setState(getStateFromProps(nextProps));
  }

  public handleTabClick = (key: string) => {
    const { onChange } = this.props;
    const { activeKey } = this.state;
    if (activeKey !== key) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey: key
        });
      }
      if (onChange) {
        onChange(key);
      }
    }
  }

  public renderChildrenWithTabsApiAsProps = () => {
    const { children } = this.props;
    const { activeKey } = this.state;
    return React.Children.map(children, (child: ReactElement<any>) => {
      return React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabKey: child.props.tabKey,
        isActive: child.props.tabKey === activeKey
      });
    });
  }

  public renderActiveTabContent = () => {
    if (this.state.activeKey !== undefined) {
      const { children } = this.props;
      const { activeKey } = this.state;
      if (children != null) {
        return React.Children.map(children, (child: ReactElement<any>) => {
          if (child.props.tabKey === activeKey) {
            return child.props.children;
          }
          return null;
        });
      } else {
        console.dir('Error! This tab has no children!');
      }
    }
    return null;
  }

  public render() {
    const {
      className,
      style
    } = this.props;
    return (
      <div className={cx('tabs', className)} style={{...style}}>
        <ul className={cx('tabs__tab-list')}>
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>
        <div className={cx('tabs__tab-pane')}>
          {this.renderActiveTabContent()}
        </div>
      </div>
    );
  }
}