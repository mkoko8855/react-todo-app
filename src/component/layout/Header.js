import React, { useContext, useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";   //mui.com 이라는 라이브러리에서, AppBar, Toolbar, Grid, Typography 등등을 임포트하겠다는뜻이다.
import './header.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { isLogin, getLoginUserInfo } from '../../util/login-utils'; //0626
import AuthContext from '../../util/AuthContext';


//0622
const Header = () => {
    
    const redirection = useNavigate(); //0626


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