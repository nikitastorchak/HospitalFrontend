import React from "react";

const Body = ({children}) => {
  return (
    <div className='bodyWrap'>
      <div className='body'>
        {children}
      </div>
    </div>
    
  )
}

export default Body;
