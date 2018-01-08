import React from 'react';
import './button.css'
import '../../style/index.css'


const ButtonGroup = (props) => (
    <div className='u-button-group'>
        {props.children}
    </div>  
)

export default ButtonGroup;