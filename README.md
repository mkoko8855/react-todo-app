
# 리액트 프로젝트 시작하기

1. node.js 설치 (LTS 버전으로)
2. create-react-app 설치(최초 1번만 진행하면됨)
```
$ npm install -g create-react-app

```
3. react 프로젝트 생성 >
```
$ npx create-react-app 프로젝트 이름
```

4. react 프로젝트 실행(react 서버 가동) >
```
$ cd 프로젝트 폴더로 이동 후
$ npm start
```

실행을 해보면,
http://localhost:3000 에서 프론트엔드 서버실행된다. >


5. 추가 라이브러리(react-todo-app에서 사용할 라이브러리를 다운 받을 것.) >
```
$ npm install react-icons  // 아이콘
$ npm install classnames   // 클래스 add/remove 편리한거
$ npm install sass // scss 문법 사용
$ npm install reactstrap bootstrap
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/icons-material
$ npm install react-router-dom
```


##리액트 라우터 설정
 - index.js에 BrowserRouter 컴포넌트로 App 감싸기.

 ```javascript  
 import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);
```
