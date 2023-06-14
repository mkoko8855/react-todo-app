import React from 'react'
import TodoInput from './TodoInput';
import TodoMain from './TodoMain';
import TodoHeader from './TodoHeader';
import './scss/TodoTemplate.scss';
//'./scss/TodoTemplate.scss';

const TodoTemplate = () => {

  //서버에 할일 목록(json으로받음)을 요청(fetch)해서 받아와야 함.
  const todos = [ //자바쪽에선 list로 던져주는데, 자바의 리스트를 던져주고 json으로 변환해줘야 스크립트가 알수있다~
   
  //todos는 todoMain.js에게 전달해야한다. props로전달하자. 아래로가서 작성마저 하자. ->         <TodoMain todoList={todos}/>
 
     {
        id: 1,
        title: '아침 산책하기',
        done: false
      },
      {
        id: 2,
        title: '오늘 주간 신문 읽기',
        done: true
      },
      {
        id: 3,
        title: '샌드위치 사먹기',
        done: false
      },
      {
        id: 4,
        title: '리액트 복습하기',
        done: false
      }

  ];




  return (
    <div className='TodoTemplate'> 
        <TodoHeader/>
        <TodoMain todoList={todos}/>
        {/*todoMain을 호출하면서 값이날라오겠지. 그거를 TodoMain이 받아야한다. 가서 ()안에 props적어주자*/}
        <TodoInput/>
    </div>


  );
}

export default TodoTemplate;