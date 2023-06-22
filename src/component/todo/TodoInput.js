import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md';
import './scss/TodoInput.scss';
import cn from 'classnames'; //classnames라는 라이브러리를 cn이라는 이름을 지어서 만들었다!
//import classnames from 'classnames'로 해도됨!

const TodoInput = ({addTodo}) => { //addTodo써주고 아래가서 addTodo(todoText); 써주자.

    //입력창이 열리는 여부를 표현하는 상태 변수를 하나 선언하자.
    //버튼의 상태를 관리할 수 있는 것을 표현해보자. (state이다.  리액트에서 상태를 관리할 수 있는 hook 이름은 usestate이다.)
    //usestate는 상태변수값(상태변수명)이랑 setter함수(명)가 무조건 있다. 이 2개의 값을 변수에 담아놓고 사용한다.
    const [open, setOpen] = useState(false); 
    //오픈은 열렸냐 안열렸냐는 boolean으로 처리하면 된다. 그래서 false를 줬다.


    //할일 입력창에 입력한 내용을 표현하는 상태값
    const [todoText, setTodoText] = useState('');




    // + 버튼 클릭 시, 이벤트 처리. 이제 사용자가 클릭하면 이 onToggle이 호출된다. 이제 open상태를 변경해줘야지.
    const onToggle = () => {
        //open상태를 변경하는 방법은? 논리반전연산자를 이용하자
        setOpen(!open); //변경하고 하는 값을 매개값으로 주자. 기존의 Open의 반대를 주면된다. !open으로주면됨
        console.log('open: ${open}');


        //클릭이 발생하면, 버튼 요소를 취득하고 그 클래스이름을 추가해주자
        //원랜이렇게썼다.
        // const $btn = document.querySelector('.insert-btn');
        // if($btn.classList.contains('open')){
        //   //기존 오픈이 포함되있다는건, 열려있는 뜻이지 지우면되지
        //   $btn.classList.remove('open');
        // }else{
        //   $btn.classList.add('open');
        // }

        //우린 라이브러리를 이미 다운받았었지
        //npm insall classnames..(클래스 add/remove가 편리한것!)
        //임포트부터하자
        //import cn from 'classnames'; //classnames라는 라이브러리를 cn이라는 이름을 지어서 만들었다!
        //아무튼,그리고 <button className='insert-btn' onClick={onToggle}> 여기서
        //insert-btn을 짤라.
        //<button className='{cn()}' onClick={onToggle}> 로 바꾸자
        //첫번째 매개값으로는 디폴트클래스네임을 주자. -> insert-btn넣어주고
        //두번째 매개값으로는 논리 상태값을 주자. -> {open}. 즉, 논리변수주자



    }

    //submit 이벤트 핸들러
    const submitHandler = e => {
        e.preventDefault(); //태그의 기본 기능을 제한.
      //console.log('폼이 제출됨!');

      //value값 가져오는 것은 input요소를 지목해서 끌고오면 되겟지?
       //const $input = document.querySelector('.insert-form input');
        //console.log($input.value);
      //대충 인풋열어서 아무렇게나 작성하고 엔터누르고 f12확인해보면 asdsa, adfadfa 등 잘 나온다.
      //근데 할 일을 계속 추가할때가있는데, 기존 작성했던 건 지워야겠지?
        //$input.value = '';

      //그러나 상태관리는 위처럼 하면 안된다. react에서는 useState로 하는게 안전하다.
      //위로가서 '할일 입력창에 입력한 내용을 표현하는 상태값' 부분 써주자
      //const [todoText, setTodoText] = useState(''); 이렇게.

      //console.log(todoText); //작성할때마다 이벤트가 발생된 곳을 알아보기 위해. -> 엔터를 쳤을때 f12에 뜨겠지.


      addTodo(todoText); //바로 위 con.log(todoText)를 주석처리하자. 그럼 자식이 부모에게 넘길 수 있다.


      setTodoText(''); //기존 입력했었던 내용을 확인하고 이 setTodoText('');로 지워줘야 깔끔하게 입력을 다시 받을 수 있겠지
      //그러나 렌더링이 안돼서 엔터쳐도 적었던 input창 내용이 지워지지 않는다.
      //밑으로 가서 onChange={todoChangeHandler} 밑에 value={todoText}도 적어주자
      //즉, 이 setTodoText('');는 왜적었냐면, 입력이 끝나면 입력창을 비워주기 위해서 작성했다.
    }


     //input change 이벤트 핸들러 함수
     const todoChangeHandler = e => {
        //console.log(e.target.value); f12눌러서 확인해보면 input에 작성을 하면 실시간으로 계속 바뀐다.
        setTodoText(e.target.value); //이거 써주고 바로 위로가서 setTodoText(''); 써주자. 값을 비워주기 위해.
     }





    // const showForm = () => { //화살표 함수를 많이 사용하는데, 일반 function 써도됨
       
    //       return 

    // }

    // const showForm = function(){ 이렇게 일반 function 써도 됨.
    // }


  return (
        <>
            {
              open && ( //단축평가연산자이다. 즉, and연산자이다. 좌항과 우황이 트루여야 전체 결과가 트루이다. 한쪽이라도 false면 false이다.
              //즉, open은 불린타입인데, open이 true면 안에있는 내용이 truthy한 값을 띠게 되면서 전체결과가 true가되면서 내용이 return이된다. open이 false면 한쪽이 false가되니 return이 안된다.
                <div className='form-wrapper'>
                    <form className='insert-form' onSubmit={submitHandler}>
                        <input
                            type='text'
                            placeholder='할 일을 입력 후, 엔터를 누르세요!'
                            onChange = {todoChangeHandler} //쓰고 const todoChangeHandler = e => { 걸어주고 f12눌러서 확인해보면 input에 작성을 하면 실시간으로 계속 바뀐다.
                            value={todoText} //이거까지 적어줘야 엔터치면 기존에 작성했던 input내용이 지워지고 값을 새롭게 적을 수 있음
                       /> 
                    </form>
                </div>
              )
            }

{/*즉, showForm은 open에 상태에 따라 리턴을 할지말지 판단을 한다는 것인데,
open이 false면 if문은 건너뛰어지고 함수내에서는 아무것도 진행안된다.
open이 true면 리턴이 되겠지. 저기 if(open){ 안쪽 내용이.
그 안쪽 내용이 return(<> {showForm()}부분으로 내용이 넘겨간다.*/}


            <button className={cn('insert-btn', {open})} onClick={onToggle}> 
            {/*abc: open이라고써도되는데, abc라는 클래스이름에 open을 담아도됨.
              근데우린 open이 상태(논리)변수니까 딱히 이름 안붙여줘도됨.
              
              cn() : 첫번째 파라미터는 항상 유지할 default클래스
                     두번째 파라미터는 논리 상태값이 true일 경우, 해당 클래스가 추가.
                                                     false일 경우, 제거가 된다.
              그리고 지정하고 싶으면 클래스이름이 있다면 {클래스이름 : 논리값} 주면 된다.
              클래스이름을 지정하고 싶지 않으면 변수명이 클래스 이름으로 사용된다.
            */}
                <MdAdd/>
            </button>

        </>
    )
}

export default TodoInput;