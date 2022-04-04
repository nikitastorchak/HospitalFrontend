import { React, useState } from 'react';
import moment from 'moment';
import './Table.scss';
import del from '../../del.svg'
import edit from '../../edit.svg'

const Table = ({ sortList, setModalEditActive, setModalActive, setIdx, setNewAppoint, setAppoint, appoint }) => {
  const newAppoint = {...appoint};
  const buildAppoint = (value, type) => {
    newAppoint[type] = value;
  };

  return (
    <>
      {
        sortList.map((item, index) => (
          <>
            <tr className='tableBodyWrap' key={index}>
              <td className='tableBody'>{item.fio}</td>
              <td className='tableBody'>{item.doctor}</td>
              <td className='tableBody'>{moment(item.date).format('L').split('/').join('.')}</td>
              <td className='tableBody'>{item.complaint}</td>
              <td className='tableBody'>
                <div className='svgWrap'>
                  <img onClick={() => { setModalActive(true); setIdx(item._id) }} src={del} />
                  <img onClick={() => {
                    setIdx(item._id);
                    buildAppoint(item.fio, 'fio')
                    buildAppoint(item.doctor, 'doctor')
                    buildAppoint(item.date, 'date')
                    buildAppoint(item.complaint, 'complaint')
                    setAppoint(newAppoint)
                    setModalEditActive(true);
                  }} src={edit} />
                </div>
              </td>
            </tr>
          </>
        ))
      }
    </>
  )
}

export default Table;