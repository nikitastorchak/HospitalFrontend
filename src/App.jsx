import { useState } from "react";
import SignUp from './SignUp';
import SignIn from './SignIn';
import Appointment from './Appointment';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

const App = () =>{

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [errors, setErrors] = useState([])

  return (

    <Routes>
      <Route path='/signup' element={<SignUp login={login} setLogin={setLogin} password={password} setPassword={setPassword} passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} errors={errors} setErrors={setErrors}/>}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/appointment' element={<Appointment/>}/>
      <Route
        path="*"
        element={<SignUp to="/" />}
      />
    </Routes>
    
    
    
  );
}

export default App;
