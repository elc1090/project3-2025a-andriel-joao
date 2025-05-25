import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, CssBaseline, Fab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../util/sidebar';
import { backendServerUrl } from '../config/backendIntegration';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(backendServerUrl + '/purchase', { withCredentials: true })
      .then(res => {
        // Suponha que o retorno esperado seja um array diretamente
        if (Array.isArray(res.data)) {
          setNotas(res.data);
        } else {
          // Retorno inesperado, evita quebra
          console.warn("Resposta inesperada da API, usando array vazio.");
          setNotas([]);
        }
      })
      .catch(err => {
        console.error("Erro ao buscar notas:", err);
        // Em caso de erro, ainda usamos array vazio para evitar falha no .map
        setNotas([]);
      });
    }, 
  []);

  const handleNotaFiscalClick = () => {
    console.log("cliquei em uma nota")
  }
  return (
    <>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#006bff' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{fontSize: 32}}/>
          </IconButton>
          <Typography variant="h6" noWrap fontFamily={"'Jersey 15'"} fontSize={32}>
            divide ai!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      
      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />      {/* Conteúdo com lista scrollável */}
      <Box
        sx={{
          mt: 8,
          px: 2,
          pb: 10,
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        {notas.length != 0 ? (
          notas.map((nota, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'white',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {nota.storeName}
              </Typography>
              <Typography variant="body2">Data de Emissão: {nota.purchaseDate}</Typography>
              <Typography variant="body2">Data do Scan: {nota.scanDate}</Typography>
              <Typography variant="body2">Devedores: {nota.payers.length}</Typography>
              <Typography variant="body2">Total: R$ {nota.totalValue}</Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              mt: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#666',
            }}
          >
            <Typography variant="h6" fontSize={32} fontFamily={"'Jersey 15'"} color='#006bff'>
              Nada aqui ainda...
            </Typography>
            <Typography variant="body2" fontSize={20} fontFamily={"'Jersey 15'"} color='#006bff'>Adicione uma Nota Fiscal!</Typography>
          </Box>
        )}
      </Box>


      {/* Botão flutuante */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#006bff',
          color: 'white',
          '&:hover': {
            backgroundColor: '#0050cc',
          },
        }}
        onClick={() => navigate('/qrcode')}
      >
        <QrCodeScannerIcon />
      </Fab>
    </>
  );
};

export default Home;
