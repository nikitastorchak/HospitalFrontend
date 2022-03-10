import React from "react";

const Header = ({children}) => {
  return (
    <div className='headerWrap'>
      <div className='header'>
        {children}
      </div>
    </div>
    
  )
}

export default Header;
