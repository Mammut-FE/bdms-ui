import React from 'react';
import './button.scss'
import '../../style/index.scss'


const ButtonGroup = (props) => (
    <div className='u-button-group'>
        {props.children}
    </div>
)

export default ButtonGroup;
