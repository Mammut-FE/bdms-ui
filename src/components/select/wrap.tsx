import * as React from 'react';
import classNames from 'classnames/bind';
import DropdownTrigger from '../helpers/DropdownTrigger';
import style from './select.scss';

const cx = classNames.bind(style);

export interface SelectWrapProps {
  acceptor: React.ReactType;
  [propName: string]: any;
}

export interface SelectWrapState {
  shown: boolean;
  dropdownWidth: number;
}

export default class Wrap extends React.Component<SelectWrapProps, SelectWrapState> {
  public state = {
    shown: false,
    dropdownWidth: 0
  };

  public changeShown = (shown: boolean) => {
    const container = this.refs.container as HTMLElement;

    this.setState({
      shown,
      dropdownWidth: container.clientWidth
    });
  };

  public handleOptionClick = option => {};

  render(): React.ReactNode {
    const { shown, dropdownWidth } = this.state;
    const { children, width, acceptor: SelectAcceptor, ...props } = this.props;
    const containerStyle = width
      ? {
          width: width + 'px'
        }
      : {};

    return (
      <DropdownTrigger
        action={['click']}
        shown={shown}
        dropdownClassName={cx('dropdown')}
        onShownChange={this.changeShown}
        dropdown={children}
        popupStyle={{ width: dropdownWidth + 'px' }}
      >
        <div
          ref={'container'}
          style={containerStyle}
          className={cx('container')}
          onClick={() => this.changeShown(true)}
        >
          <SelectAcceptor {...props} />
        </div>
      </DropdownTrigger>
    );
  }
}
