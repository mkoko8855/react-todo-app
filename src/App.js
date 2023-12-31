import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './component/layout/Footer';
import Header from './component/layout/Header';
import TodoTemplate from './component/todo/TodoTemplate';
import Login from './component/user/Login';
import Join from './component/user/Join';

import 'bootstrap/dist/css/bootstrap.min.css'; //0626
import AuthContext, { AuthContextProvider } from './util/AuthContext';


function App() {
  return (
    <AuthContextProvider> {/*데이터를 전달하고자 하는 자식 컴포넌트들을 provider로감싼다. 0627*/}
  <div className='wrapper'>
  <Header />
  
  <div className="content-wrapper">
    <Routes> {/*0622*/}
      <Route path='/' element={ <TodoTemplate /> } /> {/*path는 경로를적고, 엘리먼트는 경로일때 호출해야될 컴포넌트*/}
      <Route path='/login' element={ <Login /> } />
      <Route path='/join' element={ <Join /> }/>
    </Routes>
  </div>

  <Footer/>
  </div>
  </AuthContextProvider>
  );
}

export default App;

