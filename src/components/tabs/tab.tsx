import React, { Component, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './tabs.scss';

const cx = classNames.bind(styles);

interface Props {
  title: ReactNode;
  tabKey: string;
  forceRender?: boolean;
  disabled?: boolean;
  badge?: number;
}

interface PrivateProps {
  onClick?: (tabKey: string) => void;
  isActive?: boolean;
}

export default class Tab extends Component<Props, {}> {
  public render() {
    const {
      tabKey,
      title,
      disabled,
      badge,
      isActive,
      onClick
    } = this.props as (Props & PrivateProps);

    return (
      <li
        className={cx('tabs__tab', {
          'tabs__tab--selected': isActive,
          'tabs__tab--disabled': disabled
        })}
        onClick={(event) => {
          event.preventDefault();
          if (onClick && !disabled) {
            onClick(tabKey!);
          }
        }}
        role='tab'
        aria-selected={isActive ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
      >
        {title}
        {badge ? (
          <span className={cx('tabs__tab-badge')}>{badge}</span>
        ) : null}
      </li>
    );
  }
}
