import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/CRUD/LoginPage';
import { Route } from 'react-router-dom';
import './assets/css/style.scss';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
