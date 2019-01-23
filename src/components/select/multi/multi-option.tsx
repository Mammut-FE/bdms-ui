import * as React from 'react';
import SelectOption from '../option';
import { Icon } from '../../icon';
import classNames from 'classnames/bind';
import style from '../select.scss';

const cx = classNames.bind(style);
const SelectMultiOption = function({ selected, title, ...props }) {
  let optionBefore;

  if (selected) optionBefore = <Icon name={'true'} className={cx('option-icon')} />;
  return <SelectOption {...props} title={title} after={optionBefore} className={cx('option--multi')} />;
};

export default SelectMultiOption;
