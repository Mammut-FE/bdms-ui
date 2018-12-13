import * as React from 'react';
import { Independence } from '../../lib/independence';
import Trigger from 'rc-trigger';
import { tryGetFuntionalNode } from '../../lib/util';
import styles from './tooltip.scss';
import cnb from 'classnames/bind';
import cn from 'classnames';

const cx = cnb.bind(styles);

const builtinPlacements = {
  top: { points: ['bc', 'tc'] },
  topRight: { points: ['br', 'tr'] },
  rightTop: { points: ['tl', 'tr'] },
  right: { points: ['cl', 'cr'] },
  rightBottom: { points: ['bl', 'br'] },
  bottomRight: { points: ['tr', 'br'] },
  bottom: { points: ['tc', 'bc'] },
  bottomLeft: { points: ['tl', 'bl'] },
  leftBottom: { points: ['br', 'bl'] },
  left: { points: ['cr', 'cl'] },
  leftTop: { points: ['tr', 'tl'] },
  topLeft: { points: ['bl', 'tl'] }
};

export interface TooltipProps {
  placement?: keyof typeof builtinPlacements;
  trigger?: 'click' | 'focus' | 'hover' | 'contextMenu';
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  size?: 'small' | 'normal' | 'large' | string;
  className?: string;
  disableAutoAdjust?: boolean;
  align?: object;
  type?: 'normal' | 'warning' | 'error';
  content?: React.ReactNode | (() => React.ReactNode);
  getPopupContainer?: () => HTMLElement;
}

@Independence({
  visible: {}
})
export default class Tooltip extends React.Component<TooltipProps> {
  public renderPopup() {
    const content = tryGetFuntionalNode(this.props.content);
    // rc-trigger 要求 popup 有一个根元素，所以不能直接返回 falsy value
    return content ? (
      <div
        className={cn(cx('popup', `popup--size-${this.props.size || 'normal'}`), this.props.className)}
        style={this.props.style}
      >
        <div className={cx('arrow')} />
        <div className={cx('content')}>{tryGetFuntionalNode(this.props.content)}</div>
      </div>
    ) : (
      <div />
    );
  }

  public render() {
    const {
      trigger = 'hover',
      placement = 'top',
      type = 'normal',
      disableAutoAdjust = false,
      visible,
      defaultVisible,
      onVisibleChange,
      align,
      getPopupContainer
    } = this.props;

    return (
      <Trigger
        builtinPlacements={builtinPlacements}
        popupVisible={visible}
        defaultPopupVisible={defaultVisible}
        onPopupVisibleChange={onVisibleChange}
        popupPlacement={placement}
        popup={this.renderPopup()}
        popupClassName={cx('container--type-' + type)}
        action={[trigger]}
        prefixCls="ma-tooltip__container"
        popupTransitionName="ma-tooltip__container"
        popupAlign={{
          overflow: {
            adjustX: !disableAutoAdjust,
            adjustY: !disableAutoAdjust
          },
          ...align
        }}
        getPopupContainer={getPopupContainer}
      >
        {this.props.children}
      </Trigger>
    );
  }
}
