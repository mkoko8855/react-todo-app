//0623

//브라우저에서 현재 클라이언트의 호스트 이름(ip이름. 즉, localhost를)을 얻어오기
const clientHostName = window.location.hostname;


let backEndHostName; //백엔드 서버 호스트 이름


if(clientHostName === 'localhost'){ //로컬호스트는 도메인 구입 전의 개발 중 이라는 뜻.
    backEndHostName = 'http://localhost:8181';
} else if(clientHostName === 'spring.com'){ //예시. 배포해서 서비스 중.
    backEndHostName = 'https://api.spring.com'; //예시. 이쪽으로 연결하겠다~
}

export const API_BASE_URL = backEndHostName;
//몇가지 값을 더 만들어서 내보내자. 외부에서 땡길수있도록. 나중에 api더 추가되면 더 써주면 됨.
export const TODO = '/api/todos';
export const USER = '/api/auth';

