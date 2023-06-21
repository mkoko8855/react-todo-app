import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput';
import TodoMain from './TodoMain';
import TodoHeader from './TodoHeader';
import './scss/TodoTemplate.scss';
//'./scss/TodoTemplate.scss';



const TodoTemplate = () => {


  //todos 배열을 상태관리해야한다(useState 사용)
  const [todos, setTodos] = useState([]);
  //서버에 할일 목록(json으로받음)을 요청(fetch)해서 받아와야 함.

  const API_BASE_URL = 'http://localhost:8181/api/todos';




  //자바쪽에선 list로 던져주는데, 자바의 리스트를 던져주고 json으로 변환해줘야 스크립트가 알수있다~
   
  //todos는 todoMain.js에게 전달해야한다. props로전달하자. 아래로가서 작성마저 하자. ->         <TodoMain todoList={todos}/>
 
    //  {
    //     id: 1,
    //     title: '아침 산책하기',
    //     done: false
    //   },
    //   {
    //     id: 2,
    //     title: '오늘 주간 신문 읽기',
    //     done: true
    //   },
    //   {
    //     id: 3,
    //     title: '샌드위치 사먹기',
    //     done: false
    //   },
    //   {
    //     id: 4,
    //     title: '리액트 복습하기',
    //     done: false
    //   }
    // ]);

      
    //에러 자꾸 뜨는건 -> id값 시퀀스 생성 함수로 순차적으로 해결해주자
    const makeNewId = () => {
      //id가 마지막인게 뭔지 알아내야한다. 위에보면 1, 2, 3, 4의 id들이 있는데,
      //가장 마지막인 4잖아? 나중에 db쓰면 오토인크리먼트쓰면 상관없는데 지금은 안되니까..
      //마지막 요소의 index는 항상 length-1 이잖아.
      if(todos.length === 0) {
        return 1;
      }
      return todos[todos.length - 1].id + 1; //마지막요소의 id값보다 하나 크면돼~ 그러면 안겹치겠지만, 만약 todos가 비어있다면..? 마지막인덱스가없잖아.
                                             //위에서 처리해주자
    }
      



      //todoInput에게 todoText를 받아오는 함수.
      //그리고, 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달 할 때는
      //props사용이 불가능하기 때문에, 부모 컴포넌트에서 함수(매개변수)를 하나 선언해줘야 한다!
      //그리고나서 props로 함수를 전달해야 한다.
      //이후, 부모는 자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달한다.
      //부모는 객체를 만들어 아래 useEffect함수의 배열 안에 넣어준다는 것이다.


      const addTodo = todoText => {  //todoText가 아니라 아무말적어도됨
        console.log('할 일 정보: ', todoText);

        //그리고 밑으로 가서 return에 <TodoInput addTodo={addTodo}/> 적어주자

        const newTodo = {
          //id: makeNewId(), 
          //title: todoText, //자식(todoInput)이 전달해준 todoText
          //done: false

          title: todoText //todoText는 todoInput이 보내주는 것이다.그걸 부모가 받아서 객체선언해서 todoText라고해주는것이다.


        };


         fetch(API_BASE_URL, {
           method : 'POST',
           headers : { 'content-type' : 'application/json'},
           body : JSON.stringify(newTodo) //변환해서줌
         })
         .then(res => res.json())
         .then(json => {
         setTodos([json.todos]); 
         })

      








        //todos.push(newTodo);      -> 이제 이거 대신에 useState를 통해 todos를 상태관리하니까 아래꺼로쓰자.


        //const copyTodos = todos.slice(); //범위를 지정해서 자르자. 지정안하면 처음부터 끝까지 잘라지고 원본배열을 리턴받겠다는 것이다.
        //copyTodos.push(newTodo); //카피투두스는 useState가 아니니 푸시가 가능. 그 다음, setTodos()에 copyTodos를 넣어주자.

        /*그러나
        const copyTodos = todos.slice();
        copyTodos.push(newTodo);
        setTodos(copyTodos);
        말고 코드를 간결하게 써보자

        아래서 setTodos(todos.concat([newTodo])); 이것만 써주자


        근데 더 간결하게 써보자....
        setTodos(...todos, newTodo); 이것만 써주자   -> todos에있는거 다끌고와. 그리고 newTodo도 추가해주면서 새로운 배열만들게. 그 다음 setTodos로 새배열로 갈아치웠다.

        
        */






        //리액트의 상태변수는 무조건 setter를 통해서만 상태값을 변경할 수 있다. 그래야 렌더링에 적용이 된다.
        //다만, 상태변수가 불변성(immutable)을 가지기 때문에 기존 상태에서 변경은 불가능하고,
        //새로운 상태를 만들어서 변경해야 한다.




        //setTodos([...todos, newTodo]); //이거쓰니까 이제 위에 있는 todos.push(newTodo);는 주석처리하자. 근데 setTodos();안에는 뭘넣을까? newTodo를 쓰면되나? 아니다. newTodo는 배열전달이 아니라 객체를 전달한다. 객체엔 map이라는 함수가 없잖아 그래서 서버가 터진다.
                    //그럼뭘써? todos.push(newTodo);라 하고 setTodos(todos);로해? 푸시가 안된다매?
                    //그러면 setTodos();는 불렀는데 어떻게할까..배열을가져와서넣어야하는데..즉, newTodo만써서 객체를 배열로 교환한 상탠데,
                    //방법은 다음과 같다. todos의 복사본 배열을 하나 만들고 거기에 newTodo를 넣고 기존배열을 지우고 새로운배열자체로 갈아버리면된다.
                    //위로가서 복사하는 방법을 적용해보자 바로위에있다~      -> 0621 setTodos위로올려!
      }

      //할 일 삭제 처리 함수
      const removeTodo = id => { //id라는 변수 선언해야한다! 꼭! removeTodo를 todoitem까지 전달해야한다. 일단은 todoMain한테 보내고 props로 전달받은 todomain이 template한테 보내주게해야됨
          console.log(`삭제 대상 id: ${id}`);

          //map처럼 편하게쓸수있는 방법이 있다.
          //setTodos(todos.filter(todo => todo.id !== id));  //조건을 걸어서 조건에 맞는 요소만 반환해서 새로운 배열로 리턴해주는 filter!
                                                           //즉, 주어진 배열(todos)의 값들을 순회하여 조건에 맞는 요소들만 모아서 새로운 배열로 리턴해준다!
                                                           //즉, todo에는 todos의 요소들이 들어온다. > 객체들이 todo로 들어가면서 id들을 비교하면서 같으면 저 조건식에 false니까 걸러진다. > 내가 삭제하고하는 id를 가진 객체들만 필터링되고 나머진 새로운 배열로 선언되고 setTodos에 전달이 되겠다.
     
                                                           fetch(`${API_BASE_URL}/${id}`, {
                                                            method: 'DELETE'
                                                          })
                                                            .then(res => res.json())
                                                            .then(json => {
                                                              setTodos(json.todos);
                                                            });
     
     
     
                                                          };


        //할 일 체크 처리 함수
        const checkTodo = (id, done) => {

          fetch(API_BASE_URL, {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
              'done': !done,
              'id' : id
            })
          })
          .then(res => res.json())
          .then(json => {setTodos(json.todos)});




          console.log(`체크한 Todo id: ${id}`);

          //배열 고차 함수.  
          //우리가 생각나는 대로 작성해보면,
          //todos자체를 바로 변환못하니 복사본으로
          // const copyTodos = [...todos];
          // for(let cTodo of copyTodos){
          //   if(cTodo.id === id){
          //     cTodo.done = !cTodo.done; //기존에 있던 cTodo의 done값을 반전시켰다.
          //   }
          // }

          // setTodos(copyTodos); //이거해줘야 화면에 나옴
          
          //근데 코드를 더 간결하게 써보자 -> 변화가 됐다는걸 감지시켜야 화면이 리렌더링이 된다.
          //setTodos(todos.map(todo => todo.id === id ? {...todo, 'done': !todo.done} : todo )); //map도 콜백함수를 매개값으로 받는다. 혹시 todo라는 변수로 들어온 id가 같느냐 뭐랑? 체크버튼을 누른 그 id랑 같니? -> 맵이라는 함수를 이용해서 todos의 객체를 받아오고있고, 조건식을 걸엇다. 체크를 누르지 않은 나머지 할일들은 유지하면되고 조건이 트루면 일단 이 트루의 모든 프로퍼티의 값을 그대로 복사해와서 가지고 올껀데, done의 값은 바꿔주겠다는 얘기다.
        }




        //체크가 안된 할 일의 개수 카운트하기
        const countRestTodo = () => { //이거 TodoHeader한테줘야됨. done이 false가 몇개인가? 를 세보면 된다.

          // const filteredTodos =  todos.filter(todo => !todo.done);
          // return filteredTodos.length; 보다 더 짧게

          return todos.filter(todo => !todo.done).length; //이거썼으니 프롭스선언하러가자. 아래 리턴문으로 ㄱㄱ
          
        } 



      //setTodos에 변화가 발동할때 렌더링을 진행해주는 함수를 짜자
      useEffect(() => { //useEffect는 실행하고자하는 함수, 두번째는 배열을 받는데, 배열 안에다가 다시 렌더링이 진행 될 때 어떤 상태변수가 렌더링되냐고 할때, 얘만 다시 렌더링해줄 수있는 것이 useEfect이다
          
        
        //페이지가 렌더링 됨과 동시에 할 일 목록을 요청해서 뿌려주겠다!!
        fetch(API_BASE_URL, ) //fetch의 첫번째 값으로는 url줬지. 두번째 매개값으로는 요청에 관련된 정보를 객체 형식으로 줌.  근데 여기선 X
          .then(res => res.json()) //그 결과에서 제이슨만 뽑아.
          .then(json => { //제이슨 데이터로 뽑아 낸 것을 어떻게 진행(작성)할지 적자
            console.log(json.todos);



            //fetch를 통해 받아온 데이터를 상태 변수에 할당. (배열자체를 바꾼거임!)
            setTodos(json.todos);
          });

      }, []);




                                                   



  return (
    <div className='TodoTemplate'> 
        <TodoHeader count={countRestTodo}/>
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
        {/*todoMain을 호출하면서 값이날라오겠지. 그거를 TodoMain이 받아야한다. 가서 ()안에 props적어주자*/}
       
        <TodoInput addTodo={addTodo}/> 
    </div>


  );
}

export default TodoTemplate;