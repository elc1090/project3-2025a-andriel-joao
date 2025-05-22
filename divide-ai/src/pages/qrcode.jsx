import React from 'react';
import QrCodeScanner from '../componentes/qrcodescanner';
import { Box, Button, ButtonGroup } from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const theme = createTheme({
  palette: {
    botaoprimario: {
      main: 'rgb(255, 255, 255)',
      contrastText:"#006bff",
    },
  },
});

const QrCode = () => {
  return (
    <>
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
          <QrCodeScanner />
          <Box id="footer">
            <ButtonGroup sx={{display: "grid", gap: 3}}>
              <ThemeProvider theme={theme}>
                <Box>
                  <Button variant='contained' color='botaoprimario' size={"large"} sx={{width: 300}}endIcon={<LinkIcon />}>Tem o link da nota?</Button>
                </Box>
                <Box>
                  <Button href="/home" variant='outlined' color='botaoprimario' endIcon={<ArrowBackIcon />}>Voltar</Button>
                </Box>
              </ThemeProvider>
            </ButtonGroup>
          </Box>
        </Box>
    </>
  )
}

export default QrCode