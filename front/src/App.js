import logo from './logo.svg';
//import './App.css';
import {Link, Route, Routes} from "react-router-dom"
import UserPage from './page/UserPage';
import ProductPage from './page/ProductPage';

function App() {
  return (
    <>
    <div>
      <Link to="/user">users</Link>
      <Link to="/product">products</Link>
    </div>
    <div>
      <Routes>
        <Route path='/user' element={<UserPage/>} />
        <Route path='/product' element={<ProductPage/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
