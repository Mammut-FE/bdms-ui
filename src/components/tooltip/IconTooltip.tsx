import * as React from 'react';
import { Omit } from '../../lib/type';
import { Icon } from '../icon';
import Tooltip, { TooltipProps } from './Tooltip';
import cnb from 'classnames/bind';
import styles from './tooltip.scss';

const cx = cnb.bind(styles);

export interface IconTooltipProps extends Omit<TooltipProps, 'content'> {
  icon?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => any;
}

/**
 * Tooltip 的简化，显示一个图标，当鼠标放上去的时候显示对应信息
 * 完全继承自 Tooltip，删除了 `content` props，通过 children 的方式传入
 */
export default function IconTooltip(props: IconTooltipProps) {
  const { icon, children, placement, onClick, ...tooltipProps } = props;
  return (
    <Tooltip {...tooltipProps} content={children} placement={placement}>
      <Icon onClick={onClick} className={cx('icon')} name={icon || 'details'} />
    </Tooltip>
  );
}
