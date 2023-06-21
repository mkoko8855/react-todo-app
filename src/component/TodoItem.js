import React from 'react'
import {MdDelete, MdDone} from 'react-icons/md';
import './scss/TodoItem.scss';
import cn from 'classnames';



const TodoItem = ({item, remove, check}) => {

  const {id, title, done} = item; //3개를 item에서 쪼개겠다. -> 변수3개선언되고 각각의 프로퍼티들이 변수에 각각 들어간다. (디스트럭쳐링문법). 즉, 이렇게 넘기자 라는 얘기다.
  //그럼이제 뭔가가들어있겠지? 변수의 값을 다 받았다!
  //아래 할일 어쩌고 부분에는 item에서 뽀개놨던 title이 들어가면되겠지. 할일어쩌고를 주석처리하고 {title}로 써주자



  return (
    <li className='todo-list-item'>
        <div className={cn('check-circle', {active: done})} onClick={() => check(id, done)}>   {/*active의 결과는 done에따라 달라질꺼야~*/}
                                                                                         {/*이제 done이라는 값이 true냐false냐에 따라 MdDone이라는 아이콘을 표현할지 말지 정할것이다.*/}
            {done && <MdDone/> }                                                         {/*즉, done이 false면 Medone이라는 아이콘은 나오지 않는다.*/}

        </div>
                                                                    {/* <span className='text'>할 일 어쩌고~~~</span> */}
        <span className={cn('text', {finish: done})}>{title}</span> {/*finish라는건 done에 따라 달리질거야. done이 트루면 액티브와 피니쉬가 둘다 들어간다. 트루면 mddone이라는 아이콘도 들어가겠지*/}

        <div className="remove" onClick={() => remove(id)}>         {/*여기에는 쓰레기통 아이콘이 들어갈 거임*/}
            <MdDelete/>

        </div>  
    </li>
  )
}

export default TodoItem;