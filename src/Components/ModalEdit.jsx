import React from "react";
// import './css/Modal.scss';



const ModalEdit = ({modalEditActive, setModalEditActive, children}) => {
  return (
    <div className={modalEditActive ? 'modalWrap active' : 'modalWrap'} onClick={() => setModalEditActive(false)}>
      <div className={modalEditActive ? 'modal active' : 'modal'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
    
  )
}

export default ModalEdit;