//0626

//로그인 한 유저의 데이터 객체를 반환하는 함수를 선언해주자.
export const getLoginUserInfo = () => {
    return {
        //객체를 리턴할꺼다
        token : localStorage.getItem('ACCESS_TOKEN'),   //토큰은 로컬스토리지를 꺼낼꺼다.
        username : localStorage.getItem('LOGIN_USERNAME'),
        role : localStorage.getItem('USER_ROLE'),
    };


};


//이번에는 로그인 여부를 확인하는 함수를 선언해주자.
export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');  //어세스토큰 값이 있으면 트루, 없으면 폴스. 즉, 논리를 바꿨다. 어세스토큰이 만료되서 빈 문자열이나 사라졌어. 그거 논리값으로 바꾸면 false다.
//어려우면 이렇게 쓰자.
//const isLogin = () => {
//    const token = localStorage.getItem('ACCESS_TOKEN');
//    if(token === null) {
//        return false;
//    }
//    return true;
//}



