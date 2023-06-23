//0622

import React from 'react'
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { json } from 'react-router-dom';


const Login = () => {

    const REQUEST_URL = BASE + USER + '/signin';


    //서버에 비동기 로그인 요청
    //함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴한다.
    const fetchLogin = async() => {

         //사용자가 입력한 이메일, 비밀번호 입력 태그를 얻어오고 패치날리자
         const $email = document.getElementById('email');
         const $password = document.getElementById('password');

        
        //await는 async로 선언된 함수에서만 사용이 가능하다.
        //await는 프로미스 객체가 처리될 때까지 기다린다.
        //프로미스 객체의 반환값을 바로 활용할 수 있게 도와준다.
        //then()을 활용하는 것 보다 가독성이 좋고 쓰기도 쉽다.
        const res = await fetch(REQUEST_URL, {  //await는 프로미스객체를 바로 변수에꽂을수있음
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })

        });

        if(res.status === 400){
            const text = await res.text();
            alert(text);
            return;
        }

        //제이슨도 마찬가지자. 앞에 await붙이자
        const json = await res.json(); //제이슨도 변수로 바로 받아볼수있다.
        console.log(json);
    };








    //     fetch(REQUEST_URL, {
    //         method: 'POST', //포스트방식이고
    //         headers: { 'content-type' : 'application/json'}, //제이슨이라고말해주고
    //         body: JSON.stringify({
    //                 email: $email.value,
    //                 password: $password.value
    //         })
    //     })
    //     .then(res => {
    //         if(res.status === 400){ //가입이 안되어있거나 비밀번호가 틀린 경우에는 status가 400이다.
    //             return res.text(); //400에러면 text로 리턴해주고, 그렇지않다면 아래 json으로리턴하자.
    //         }
    //         return res.json();
    //     })
    //     .then(result => { //뽑아낸 제이스를
    //         //result엔 text랑 json도 들어올수있으니
    //         if(typeof result === 'string'){ //result가 string이라면, 즉 400에러라면
    //             alert(result);
    //             return;
    //     }
    //         console.log(result); //확인해보자
    //     })
    // } 신 문법으로쓰자. 다 주석~
    



    //로그인 요청 핸들러
    const loginHandler = e => {
        e.preventDefault(); //리액트는 서브밋동작이 필요X

       
        
        //서버에 로그인 요청 전송
        fetchLogin();


    };








    return (
        <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
    
            <form noValidate onSubmit={loginHandler}>
    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
    
}    

export default Login