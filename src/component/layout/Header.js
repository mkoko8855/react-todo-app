import React, { useContext, useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";   //mui.com 이라는 라이브러리에서, AppBar, Toolbar, Grid, Typography 등등을 임포트하겠다는뜻이다.
import './header.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { isLogin, getLoginUserInfo } from '../../util/login-utils'; //0626
import AuthContext from '../../util/AuthContext';
import { API_BASE_URL, USER } from '../../config/host-config';

//0622
const Header = () => {
    

    const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`;


    const redirection = useNavigate(); //0626





    //프로필 이미지 url 상태 변수 0629
    const [profileUrl, setProfileUrl] = useState(null);



    //AuthContext에서 로그인 상태와 onLogout 함수를 가져오자.
    const {isLoggedIn, onLogout, userName} = useContext(AuthContext);  //3가지중 2가지빼옴.




    //0626
    //const [userInfo, setUserInfo] = useState({}); 주석처리 0627
   

    //이제 변수선언해서 userInfo를 받자
    //const { token, username, role } = userInfo; 주석처리 0627



    //로그아웃 핸들러
    const logoutHandler = e => {
        //AuthContext의 onLogout함수를 호출하여 로그인 상태를 업데이트.
        onLogout();
        redirection('/login'); //로그아웃 후에는 로그인페이지로 이동.
    }





     //헤더가 화면에 렌더링이 될 떄 호출되게하고싶어서 유즈이펙트쓰자
     //useEffect(() => { 주석처리0627
     //   setUserInfo(getLoginUserInfo()); //그러면 정보 얻어올수있겠지. 주석처리0627
     //}, []); //userInfo에 변화가있을때마다 재렌더링해야돼 라는 의미로 [] 안에 유저인포넣었음. 그러나 일단 다시 비우고
     //주석처리0627
     

//0629
const fetchProfileImage = async() => {
    //fetch요청을 보낼꺼니 url이필요하잖아. 임포트하자 import { API_BASE_URL, USER } from '../../config/host-config';
    //임포트해주고 변수하나선언하자 -> 위로가서 const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`; 선언해주고 다시여기로와서,
    const res = await fetch(profileRequestURL, {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')} //토큰꺼내기~
    });

    if (res.status === 200) {
        //res.json(); 이거아니다. json데이터아니잖아. 그럼어떻게?
        //서버에서는 직렬화된 이미지가 응답된다.(바이트로 변환된 이미지가 온다.)
        const profileBlob = await res.blob();
        //우린 blob으로받았으니, 해당 이미지를 imgUrl로 변경해야한다.
        const imgUrl = window.URL.createObjectURL(profileBlob); //이건 blob형태를 url로바꿔준다.
        
        setProfileUrl(imgUrl);
    } else { //그리고 status가 200이 아니면 에러니까. (메세지가오겠지?)
        const err = await res.text();
        setProfileUrl(null);

    }

}


//0629
useEffect(() => {
    fetchProfileImage();


},[isLoggedIn]); //isLoggedIn의 변화가 생기면 fetchProfileImage()가 동작해라!





     return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            width: '100%'
        }}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h4">
                                {
                                    isLoggedIn
                                    ? userName + '님'
                                    : '오늘'
                                }
                                의 할일
                            </Typography>
                            
                            {isLoggedIn && 
                            <img
                                src={profileUrl || require('../../assets/img/anonymous.jpg')}
                                alt='프로필 사진'
                                style={{
                                    marginLeft: 20,
                                    width: 75,
                                    height: 75,
                                    borderRadius: '50%'
                                }}
                            
                            />
                        }
                        </div>
                    </Grid>
                    
                    <Grid item>
                        <div className='btn-group'>
                        {isLogin()
                                ?
                                (
                                    <button 
                                        className='logout-btn'
                                        onClick={logoutHandler}>
                                        로그아웃
                                    </button>
                                )
                                :
                                (
                                    <>
                                        <Link to='/login'>로그인</Link>
                                        <Link to='/join'>회원가입</Link>
                                    </>
                                )

                        }
                        </div>
                    </Grid>
                    
    
                </Grid>
            </Toolbar>
        </AppBar>
      );

}

    

export default Header