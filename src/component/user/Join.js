//0622 0623

import React, { useContext, useState, useRef } from 'react' //0628 useRef는 요소를 기억하는 태그다. 요소취득할때 바닐라에서 document~~로했었잖아. 그거랑같음.
import {Button, Container, Grid,
    TextField, Typography, Link} from "@mui/material";

    //리다이렉트 사용하기
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL as BASE, USER } from '../../config/host-config';
import { useEffect } from 'react';
import AuthContext from '../../util/AuthContext';
import CustomSnackBar from '../layout/CustomSnackBar';
import './Join.scss';


//http://localhost:8181/api/auth
const Join = () => {


    //0628
    //useRef로 태그 참조하기
    const $fileTag = useRef();



    //리다이렉트 사용하기
    const redirection = useNavigate();
   
    //0628
    const { isLoggedIn } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    //0628
    useEffect(() => { //콜백함수안에는 실행할 함수 내용.
        if (isLoggedIn) {
            setOpen(true); //위에 오픈은 초기값으로 false를줬는데 true로바꾸는 것.
            setTimeout(() => {
                //3초뒤에시작할내용은
                redirection('/'); //홈화면으로보내기~
            }, 3000 ); //3초
        }
    }, [isLoggedIn, redirection]); //isLoggedIn과 redirection에 변화가 감지될때마다 재렌더링







    const API_BASE_URL = BASE + USER;


    //상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({ //사용자가 아무것도 작성하지 않았을 때의 기본값인 useState값은 
        userName: '',
        password: '',
        email: ''
    }); 
    //유저네임 받으면 userName부분만 채워주고, passWord받아서 검증끝나면 setValue에서 그부분만채워고 ..이런식으로.
    //검증 다 끝나면 위 3가지 값은 json으로 변환해서 서버로 요청 보내자.
    //서버에서는 우리가 준비했던 것으로 확인할 수 있다.
        



    //검증 메세지에 대한 상태변수 관리
    const[message, setMessage] = useState({ //useState();의 초기값은? 
        //각각의 영역을 객체로관리할것이다
        userName: '',
        password: '',
        passwordCheck: '',
        email: ''
    }); 



    //검증 완료 체크에 대한 상태변수 관리
    const[correct, setCorrect] = useState({ 
        userName: false,
        password: false,
        passwordCheck: false,
        email: false
    }); 




    //검증 데이터를 상태변수에 저장하는 함수
    const saveInputState = ({key, inputVal, flag, msg}) => { //객체형태로 감싸서 넘기자


        inputVal !== 'pass' && setUserValue({ //useState함수로 관리되는 함수는 setter로만 관리해야한다를 잊지말자.
            ...userValue, //나머지 값들까지 유지하되, userName만 적혀있으면 userName만 바꿔주겠다.
            [key]: inputVal
        }); //둘다 true여야하게끔~



        setMessage({
            ...message,
            //userName: msg 원래 이건데 아래껄로 바꾸자.
            [key]: msg
        });


        //입력한 값을 상태변수(state)를 username에 저장해야지

        //입력한 값을 상태변수에 저장
        //console.log(e.target.value);  //이거(value)를 useState객체 안의 userName프로퍼티에 저장해야겠지.
        //const inputVal = e.target.value;
         


        setCorrect({
            ...correct,
            [key]: flag
        });
    }



    //이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {

        //정규표현식
        const nameRegex = /^[가-힣]{2,5}$/; //한글만가능. 숫자,영어불가. 2글자에서 5글자까지.
        
        const inputVal = e.target.value;
        //입력값검증
        let msg; //사용자가 어떤값을 입력했냐에 따라 바껴야하니까. (필수입니다, 입력값은 한글로입력하세요, 입력이 잘 되었습니다 등등..메세지가 변해야하니까! const로하면안됨.)
        let flag = false; //입력값 상태 완료 변수(입력값검증체크용)
        //let flag;

        if(!inputVal){ //논리표현식 : inputValue에 아무것도 입력 안하면, e.target.value가 여기에 빈 문자열이온다. 아예 빈거. 그걸 논리표현식으로하면 false고. not붙였으니 true지.  즉,  입력을 하지 않았다면 이라는 뜻이다.
            msg = '유저 이름은 필수입니다.';
            //flag = false;
        }else if (!nameRegex.test(inputVal)){ //테스트의 결과가false라면 이라는 뜻. 검증하고자 하는 값을 적으면, 정규표현식에 일치하면 true, 일치하지않으면 false가온다. test라는 메서드를 사용해서 여부를 알아보자
            msg = '2~5글자 사이의 한글로 작성하세요'
            //flag = false;
        } else {
            msg = '사용 가능한 이름입니다.';
            flag = true;
        }


        /*
        saveInputState({
            inputVal: inputVal,
            msg: msg,
            flag: flag
        });
        이렇게 적지말고 
        */

       //객체 프로퍼티에 세팅하는 변수의 이름이 키값과 동일하면 콜론 생략 가능!         const saveInputState = ({inputVal, flag, msg}) => 이부분임.
        
       saveInputState({
            key: 'userName',
            inputVal,
            msg,
            flag
        });

    };


    //이메일 중복체크 서버 통신 함수
    const fetchDuplicateCheck = email => {
        
        let msg = '', flag = false;
        fetch(`${API_BASE_URL}/check?email=${email}`)


        //.then(res => res.json()) //res.json을 꺼내겠다.
        //.then(json => { //json데이터 받아서 한번까보겟다. 콘솔먼저보자.
        //    console.log(json);
        //    if(json){ //트루가오겠지. 즉, 존재한다니까 못쓴다고해줘야지
        //        msg = '이메일이 중복되었습니다.!';
        //    } else {
        //        msg = '사용 가능한 이메일 입니다.';
        //        flag = true;
        //    }
        //})
        //.catch(err => {
        //    console.log("서버 통신이 원할하지않습니다."); //예외처리도 가능하다.
        //});  에러나서 주석. 아래껄로 하자.

        .then(res => {
            if(res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log(json);
            if(json) {
                msg = '이메일이 중복되었습니다!';
            } else {
                msg = '사용 가능한 이메일 입니다.';
                flag = true;
            }



        //나와서, 따로 부를게있음
        setUserValue({...userValue, email: email});
                setMessage({...message, email: msg});
                setCorrect({...correct, email: flag});
            })
            .catch(err => {
                console.log('서버 통신이 원활하지 않습니다.');
            });
    };


    




    //이메일 입력창 체인지 이벤트 핸들러
    const emailHandler = e => {
        const inputVal = e.target.value;

        //중복검사 진행 전에, 값이 유효한지 체크해야지. 정규표현식이 필요하겠지
        const emailRegex = /^[a-z0-9.-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/;
        
        let msg, flag = false;
        if(!inputVal){
            //아무것도안쓴거니
            msg = '이메일은 필수값입니다.';
        } else if(!emailRegex.test(inputVal)){ //내가 지정한 정규표현식이 유효하지않으면?
            msg = '이메일 형식이 아닙니다.';
        } else {
            //이메일형식은 통과했으나 아직 중복검사진행않았다. 이메일 중복 체크 하자.
            //함수를 따로 선언해서, 문제없으면 사용가능한이메일이다 라고하자.
            //이메일 중복 체크(그러나 버튼을 만들자. 그게 더 효율적이다. 그러나 그냥하자..)
            fetchDuplicateCheck(inputVal);
            return;
        }

        saveInputState({ //여기다 작성한 이유는, 비동기 체크가 진행 되기 전에는 메세지 띄우긴해야하니까.
            key: 'email',
            inputVal,
            msg,
            flag
        }); 
    };


    //패스워드 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        //패스워드가 변동되면 패스워드 확인란을 비우기
        document.getElementById('password-check').value = ''; //비워!
        document.getElementById('check-span').textContent = ''; //스팬태그는 밸류라고적으면안돼!

        setMessage({...message, passwordCheck: ''}); //기존에 있던 메시지를 가지고오되, 패스워드체크는 비어있는 걸로 바꾸자!
        setCorrect({...correct, passwordCheck: false}); //코렉트를 다 갖고오되, 패스워드체크도 폴스로~


        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

        //검증 시작
        let msg, flag = false;
        if(!inputVal){ //패스워드 안적음.
            msg = '비밀번호는 필수 입니다.';
        } else if(!pwRegex.test(inputVal)){ //false니까 유효X
            msg = '8글자 이상의 영문, 숫자, 특수문자를 포함 해 주세요';
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        //객체전달하자
        saveInputState({
            key: 'password',
            inputVal,
            msg,
            flag
        });




    };




    const pwCheckHandler = e => {
        //검증 시작
        let msg, flag = false;
        if(!e.target.value){
            msg = '비밀번호 확인란은 필수입니다.';
        } else if(userValue.password !== e.target.value){ //사용자가 패스워드 란에 입력한 비번을 들고와야한다. useState로 관리하는 걸 들고오자. //상태변수로 회원가입 입력값 관리   부분의 userValue다.
            msg = '패스워드가 일치하지 않습니다.';
        } else {
            msg = '패스워드가 일치합니다.';
            flag =  true;
        }
        
        //객체전달
        saveInputState({
            key: 'passwordCheck',
            //inputVal, 이게아니라
            inputVal: 'pass', //라고해주자. 아까는 inputVal을 전부 선언해줘서된거고, 비번검증은 굳이 inputVal을 똑같이 보낼 필요는없지.
            msg,
            flag
        });


    }


    //이미지 파일을 상태변수로 관리하자
    const [imgFile, setImgFile] = useState(null);
    
    //0628
    //이미지 파일을 선택했을 때 썸네일 뿌리기
    const showThumbnailHandler = e => {
        //첨부된 파일 정보를 얻자
        const file = $fileTag.current.files[0]; //input태그가 갖고있는 프로퍼티중 files가있지. 그 안에 list가있지. 그 안에 0번인덱스에 우리가 첨부한 파일객체가있었다. f12로본거. 그거달라고한거다. -> 리액트 훅 코드이며 바닐라스크립트로써도되지만 맨 위에 useRef함수를 써서 요소를  documnet가 아니라 쉽게 취득할수있음
        
        //자바스크립트에서 제공하는 객체생성(FileReader함수)
        const reader = new FileReader();

        //파일의 정보를 읽자(전달)
        reader.readAsDataURL(file);

        //리더가 파일을 읽어들이면, 즉 다 읽었으면..
        reader.onloadend = () => {
                setImgFile(reader.result);
        }
    }




    //4개의 입력칸이 모두 검증에 통과했는지 여부를 검사 -> 커렉트에서확인가능 -> Correct가 모두 true면되잖아.
    const isValid = () => {
        for(const key in correct){ //객체기 때문에 of가아닌 in. correct에 key(userName, password 등이온다)값이 온다.
            const flag = correct[key];
            if(!flag) return false;
        }
        return true;
    }


    //JSON을 Blob타입으로 변경 후 FormData에 넣기 0628
    const userJsonBlob = new Blob(
        [JSON.stringify(userValue)], //변환하고자하는타입
        { type: 'application/json' } //전달해주는타입
    );
    

    //회원 가입 처리 서버 요청   (0628수정)
    const fetchsignUpPost = () => {

        // 이미지파일과 회원정보 JSON을 하나로 묶어야 함 0628
        // FormData 객체를 활용해서!
        const userFormData = new FormData();
        userJsonBlob.append('user', userJsonBlob); //'user'는 내가 임의로지었다. DTO변수명으로 짓는것이좋다.
        userJsonBlob.append('profileImage', $fileTag.current.files[0]);
        //그러면 이제, 패치함수로 요청보낼 떄 바로 아래에
        // headers: {'content-type' : 'application/json'}, 이게적혀있을텐데 주석처리하자.
        // 즉, JSON타입을 따로 설정해줘야한다. 위로가자


        fetch(API_BASE_URL, {
            method: 'POST',
            //headers: {'content-type' : 'application/json'}, 0628
            //body: JSON.stringify(userValue)
            body: userFormData
        })
        .then(res => {
            if(res.status === 200){
                alert('회원가입에 성공했습니다.');
                //로그인 페이지로 리다이렉트하자. 임포트하러위로.
                //window.location.href = '/login'; 이거말고, nagation에 담아놨으니
                redirection('/login');


            } else {
                alert('서버와의 통신이 원활하지 않습니다.');
            }
        })
    }





    //회원가입 버튼 클릭 이벤트 핸들러
    const joinButtonClickHandler = e => { //이벤트가동작하는지 그냥 확인하자. 버튼누르면 패치가 진행되니 깔끔하게될듯
        e.preventDefault(); //form의 submit기능이 안됨! 일부러막음.

        //const $nameInput = document.getElementById('username');
        //console.log($nameInput.value); //요소얻었기때문에 $

        //console.log(userValue);

        //회원 가입 서버 요청
        if(isValid()){
            fetchsignUpPost();
            //alert('회원 가입 정보를 서버에 전송합니다.');
        } else {
            alert('입력란을 다시 확인해주세요!');
        }


        


    }

    
    return (
        <>
        {!isLoggedIn && 
            <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>



                        {/*프로필 이미지 첨부할수 있는 기능 0628*/}
                        <Grid item xs={12}>
                             <div className="thumbnail-box" onClick={() => $fileTag.current.click()} > {/*사용자가 이거 클릭하면 input태그를 클릭한거처럼 동작되게*/}
                                 <img
                                      //src="../../assets/img/god.png" 이렇게쓰면안됨
                                      //src={require("../../assets/img/god.png")} //이렇게. 그러나 모던하게..
                                      //src={imgFile ? imgFile : require("../../assets/img/image-add.png")} //모던하게이것도괜찮고 
                                      src={imgFile || require("../../assets/img/image-add.png")} //더간추릴꺼면 이렇게써도됨. -> require안쓰면 경로인식이안됨.
                                      alt="profile"

                                 />
                            </div>
                            <label className='signup-img-label' htmlFor='profile-img'>프로필 이미지 추가</label> {/*그냥for면 자바코드로인식함. htmlfor로해줘야함.*/}
                            
                            <input
                             id='profile-img'
                             type='file'
                            style={{display: 'none'}}
                            accept='image/*'
                            ref={$fileTag}
                            onChange={showThumbnailHandler}
                            />
                         </Grid>





                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="유저 이름"
                                autoFocus
                                onChange={nameHandler}
                            />
                            <span style={
                                correct.userName ? {color : 'green'} : {color : 'red'}
                            }>{message.userName}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                                onChange={emailHandler}
                            />
                            <span style={
                                correct.email ? {color : 'green'} : {color : 'red'}
                            }>{message.email}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="패스워드"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={passwordHandler}
                            />
                            <span style={
                                correct.password ? {color : 'green'} : {color : 'red'}
                            }>{message.password}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password-check"
                                label="패스워드 확인"
                                type="password"
                                id="password-check"
                                autoComplete="check-password"
                                onChange={pwCheckHandler}
                            />
                            <span id='check-span' style={
                                correct.passwordCheck ? {color : 'green'} : {color : 'red'}
                            }>{message.passwordCheck}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              style={{background: '#38d9a9'}}
                              onClick={joinButtonClickHandler}
                            >
                                계정 생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
}
<CustomSnackBar
open={open}
/>
        </>
      
    );
                    
}


export default Join