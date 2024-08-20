import logo from './logo.svg';
//import './App.css';
import {Link, Route, Routes} from "react-router-dom"
import UserPage from './page/UserPage';
import ProductPage from './page/ProductPage';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';

function App() {
  return (
    <>
    <div>
      <Link to="/user">users</Link>
      <Link to="/product">products</Link>
      <Link to="/register">register</Link>
      <Link to="/login">loging</Link>
    </div>
    <div>
      <Routes>
        <Route path='/user' element={<UserPage/>} />
        <Route path='/product' element={<ProductPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
