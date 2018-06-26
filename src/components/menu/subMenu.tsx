import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Trigger from 'rc-trigger';

import styles from './menu.scss';
import { Consumer } from './menuContext';
import MenuWrap from './menuWrap';
import Icon from '../icon';

import placements from './placements';

const cx = classNames.bind(styles);

const popupPlacementMap = {
  horizontal: 'bottomLeft',
  vertical: 'rightTop'
};

interface ISubMenuProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: 'horizontal' | 'vertical' | 'inline';
  title: string; // 展开的标题
  builtinPlacements?: object;
  popupOffset?: any[]; // trigger组件的配置，详见https://github.com/react-component/trigger
  disabled?: boolean;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
}

export default class SubMenu extends Component<ISubMenuProps, any> {
  //   public static defaultProps: Partial<ISubMenuProps> = {

  //   }
  public isRootMenu = false;
  constructor(props: ISubMenuProps) {
    super(props);
  }
  public render() {
    const { children, className, title, builtinPlacements, popupOffset, disabled } = this.props;
    const subMenuClasses = cx('u-menu-item', className);
    const popupClassName = cx('u-submenu-pop');
    const getPopupContainer = triggerNode => triggerNode.parentNode;
    const popupAlign = popupOffset ? { offset: popupOffset } : {};

    return (
      <Consumer>
        {valueProp => {
          const { mode } = valueProp;
          const popupPlacement = popupPlacementMap[mode!];
          let subMenuCpt;
          const subChildren = <MenuWrap>{children}</MenuWrap>;
          switch (mode) {
            case 'vertical':
              subMenuCpt = (
                <Trigger
                  popupClassName={popupClassName}
                  action={disabled ? [] : ['hover']}
                  popup={subChildren}
                  getPopupContainer={getPopupContainer}
                  popupPlacement={popupPlacement}
                  popupAlign={popupAlign}
                  builtinPlacements={Object.assign({}, placements, builtinPlacements)}
                  destroyPopupOnHide={true}
                >
                  <div className={subMenuClasses}>
                    {title}
                    <Icon name="right" style={{ position: 'absolute', right: 10, top: 10 }} />
                  </div>
                </Trigger>
              );
          }
          return subMenuCpt;
        }}
      </Consumer>
    );
  }
}
