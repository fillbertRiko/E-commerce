import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/pages/Login';
import ProductList from './components/pages/ProductList';
import ProductDetails from './components/pages/ProductDetails';
import Cart from './components/pages/Cart';
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
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
