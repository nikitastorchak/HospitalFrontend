import { React } from 'react';
import axios from 'axios';
import Constants from '../Constants/Constants.jsx';

const ModalEdit = ({ modalEditActive, setModalEditActive, setList, idx, setAppoint, appoint}) => {

  const onEditClicked = async (_id) => {
    await axios.patch('http://localhost:8000/update', {
      user_id: localStorage.getItem('user_id'),
      _id: idx,
      fio: appoint.fio,
      doctor: appoint.doctor,
      date: appoint.date,
      complaint: appoint.complaint,
    }).then(res => {
      setList(res.data);
    });
    setAppoint({
      fio: '', 
      doctor: '', 
      date: '', 
      complaint: '', 
    });
  };

  const buildAppoint = (value, type) => {
    const newAppoint = {...appoint};
    newAppoint[type] = value;
    setAppoint(newAppoint);
  };

  return (
    <div className={modalEditActive ? 'modalWrap active' : 'modalWrap'} onClick={() => setModalEditActive(false)}>
      <div className={modalEditActive ? 'modal active' : 'modal'} onClick={e => e.stopPropagation()}>
        <div className='modalHeader'>
          <p>Изменить прием</p>
        </div>
        <div className='modalEditBody'>
          <label>Имя:</label>
          <input type='text' value={appoint.fio} onChange={(e) => buildAppoint(e.target.value, 'fio')} />
          <label>Врач:</label>
          <select value={appoint.doctor} onChange={(e) => buildAppoint(e.target.value, 'doctor')}>
            <option ></option>
            <Constants/>
          </select>
          <label>Дата:</label>
          <input type='date' value={appoint.date.slice(0, 10)} onChange={(e) => buildAppoint(e.target.value, 'date')} />
          <label>Жалобы:</label>
          <textarea value={appoint.complaint} onChange={(e) => buildAppoint(e.target.value, 'complaint')}></textarea>
        </div>
        <div className='modalFooter'>
          <button onClick={() => setModalEditActive(false)} >Cancel</button>
          <button onClick={() => { onEditClicked(idx, appoint); setModalEditActive(false) }}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit;