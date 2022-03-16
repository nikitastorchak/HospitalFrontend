import { React, useState } from 'react';
import axios from 'axios';
import Modal from './Components/Modal.jsx'
import ModalEdit from './Components/ModalEdit.jsx'
import del from './del.svg'
import edit from './edit.svg'

const Table = ({ setList, list, item }) => {
  const [modalActive, setModalActive] = useState(false)
  const [modalEditActive, setModalEditActive] = useState(false)
  const [fio, setFio] = useState(item.fio)
  const [doctor, setDoctor] = useState(item.doctor)
  const [date, setDate] = useState(item.date)
  const [сomplaint, setComplaint] = useState(item.сomplaint)
  const dateNew = item.date.slice(0, 10).split('-').join('.')

  const onDelClicked = async (_id) => {
    await axios.delete(`http://localhost:8000/delete?_id=${_id}`, {
    }).then(res => {
      const deleteTask = list.filter((list) => list._id !== _id);
      setList(deleteTask);
    });
  }
  const onEditClicked = async (_id) => {
    await axios.patch('http://localhost:8000/update', {
      _id: _id,
      fio: fio,
      doctor: doctor,
      date: date,
      complaint: сomplaint,
    }).then(res => { });
  }
  
  return (
    <>
      <tr className='tableBodyWrap'>
        <td className='tableBody'>{fio}</td>
        <td className='tableBody'>{doctor}</td>
        <td className='tableBody'>{dateNew}</td>
        <td className='tableBody'>{сomplaint}</td>
        <td className='tableBody'>
          <div className='svgWrap'>
            <img onClick={() => setModalActive(true)} src={del} />
            <img onClick={() => setModalEditActive(true)} src={edit} />
          </div>
        </td>
      </tr>
      <ModalEdit modalEditActive={modalEditActive} setModalEditActive={setModalEditActive}>
        <div className='modalHeader'>
          <p>Изменить прием</p>
        </div>
        <div className='modalEditBody'>
          <label>Имя:</label>
          <input type='text' value={fio} onChange={(e) => setFio(e.target.value)} />
          <label>Врач:</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option ></option>
            <option >1</option>
            <option>2</option>
          </select>
          <label>Дата:</label>
          <input type='date' value={date.slice(0, 10)} onChange={(e) => { console.log(date.slice(0, 10)); setDate(e.target.value) }} />
          <label>Жалобы:</label>
          <textarea value={сomplaint} name="" id="" cols="30" rows="10" onChange={(e) => setComplaint(e.target.value)}></textarea>
        </div>
        <div className='modalFooter'>
          <button onClick={() => setModalEditActive(false)} >Cancel</button>
          <button onClick={() => { onEditClicked(item._id, fio, doctor, date, сomplaint); setModalEditActive(false) }}>Save</button>
        </div>
      </ModalEdit>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <div className='modalHeader'>
          <p>Удалить прием</p>
        </div>
        <div className='modalBody'>
          <p>Вы действительно хотите удалить прием?</p>
        </div>
        <div className='modalFooter'>
          <button onClick={() => setModalActive(false)} >Cancel</button>
          <button onClick={() => { onDelClicked(item._id); setModalActive(false) }}>Delete</button>
        </div>
      </Modal>
    </>
  )
}

export default Table;