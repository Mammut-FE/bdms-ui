import * as React from 'react';
import SelectOption from '../option';
import { Icon } from '../../icon';
import classNames from 'classnames/bind';
import style from '../select.scss';

const cx = classNames.bind(style);
const SelectSelectableOption = function({ selected, title, ...props }) {
  let optionBefore;

  if (selected) optionBefore = <Icon name={'true'} className={cx('Option--selectable-true')} />;
  return <SelectOption {...props} title={title} before={optionBefore} className={cx('Option--selectable')} />;
};

export default SelectSelectableOption;
