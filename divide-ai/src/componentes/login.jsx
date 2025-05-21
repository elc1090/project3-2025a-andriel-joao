import * as React from 'react';
import {alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box'; 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, ButtonGroup, colors } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& input': {
    color: '#fff', // texto digitado
  },
  '& label.Mui-focused' : {
    color: 'white',
    borderBottomColor: 'white',
    borderColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    borderColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});


const Login = () => {
  return (
    <Box>
      <header>
        <h1 style={{fontFamily: "'Jersey 15'", color: "white", fontSize: 40}}>login</h1>
      </header>
      <Box id='main' sx={{display: "grid", gap: 2, mt: 2}}>
        <CssTextField label="insira seu email" type='email' fullWidth variant='outlined'/>
        <CssTextField label="insira sua senha" type='password' fullWidth variant='outlined'/>
        <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button fullWidth color="success">Entrar</Button>
            <Button color='success' endIcon={<GoogleIcon />}/>
          </ButtonGroup>
        <Box id="other-actions" sx={{alignItems: "center", textAlign: "center"}}>
            <a><p style={{color: '#b70004', fontFamily: "'Jersey 15'", fontSize: 20}}>esqueceu a senha?</p></a>
        </Box>
      </Box>
    </Box>
  )
}

export default Login