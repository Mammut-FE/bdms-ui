import React from 'react';
import styles from './button.scss';

const ButtonGroup = (props) => (<div className={styles['u-button-group']}>{props.children}</div>);

export default ButtonGroup;
