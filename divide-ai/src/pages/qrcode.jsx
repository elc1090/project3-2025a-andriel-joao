import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  TextField,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../util/sidebar";
import QrCodeScanner from "../componentes/qrcodescanner";
import { ThemeProvider, createTheme } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme({
  palette: {
    botaoprimario: {
      main: "rgb(255, 255, 255)",
      contrastText: "#006bff",
    },
  },
});

const QrCode = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundImage: "url(/login-background-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <AppBar position="fixed" sx={{ backgroundColor: "#006bff" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              fontFamily={"'Jersey 15'"}
              fontSize={32}
            >
              ler qr code
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <QrCodeScanner />
        <Box id="footer">
          <ButtonGroup sx={{ display: "grid", gap: 3 }}>
            <ThemeProvider theme={theme}>
              <Box>
                <Button
                  variant="contained"
                  color="botaoprimario"
                  size={"large"}
                  sx={{ width: 300 }}
                  endIcon={<LinkIcon />}
                >
                  Tem o link da nota?
                </Button>
              </Box>
              <Box>
                <Button
                  href="/home"
                  variant="outlined"
                  color="botaoprimario"
                  endIcon={<ArrowBackIcon />}
                >
                  Voltar
                </Button>
              </Box>
            </ThemeProvider>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default QrCode;
