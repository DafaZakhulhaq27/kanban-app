import React from 'react'
import { IconMore } from '../../assets/icons';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img 
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}  
        className="cursor-pointer"
        ref={ref}
        src={IconMore} 
        alt="icon setting" 
        width={24} 
        height={24} />
  ));


export default CustomToggle