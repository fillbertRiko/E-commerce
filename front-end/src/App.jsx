import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/CRUD/LoginPage';
import Register from './components/auth/CRUD/Register';
import { Route } from 'react-router-dom';
import './assets/css/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
