import React from "react";
// import './css/Modal.scss';



const Modal = ({modalActive, setModalActive, children}) => {
  return (
    <div className={modalActive ? 'modalWrap active' : 'modalWrap'} onClick={() => setModalActive(false)}>
      <div className={modalActive ? 'modal active' : 'modal'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
    
  )
}

export default Modal;
