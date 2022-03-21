import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment'
import _ from 'lodash'
import Header from '../Parts/Header';
import UnderHeader from '../Parts/UnderHeader';
import Body from '../Parts/Body';
import Table from '../Parts/Table';
import ModalDelete from '../Components/ModalDelete.jsx'
import ModalEdit from '../Components/ModalEdit.jsx'

const Appointment = () => {

  const [fio, setFio] = useState('')
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const [complaint, setComplaint] = useState('')
  const [list, setList] = useState([])


  const [modalActive, setModalActive] = useState(false)
  const [modalEditActive, setModalEditActive] = useState(false)
  const [idx, setIdx] = useState('')
  const [newFio, setNewFio] = useState('')
  const [newDoctor, setNewDoctor] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newComplaint, setNewComplaint] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortWay, setSortWay] = useState('')
  const [filterActive, setFilterActive] = useState(false)


  useEffect(async () => {
    await axios.get('http://localhost:8000/show').then(res => {
      setList(res.data);

    });
  }, []);


  const updateList = async () => {
    await axios.get('http://localhost:8000/show').then(res => {
      setList(res.data);

    });
  }

  const sortList = ([...list].sort((a, b) => {
    if (!sortField) {
      return 0;
    }
    if (sortWay === 'asc') {
      if (sortField) {
        if (a[sortField] === b[sortField]) return 0;
        return a[sortField] > b[sortField] ? 1 : -1;
      }
    } else {
      if (a[sortField] === b[sortField]) return 0;
      return a[sortField] > b[sortField] ? -1 : 1;
    }
  }))


  const filteredArray = [...sortList];

  const filterFunction = (arr) => {
  
    if (filterActive) {

      if (dateTo && dateFrom) {

        arr = _.filter(filteredArray, (item) =>
          moment(item.date).isBetween(dateFrom, dateTo, 'date', '[]')
        );


      } else if (dateFrom) {
        arr = _.filter(filteredArray, (item) => moment(item.date).isAfter(dateFrom));
      } else if (dateTo) {
        arr = _.filter(filteredArray, (item) => moment(item.date).isBefore(dateTo));
      }
      return arr;
    } else {

      arr = sortList;

      setList(arr)

    }
    return arr;
  };
  // const sorting = (field, way) => {
  //   if (field) {
  //     if (field === 'ФИО') {
  //       if (way === 'По возрастанию') {
  //         list.sort((a, b) => {
  //           if (a.fio === b.fio) return 0;
  //           return (a.fio > b.fio ? 1 : -1);
  //         })
  //       } else {
  //         list.sort((a, b) => {
  //           if (a.fio === b.fio) return 0;
  //           return (a.fio > b.fio ? -1 : 1);
  //         })
  //       }
  //     }
  //     else if (field === 'Врач') {
  //       if (way === 'По возрастанию') {
  //         list.sort((a, b) => {
  //           if (a.doctor === b.doctor) return 0;
  //           return (a.doctor > b.doctor ? 1 : -1);
  //         })
  //       } else {
  //         list.sort((a, b) => {
  //           if (a.doctor === b.doctor) return 0;
  //           return (a.doctor > b.doctor ? -1 : 1);
  //         })
  //       }
  //     }
  //     else if (field === 'Дата') {
  //       if (way === 'По возрастанию') {
  //         list.sort((a, b) => {
  //           if (a.date === b.date) return 0;
  //           return (a.date > b.date ? 1 : -1);
  //         })
  //       } else {
  //         list.sort((a, b) => {
  //           if (a.date === b.date) return 0;
  //           return (a.date > b.date ? -1 : 1);
  //         })
  //       }
  //     }
  //   }
  // }

  const addAppointment = async (e) => {
    e.preventDefault()
    if (fio && doctor && date && complaint) {
      //const newList = [...list]
      await axios.post('http://localhost:8000/add', {
        fio: fio,
        doctor: doctor,
        date: date,
        complaint: complaint
      }).then(res => {
        const newList = [...list]
        newList.push(res.data)
        setList(newList)
      });
    } else {
      alert('Вы ввели не все поля!');
    }
  }
  return (
    <>
      <Header>
        <div className="flexWrap">
          <p>Приемы</p>
          <button>Выход</button>
        </div>
      </Header>
      <UnderHeader>
        <div className='inputWrap'>
          <label>Имя:</label>
          <input placeholder='Login' onChange={(e) => setFio(e.target.value)} />
        </div>
        <div className='inputWrap'>
          <label>Врач:</label>
          <select onChange={(e) => setDoctor(e.target.value)}>
            <option ></option>
            <option >Биба</option>
            <option>Боба</option>
          </select>
        </div>
        <div className='inputWrap'>
          <label>Дата:</label>
          <input placeholder='Дата' type={'date'} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='inputWrap'>
          <label>Жалобы:</label>
          <input placeholder='Жалобы' onChange={(e) => setComplaint(e.target.value)} />
        </div>
        <button type='submit' onClick={addAppointment}>Добавить</button>
      </UnderHeader>
      <Body>
        <div className="wrapper">
          <div className='sortWrap'>
            <label>Сортировать по:</label>
            <select onChange={(e) => setSortField(e.target.value)}>
              <option></option>
              <option value={'fio'}>ФИО</option>
              <option value={'doctor'}>Врач</option>
              <option value={'date'}>Дата</option>
            </select>
            {
              sortField ?
                <>
                  <label>Направление:</label>
                  <select onChange={(e) => setSortWay(e.target.value)}>
                    <option value={'asc'} >По возрастанию</option>
                    <option>По убыванию</option>
                  </select>
                </> : ''
            }
            {!filterActive ?
              <>
                <label>Добавить фильтр по дате:</label>
                <svg onClick={() => setFilterActive(!filterActive)} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.6667 0H3.33333C1.48333 0 0 1.5 0 3.33333V26.6667C0 28.5 1.48333 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM23.3333 16.6667H16.6667V23.3333H13.3333V16.6667H6.66667V13.3333H13.3333V6.66667H16.6667V13.3333H23.3333V16.6667Z" fill="black" fill-opacity="0.8" />
                </svg>
              </> : ''
            }
          </div>



          <div >
            {filterActive && (

              <div className="filterWrap">
                <div>
                  <label>с:</label>
                  <input placeholder='Login' type={'date'} onChange={(e) => setDateFrom(e.target.value)} />
                </div>
                <div>
                  <label>по:</label>
                  <input placeholder='Login' type={'date'} onChange={(e) => setDateTo(e.target.value)} />
                </div>
                <button onClick={() => {
                  setList(filterFunction(filteredArray));

                }}>Фильтровать</button>
                <svg onClick={() => { updateList(); setFilterActive(false) }} width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.00004 26.6667C2.00004 28.5 3.50004 30 5.33337 30H18.6667C20.5 30 22 28.5 22 26.6667V6.66667H2.00004V26.6667ZM5.33337 10H18.6667V26.6667H5.33337V10ZM17.8334 1.66667L16.1667 0H7.83337L6.16671 1.66667H0.333374V5H23.6667V1.66667H17.8334Z" fill="black" />
                </svg>
              </div>
            )}
          </div>


          {/* {filterActive ?
            <div className="filterWrap">
              <div>
                <label>с:</label>
                <input placeholder='Login' type={'date'} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label>по:</label>
                <input placeholder='Login' type={'date'} onChange={(e) => setDate(e.target.value)} />
              </div>
              <button>Фильтровать</button>
              <svg onClick={() => setFilterActive(false)} width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00004 26.6667C2.00004 28.5 3.50004 30 5.33337 30H18.6667C20.5 30 22 28.5 22 26.6667V6.66667H2.00004V26.6667ZM5.33337 10H18.6667V26.6667H5.33337V10ZM17.8334 1.66667L16.1667 0H7.83337L6.16671 1.66667H0.333374V5H23.6667V1.66667H17.8334Z" fill="black" />
              </svg>
            </div> : ''
          } */}
          <table>
            <thead>
              <tr>
                <td className='tableHead'>Имя</td>
                <td className='tableHead'>Врач</td>
                <td className='tableHead'>Дата</td>
                <td className='tableHead'>Жалобы</td>
                <td className='tableHead'></td>
              </tr>
            </thead>
            <tbody>
              <Table
                sortList={sortList}
                setList={setList}
                list={list}
                setModalEditActive={setModalEditActive}
                setModalActive={setModalActive}
                setIdx={setIdx}
                filteredArray={filteredArray}
                setNewFio={setNewFio}
                setNewDoctor={setNewDoctor}
                setNewDate={setNewDate}
                setNewComplaint={setNewComplaint}

              />


            </tbody>
          </table>

          <ModalEdit
            modalEditActive={modalEditActive}
            setModalEditActive={setModalEditActive}
            setList={setList}
            list={list}
            idx={idx}
            newFio={newFio}
            newDoctor={newDoctor}
            newDate={newDate}
            newComplaint={newComplaint}
            setNewFio={setNewFio}
            setNewDoctor={setNewDoctor}
            setNewDate={setNewDate}
            setNewComplaint={setNewComplaint}
          />
          <ModalDelete
            modalActive={modalActive}
            setModalActive={setModalActive}
            setList={setList}
            list={list}
            idx={idx}
            fio={fio}
            doctor={doctor}
            date={date}
            complaint={complaint}
          />
        </div>
      </Body>
    </>
  )
}

export default Appointment;