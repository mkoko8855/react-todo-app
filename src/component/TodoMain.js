import React from 'react'
import TodoItem from './TodoItem';
import './scss/TodoMain.scss';


const TodoMain = ({todoList}) => { //(props)라고 적기 싫으면 {(todoList)} 라고 적으면됨(리스트럭쳐링). 근데 보통 props라고씀.
  //console.log(todoList);


  




  return (
    <ul className='todo-list' >
        {/* <TodoItem/>
        <TodoItem/>
        <TodoItem/> */}

        {
          todoList.map(todo => <TodoItem key={todo.id} item={todo}/>) //맵은 콜백함수를 받으니 화살표함수로나타내보자. todoItem이라는 컴포넌트를 호출할 것이다. 개수만큼 todoItem을 호출해야한다.
          //Todoitem한테 보내줄테니까 자식컴포넌트인 니가 알아서 뽀개서써 -> item={todo}
          //만약 todoList가 4개다? todo라는 객체에 4번보내겠지.  item이라는 이름으로 todo들을 넘기겠지~
          //todoItem.js로가자
        }

        
    </ul>

  )
}

export default TodoMain;
