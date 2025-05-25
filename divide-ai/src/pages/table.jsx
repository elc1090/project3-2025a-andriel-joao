import React, {useEffect, useState} from 'react'
import { Box, ButtonGroup, colors, Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { backendServerUrl } from '../config/backendIntegration';

const Table = () => {

  const location = useLocation();
  const url = location.state?.url;

  useEffect(() => {
    const effect = async () => {
      if (url) {
        const {data: response} = await axios.post(backendServerUrl + "/purchase", { url: url }, { withCredentials: true });
        console.log(response);
      }
    }
    effect();
  }, [])

  return (
    <Box
      sx={{
          height: "100vh",
          backgroundImage: "url(../../public/login-background-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
      }}
  >
    {url}
  </Box>
  )
}

export default Table