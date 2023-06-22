import React from 'react'
import {AppBar, Toolbar, Grid, 
    Typography, Button} from "@mui/material";   //mui.com 이라는 라이브러리에서, AppBar, Toolbar, Grid, Typography 등등을 임포트하겠다는뜻이다.
import './header.css';
import { Link } from 'react-router-dom';


//0622
const Header = () => {
  
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
                            <Typography variant="h4">오늘의 할일</Typography>   
                        </div>
                    </Grid>
    
                    <Grid item>
                        <div className='btn-group'>
                            <Link to='/login'>로그인</Link> {/*이제 a링크말고 이거쓰면 되..나*/}
                            <Link to='/join'>회원가입</Link>
                        </div>
                    </Grid>




    
                </Grid>
            </Toolbar>
        </AppBar>
      );




}

export default Header