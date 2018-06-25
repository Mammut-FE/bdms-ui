import React, { Component } from 'react';

import classNames from 'classnames/bind';

import styles from './menu.scss';
import { Consumer } from './menuContext';

const cx = classNames.bind(styles);

interface ISubMenuProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: 'horizontal' | 'vertical' | 'inline';
  title?: string; // 展开的标题
}

export default class SubMenu extends Component<ISubMenuProps, any> {
  //   public static defaultProps: Partial<ISubMenuProps> = {

  //   }
  public subMenuDom: React.RefObject<any> = React.createRef<any>();
  constructor(props: ISubMenuProps) {
    super(props);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.hideSubMene = this.hideSubMene.bind(this);
  }
  public showSubMenu(e) {
    // const children = this.props.children;
    // const subMenus = <div className={cx('u-menu')}>{children}</div>;
    console.log(e.pageX, e.target);
  }
  public hideSubMene() {}
  public render() {
    const { className, title } = this.props;
    const subMenuClasses = cx('u-menu-item', className);
    return (
      <Consumer>
        {valueProp => {
          const { mode } = valueProp;
          let subMenuCpt;
          switch (mode) {
            case 'vertical':
              subMenuCpt = (
                <div
                  className={subMenuClasses}
                  onMouseEnter={this.showSubMenu}
                  onMouseLeave={this.hideSubMene}
                  ref={this.subMenuDom}
                >
                  {title}
                </div>
              );
          }
          return subMenuCpt;
        }}
      </Consumer>
    );
  }
}
