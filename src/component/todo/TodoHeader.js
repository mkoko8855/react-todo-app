import React from 'react'
import './scss/TodoHeader.scss';

const TodoHeader = ({count}) => {

  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' }); //요일 -> weekday는 위에 안쓰고 여기다가 따로 써줬다. 아래 className이 따로 있으니까.


  return (
    <header>
        {/* <h1>2023년 6월 13일</h1> */}
        <h1>{dateString}</h1>
        
        {/* <div className='day'>화요일</div> */}
        <div className='day'>{dayName}</div>
        <div className='tasks-left'>할 일은 {count()}개 남음</div>
    </header>
  )
}

export default TodoHeader;