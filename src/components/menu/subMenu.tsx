import React, { Component, ReactElement } from 'react';
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
  subtitle?: string;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  isRoot?: boolean;  // 是否是第一级submenu，对于mode是horizontal的类型需要进行传递该prop，否则样式会不对
}

export default class SubMenu extends Component<ISubMenuProps, any> {
  //   public static defaultProps: Partial<ISubMenuProps> = {

  //   }
  public isRootMenu = false;
  constructor(props: ISubMenuProps) {
    super(props);
  }
  public render() {
    const { children, className, title, builtinPlacements, popupOffset, disabled, subtitle, isRoot } = this.props;
    let subMenuClasses ;
    const popupClassName = cx('u-submenu-pop');
    const getPopupContainer = triggerNode => triggerNode.parentNode;
    const popupAlign = popupOffset ? { offset: popupOffset } : {};

    return (
      <Consumer>
        {valueProp => {
          const { mode } = valueProp;
          const popupPlacement = popupPlacementMap[mode!];
          let subMenuCpt;
          const subChildren = <MenuWrap>{React.Children.map(children, (child: ReactElement<any>) => {
            return React.cloneElement(child, {mode: 'vertical'});
          })}
           </MenuWrap>;
          switch (mode) {
            case 'vertical':
              subMenuClasses = cx('u-menu-item', className)
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
                  stretch="height"
                >
                  <div className={subMenuClasses}>
                    {title}
                    <Icon name="right" style={{ position: 'absolute', right: 10, top: 9 }} />
                    {subtitle && <div className={cx("subtitle","subtitle-witah-arrow")}>{subtitle}</div>}
                  </div>
                </Trigger>
              );
              break;
            case 'horizontal':  
              if (isRoot) {
                subMenuClasses = cx('u-menu-item-horizontal', className)
              } else {
                subMenuClasses = cx('u-menu-item', className)
              }
              
              subMenuCpt = (
                <Trigger
                  popupClassName={popupClassName}
                  action={disabled ? [] : ['hover']}
                  popup={subChildren}
                  getPopupContainer={getPopupContainer}
                  popupPlacement={isRoot ? popupPlacement: popupPlacementMap.vertical}
                  popupAlign={popupAlign}
                  builtinPlacements={Object.assign({}, placements, builtinPlacements)}
                  destroyPopupOnHide={true}
                  stretch={isRoot ? "width" : "height"}
                  zIndex={10}
                >
                  <div className={subMenuClasses}>
                    {title}
                    <Icon name="right" style={{ position: 'absolute', right: isRoot ? 2 : 10, top: isRoot ? 20 : 9 }} />
                  </div>
                </Trigger>
              );
              break;
            case 'inline': 
              const inlineChildren = React.Children.map(children, (child: ReactElement<any>) => {
                React.cloneElement(child, {visibility: false})
              })
              subMenuCpt = (
                <div>
                  <div className={subMenuClasses}>
                    {title}
                    <Icon name="chevron-down" style={{ position: 'absolute', right: 10, top:  9 }} />
                  </div>
                  {inlineChildren}
                </div>
              )
          }
          return subMenuCpt;
        }}
      </Consumer>
    );
  }
}
