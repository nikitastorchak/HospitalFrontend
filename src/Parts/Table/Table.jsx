import { React, useState } from 'react';
import moment from 'moment'
import axios from 'axios';
import './Table.scss';

import del from '../../del.svg'
import edit from '../../edit.svg'


const Table = ({ setList, sortList, list, setModalEditActive, setModalActive, setIdx, setNewFio, setNewDoctor, setNewDate, setNewComplaint }) => {
  const [appoint, setAppoint] = useState('')
  const [newAppoint, setNewAppoint] = useState('')

  // const [fio, setFio] = useState(item.fio)
  // const [doctor, setDoctor] = useState(item.doctor)
  // const [date, setDate] = useState(item.date)
  // const [idDel, setIdDel] = useState()
  // const [сomplaint, setComplaint] = useState(item.сomplaint)
  // const dateNew = item.date.slice(0, 10).split('-').join('.')


  return (


    <>
      {
        sortList.map((item, index) => (
          <>
            {/* {
              setAppoint(item)
            } */}
            <tr className='tableBodyWrap' key={index}>
              <td className='tableBody'>{item.fio}</td>
              <td className='tableBody'>{item.doctor}</td>
              <td className='tableBody'>{moment(item.date).format('L').split('/').join('.')}</td>
              <td className='tableBody'>{item.complaint}</td>
              <td className='tableBody'>
                <div className='svgWrap'>
                  <img onClick={() => { setModalActive(true); setIdx(item._id) }} src={del} />
                  <img onClick={() => {
                    setModalEditActive(true);
                    setIdx(item._id);
                    setNewFio(item.fio);
                    setNewDoctor(item.doctor);
                    setNewDate(item.date);
                    setNewComplaint(item.complaint)
                  }} src={edit} />
                </div>
              </td>
            </tr>
            {/* <ModalEdit
              modalEditActive={modalEditActive}
              setModalEditActive={setModalEditActive}
        
              appoint={appoint}
              setAppoint={setAppoint}
              setList={setList}
            />
            <ModalDelete
              modalActive={modalActive}
              setModalActive={setModalActive}
      
              appoint={appoint}
              setList={setList}
            /> */}
          </>
        ))
      }

    </>
  )
}

export default Table;