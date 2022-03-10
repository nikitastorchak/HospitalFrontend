import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from './Header';
import Body from './Body';

const SignUp = ({login, setLogin, password, setPassword, passwordCheck, setPasswordCheck, errors, setErrors}) => {

  
  const loginValid = /^[0-9A-Za-z]{6,}$/
  const passwordValid = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/
  const [loginChecker, setLoginChecker] = useState(true)
  const [passwordChecker, setPasswordChecker] = useState(true)
  const [passwordEquality, setPasswordEquality] = useState(true)

  const checkForSignUp = (e) => {
    e.preventDefault();
    setErrors([])
    if (loginValid.test(login)) {
      setLoginChecker(true)
    } else {
      errors.push('noLogin')
      setLoginChecker(false)
    } 

    if (passwordValid.test(password)) {
      setPasswordChecker(true)
    } else {
      errors.push('noPassword')
      setPasswordChecker(false)
    } 
      
    if (!(password === passwordCheck) || passwordCheck === '') {
      setPasswordEquality(false)
      errors.push('notIdentical')
    } else {
      setPasswordEquality(true)
    }
    if (errors.length === 0) {
      alert('Ну зарегистрировался ты и что?')
    }
    
  }

  return (
    <>
      <Header>
        <svg width="89" height="72" viewBox="0 0 89 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M69.8736 36.07L87.4879 22.14C89.214 20.775 89.214 18.57 87.4879 17.205L68.2803 2.01499C66.5543 0.649991 63.7661 0.649991 62.0401 2.01499L44.4257 15.945L26.8114 2.01499C25.9262 1.34999 24.8198 0.999992 23.6691 0.999992C22.5627 0.999992 21.412 1.34999 20.5711 2.01499L1.36352 17.205C-0.362507 18.57 -0.362507 20.775 1.36352 22.14L18.9779 36.07L1.36352 50C-0.362507 51.365 -0.362507 53.57 1.36352 54.935L20.5711 70.125C22.2972 71.49 25.0854 71.49 26.8114 70.125L44.4257 56.195L62.0401 70.125C62.9252 70.825 64.0317 71.14 65.1823 71.14C66.333 71.14 67.4395 70.79 68.3246 70.125L87.5322 54.935C89.2582 53.57 89.2582 51.365 87.5322 50L69.8736 36.07ZM44.5143 25.5C46.9484 25.5 48.94 27.075 48.94 29C48.94 30.925 46.9484 32.5 44.5143 32.5C42.0801 32.5 40.0885 30.925 40.0885 29C40.0885 27.075 42.0801 25.5 44.5143 25.5ZM23.6691 32.36L7.60378 19.69L23.6691 6.98499L39.6902 19.655L23.6691 32.36ZM35.6628 39.5C33.2287 39.5 31.2371 37.925 31.2371 36C31.2371 34.075 33.2287 32.5 35.6628 32.5C38.097 32.5 40.0885 34.075 40.0885 36C40.0885 37.925 38.097 39.5 35.6628 39.5ZM44.5143 46.5C42.0801 46.5 40.0885 44.925 40.0885 43C40.0885 41.075 42.0801 39.5 44.5143 39.5C46.9484 39.5 48.94 41.075 48.94 43C48.94 44.925 46.9484 46.5 44.5143 46.5ZM53.3657 32.5C55.7998 32.5 57.7914 34.075 57.7914 36C57.7914 37.925 55.7998 39.5 53.3657 39.5C50.9315 39.5 48.94 37.925 48.94 36C48.94 34.075 50.9315 32.5 53.3657 32.5ZM65.1381 65.19L49.0727 52.52L65.1381 39.815L81.1592 52.485L65.1381 65.19Z" fill="black"/>
        </svg>
        <p>Зарегистрироваться в системе</p>

      </Header>
      <Body>
        <svg width="376" height="376" viewBox="0 0 376 376" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M188 83.8333V0.5H0.500031V375.5H375.5V83.8333H188ZM75.5 333.833H38V292.167H75.5V333.833ZM75.5 250.5H38V208.833H75.5V250.5ZM75.5 167.167H38V125.5H75.5V167.167ZM75.5 83.8333H38V42.1667H75.5V83.8333ZM150.5 333.833H113V292.167H150.5V333.833ZM150.5 250.5H113V208.833H150.5V250.5ZM150.5 167.167H113V125.5H150.5V167.167ZM150.5 83.8333H113V42.1667H150.5V83.8333ZM338 333.833H188V292.167H225.5V250.5H188V208.833H225.5V167.167H188V125.5H338V333.833ZM300.5 167.167H263V208.833H300.5V167.167ZM300.5 250.5H263V292.167H300.5V250.5Z" fill="black" fill-opacity="0.8"/>
        </svg>
        <form onSubmit={checkForSignUp}>
          <h1>Регистрация</h1>
          <label htmlFor="">Login:</label>
          {!loginChecker ? <p>* Логин должен содержать не менее 6 символов</p> : ''}
          <input placeholder='Login' onChange={(e) => setLogin(e.target.value)}/>
          <label htmlFor="">Password:</label>
          {!passwordChecker ? <p>* Пароль должен содержать не менее 6 символов и  содержать хотя 1 число</p> : ''}
          <input type={'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="">Repeat password:</label>
          {!passwordEquality ? <p>* Пароли должны совпадать!</p> : ''}
          <input type={'password'} placeholder='Password' onChange={(e) => setPasswordCheck(e.target.value)}/>
          <button type="submit">Зарегистрироваться</button>
          <Link to='/signin'><a>Авторизоваться</a></Link>
        </form>
      </Body>
    </>
    
  )
}

export default SignUp;