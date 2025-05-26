import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../util/sidebar";
import NFCDataGrid from "../componentes/nfcgrid";
import PeopleInputDialog from "../componentes/dialogs/peopleinputdialog";
const Table = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); // Abre assim que carregar
  const [people, setPeople] = useState([]);
  const { purchaseData } = location.state || {};
  
  const handleDialogClose = () => {
    // Não fecha o diálogo até que o usuário envie os dados corretamente
  };

  const handleDialogSubmit = (peopleNames) => {
    setPeople(peopleNames);
    setDialogOpen(false); // Fecha o diálogo após submissão
  };

  return (
    <Box>
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
            tabela
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <PeopleInputDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
      {/* Conteúdo renderizado apenas se purchaseData existir */}
      <Box sx={{ mt: 10, px: 2 }}>
        {purchaseData?.items &&
        purchaseData?.totalValue !== undefined &&
        purchaseData?.numPeople &&
        purchaseData?.peopleNames ? (
          <NFCDataGrid
            data={purchaseData.items}
            totalValue={purchaseData.totalValue}
            numPeople={purchaseData.numPeople}
            peopleNames={purchaseData.peopleNames}
          />
        ) : (
          <Box
            sx={{
              mt: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#666",
            }}
          >
            <Typography
              variant="h6"
              fontSize={32}
              fontFamily={"'Jersey 15'"}
              color="#006bff"
            >
              Nenhum dado carregado.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Table;
