import React, { FC, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './tabs.scss';

const cx = classNames.bind(styles);

interface Props {
    onClick?: (tabKey: string) => void;
    tabKey: string;
    isActive?: boolean;
    title: ReactNode | string;
    disabled?: boolean;
    badge?: number;
}

const Tab: FC<Props> = ({
    onClick,
    tabKey,
    isActive,
    title,
    disabled,
    badge,
    ...restAttributes
}) => (
    <li
        {...restAttributes}
        className={cx('tabs__tab', {
        'tabs__tab--selected': isActive,
        'tabs__tab--disabled': disabled
        })}
        onClick={(event) => {
            event.preventDefault();
            if (onClick && !disabled) {
                onClick(tabKey!);
            }}
        }
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

export default Tab;