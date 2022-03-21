import React from 'react';
import axios from 'axios';
// import './css/Modal.scss';



const ModalDelete = ({ modalActive, setModalActive, setList, idx, list }) => {


  const onDelClicked = async (id) => {

    await axios.delete(`http://localhost:8000/delete?_id=${id}`).then(res => {
      const deletedList = list.filter((element) => element._id !== id)

      setList(deletedList)
    });
  }

  return (
    <div className={modalActive ? 'modalWrap active' : 'modalWrap'} onClick={() => setModalActive(false)}>
      <div className={modalActive ? 'modal active' : 'modal'} onClick={e => e.stopPropagation()}>
        <div className='modalHeader'>
          <p>Удалить прием</p>
        </div>
        <div className='modalBody'>
          <p>Вы действительно хотите удалить прием?</p>
        </div>
        <div className='modalFooter'>
          <button onClick={() => setModalActive(false)} >Cancel</button>
          <button onClick={() => { onDelClicked(idx); setModalActive(false) }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete;
