//0627
import React, { useEffect, useState } from "react";

//새로운 전역 Context를 생성
const AuthContext = React.createContext({ //임포트직접하자.. import React from "react"; . 아래 내용을 어느 컴포넌트에서도 사용할 수 있도록
    //관리할 값을 적어주자
    isLoggedIn: false, //로그인 했는지의 여부 추적(로그인했으면 true로 바꿔주면되지)
    userName: '',
    //함수도넣을수있다.
    onLogout: () => {}, //아무내용도없는 더미함수를 넣으면 자동완성이 편하다.
    onLogin: (email, password) => {},

    setUserInfo: () => {}

}); 

//위에서 생성한 Context를 제공하는 함수를 선언하자. provide함수 선언해야한다.
//이 컴포넌트를 통해 자식 컴포넌트들에게 인증 상태와 관련된 함수들을 전달 할 수 있다.
export const AuthContextProvider = props => {
    

    const [isLoggedIn, setIsLoggedIn] = useState(false); //useState로관리할거다. 기본값 false로.


    const [userName, setUserName] = useState('');





    //컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 갖고 와서 상태를 설정.
    useEffect(() => {
        //렌더링 될떄, 로컬스토리지에서 로긴 성공하면 isLoggedIn을 1로 넣어줄꺼다. 이걸로 확인할꺼다
        if(localStorage.getItem('isLoggedIn') === '1'){
            setIsLoggedIn(true);
            setUserName(localStorage.getItem('LOGIN_USERNAME'));
        }
    }, []);


    //로그아웃 핸들러(로그인.js가면 로그아웃핸들러가있는데 이걸로 대체할꺼다.)
    const logoutHandler = () => {
        //사용자가 로그아웃하면 기존에 있던 로컬스토리지를 비우자
        localStorage.clear();
        setIsLoggedIn(false);
    };



    //로그인 핸들러
    const loginHandler = (token, userName, role) => {
        localStorage.setItem("isLoggedIn", "1"); //로긴 성공하면 토큰, 롤, 유저네임도 하고있지만 여기서 일괄로처리할수있음..트루라는 뜻으로 1을주고
        localStorage.setItem('ACCESS_TOKEN', token ); //괄호안에는 저장할값을주자. 키값과 밸류다. 로컬스토리지와 셋아이템은 메서드다.
        localStorage.setItem('LOGIN_USERNAME', userName );
        localStorage.setItem('USER_ROLE', role );
        setIsLoggedIn(true);
        setUserName(userName);
    };

    //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
    const setLoginUserInfo = ({ token, userName, role}) => {
        localStorage.setItem('ACCESS_TOKEN', token ); 
        localStorage.setItem('LOGIN_USERNAME', userName );
        localStorage.setItem('USER_ROLE', role );
    }


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn, /*뒤 키값 지워도됨. 이름같으니까.*/
            userName: userName,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            setUserInfo: setLoginUserInfo
        }}>
            {props.children}
        </AuthContext.Provider>

    );

};
export default AuthContext;
