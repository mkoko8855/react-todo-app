import React from 'react'
import {MdDelete, MdDone} from 'react-icons/md';
import './scss/TodoItem.scss';

const TodoItem = () => {
  return (
    <li className='todo-list-item'>
        <div className='check-circle'>
            <MdDone/>
        </div>
        <span className='text'>할 일 어쩌고~~~</span>
        <div className="remove"> {/*여기에는 쓰레기통 아이콘이 들어갈 거임*/}
            <MdDelete/>

        </div>
    </li>
  )
}

export default TodoItem;