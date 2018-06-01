import React from 'react';
// import Button from './Button';
import styles from './button.scss';

const ButtonGroup = (props) => (<div className={styles['u-button-group']}>{props.children}</div>);

export default ButtonGroup;
