import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './component/layout/Footer';
import Header from './component/layout/Header';
import TodoTemplate from './component/todo/TodoTemplate';
import Login from './component/user/Login';
import Join from './component/user/Join';



function App() {
  return (
  <>
  <Header />
  
  <Routes> {/*0622*/}
    <Route path='/' element={ <TodoTemplate /> } /> {/*path는 경로를적고, 엘리먼트는 경로일때 호출해야될 컴포넌트*/}
    <Route path='/login' element={ <Login /> } />
    <Route path='/join' element={ <Join /> }/>
  </Routes>

  <Footer/>
  </>
  );
}

export default App;

