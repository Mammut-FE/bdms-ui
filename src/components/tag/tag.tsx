import classNames from 'classnames/bind';
import React, { Component, MouseEvent } from 'react';

import { Icon } from '../icon/icon';
import styles from './tag.scss';
import { Omit } from '../../lib/type';

interface ITagState {
  readonly visible: boolean;
}

interface ITagProps extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'size'> {
  size?: string;
  closable?: boolean;
  iconName?: string;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
}

const cx = classNames.bind(styles);

export class Tag extends Component<ITagProps, ITagState> {
  public static defaultProps = {
    closable: true,
    size: 'small'
  };

  public readonly state: Readonly<ITagState> = {
    visible: true
  };

  constructor(props: ITagProps) {
    super(props);
    this.closeTag = this.closeTag.bind(this);
  }

  public closeTag(e) {
    this.setState({ visible: false });
    if (this.props.onClose) {
      this.props.onClose(e);
    }
    e.stopPropagation();
  }

  public componentWillUnmount() {
    console.log('tag component will unmount');
  }

  public render() {
    const { children, size, closable, iconName, className } = this.props;
    const { visible } = this.state;

    const tagClass = cx('u-tag', `u-tag-${size}`, className);

    const iconCloseStyle = {
      marginLeft: '4px'
    };

    const iconStyle = {
      marginRight: '4px'
    };

    if (visible) {
      return (
        <div className={tagClass}>
          {iconName && <Icon name={iconName} style={iconStyle} />}
          {children}
          {closable && <Icon name="close" onClick={this.closeTag} style={iconCloseStyle} />}
        </div>
      );
    } else {
      return null;
    }
  }
}
