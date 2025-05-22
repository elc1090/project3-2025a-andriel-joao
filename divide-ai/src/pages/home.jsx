import React, {useState} from 'react'
import { Box, ButtonGroup, colors, Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Home = () => {
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
  </Box>
  )
}

export default Home