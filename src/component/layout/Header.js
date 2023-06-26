import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";   //mui.com 이라는 라이브러리에서, AppBar, Toolbar, Grid, Typography 등등을 임포트하겠다는뜻이다.
import './header.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { isLogin, getLoginUserInfo } from '../../util/login-utils'; //0626


//0622
const Header = () => {
    
    const redirection = useNavigate(); //0626

    //0626
    const [userInfo, setUserInfo] = useState({}); 
   

    //이제 변수선언해서 userInfo를 받자
    const { token, username, role } = userInfo;



    //로그아웃 핸들러
    const logoutHandler = e => {
        localStorage.clear();
        redirection('/login'); //로그아웃 후에는 로그인페이지로 이동.
    }





     //헤더가 화면에 렌더링이 될 떄 호출되게하고싶어서 유즈이펙트쓰자
     useEffect(() => {
        setUserInfo(getLoginUserInfo()); //그러면 정보 얻어올수있겠지.
    }, []); //userInfo에 변화가있을때마다 재렌더링해야돼 라는 의미로 [] 안에 유저인포넣었음. 그러나 일단 다시 비우고





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
                                    isLogin() ? username + '님' : '오늘'
                                }
                                의 할일
                                </Typography>   
                        </div>
                    </Grid>
    
                    <Grid item>
                        <div className='btn-group'>
                            {isLogin() //트루면 로그인 했다는 것이니 로그아웃을 보여주자.
                                    ?
                                    (
                                        <button className='logout-btn' onClick={logoutHandler}>
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