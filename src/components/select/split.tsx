import * as React from 'react';

import classNames from 'classnames/bind';
import style from './select.scss';

const cx = classNames.bind(style);
const SelectSplit = function() {
  return <div className={cx('split')} />;
};

export default SelectSplit;
