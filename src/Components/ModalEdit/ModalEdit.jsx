import { React } from 'react';
import axios from 'axios';

const ModalEdit = ({ modalEditActive, setModalEditActive, setList, newFio, newDoctor, newDate, newComplaint, idx, setNewFio, setNewDoctor, setNewDate, setNewComplaint }) => {

  const onEditClicked = async (_id) => {
    await axios.patch('http://localhost:8000/update', {
      _id: idx,
      fio: newFio,
      doctor: newDoctor,
      date: newDate,
      complaint: newComplaint,
    }).then(res => {
      setList(res.data)
    });
  }

  return (
    <div className={modalEditActive ? 'modalWrap active' : 'modalWrap'} onClick={() => setModalEditActive(false)}>
      <div className={modalEditActive ? 'modal active' : 'modal'} onClick={e => e.stopPropagation()}>
        <div className='modalHeader'>
          <p>Изменить прием</p>
        </div>
        <div className='modalEditBody'>
          <label>Имя:</label>
          <input type='text' value={newFio} onChange={(e) => setNewFio(e.target.value)} />
          <label>Врач:</label>
          <select value={newDoctor} onChange={(e) => setNewDoctor(e.target.value)}>
            <option ></option>
            <option >Биба</option>
            <option>Боба</option>
          </select>
          <label>Дата:</label>
          <input type='date' value={newDate.slice(0, 10)} onChange={(e) => setNewDate(e.target.value)} />
          <label>Жалобы:</label>
          <textarea value={newComplaint} name="" id="" cols="30" rows="10" onChange={(e) => setNewComplaint(e.target.value)}></textarea>
        </div>
        <div className='modalFooter'>
          <button onClick={() => setModalEditActive(false)} >Cancel</button>
          <button onClick={() => { onEditClicked(idx, newFio, newDoctor, newDate, newComplaint); setModalEditActive(false) }}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit;