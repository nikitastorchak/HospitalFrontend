import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Appointment from './Components/Appointment';
import './css/App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/appointment' element={<Appointment />} />
      <Route path="*" element={<SignUp to="/" />} />
    </Routes>
  );
}

export default App;