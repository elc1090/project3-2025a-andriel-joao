import React, { useState } from 'react';
import { Box, Container, Button, Paper } from '@mui/material';
import Cadastro from '../componentes/Cadastro';
import Login from '../componentes/Login';

const AuthPage = () => {
  const [etapa, setEtapa] = useState("inicio"); // "inicio" | "login" | "cadastro"
  const [direction, setDirection] = useState("left");

  const handleEscolha = (escolha) => {
    setDirection("left");
    setEtapa(escolha);
  };

  const handleVoltar = () => {
    setDirection("right");
    setEtapa("inicio");
  };

  const renderConteudo = () => {
    if (etapa === "inicio") {
      return (
        <Box
          key="inicio"
          className={direction === "left" ? "fade-slide-left" : "fade-slide-right"}
          sx={{ height: 200 }}
        >
          <h1 style={{ fontFamily: "'Jersey 15'", color: "white", fontSize: 40 }}>divide ai!</h1>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white" }}
            onClick={() => handleEscolha("login")}
          >
            <p style={{ color: "#006bff", fontFamily: "'Roboto'" }}>Login</p>
          </Button>
          <h1
            style={{
              fontFamily: "'Jersey 15'",
              color: "white",
              fontSize: 40,
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            ou
          </h1>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderColor: "white", color: "white" }}
            onClick={() => handleEscolha("cadastro")}
          >
            <p style={{ color: "white", fontFamily: "'Roboto'" }}>Cadastrar</p>
          </Button>
        </Box>
      );
    }

    return (
      <Box
        key={etapa}
        className={direction === "left" ? "fade-slide-left" : "fade-slide-right"}
      >
        {etapa === "login" ? <Login /> : <Cadastro />}
        <Button variant="text" fullWidth sx={{ mt: 2, backgroundColor: "red", color: "white" }} onClick={handleVoltar}>
          Voltar
        </Button>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(../../public/login-background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 3,
            backgroundColor: "transparent",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {renderConteudo()}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthPage;
