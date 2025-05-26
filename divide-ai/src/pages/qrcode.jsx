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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../util/sidebar";
import QrCodeScanner from "../componentes/qrcodescanner";
import { ThemeProvider, createTheme } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendServerUrl } from "../config/backendIntegration";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate();

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      setUrlError("Informe a URL da nota.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendServerUrl+"/purchase", { url: urlInput }, { withCredentials: true });
      const purchaseData = response.data;
      console.log(purchaseData)
      navigate("/table", { state: { url: urlInput, purchaseData } });
    } catch (err) {
      setUrlError("Erro ao extrair dados da nota. Verifique a URL.");
    } finally {
      setLoading(false);
    }
  };

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
                  onClick={() => {
                    setUrlInput("");
                    setUrlError("");
                    setOpenDialog(true);
                  }}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Insira a URL da nota fiscal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="URL da Nota"
            type="url"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setUrlError("");
            }}
            error={!!urlError}
            helperText={urlError}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <Button onClick={() => setOpenDialog(false)} color="error">
            Cancelar
          </Button>
          <Button onClick={handleUrlSubmit} disabled={loading}>
            {loading ? "Validando..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QrCode;
