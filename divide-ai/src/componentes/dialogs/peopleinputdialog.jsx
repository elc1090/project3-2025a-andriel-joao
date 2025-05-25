import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const PeopleInputDialog = ({ open, onClose, onSubmit }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [names, setNames] = useState("");

  const handleConfirm = () => {
    if (numPeople <= 0 || names.trim() === "") {
      alert("Por favor, insira um número válido e nomes separados por vírgula.");
      return;
    }
    onSubmit(numPeople, names);
    setNumPeople(1);
    setNames("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#006bff",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: "'Jersey 15'", fontSize: 28 }}>
        Informações dos Devedores
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Quantidade de Devedores"
            type="number"
            fullWidth
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ min: 1 }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
          <TextField
            label="Nomes (separados por vírgula)"
            fullWidth
            value={names}
            onChange={(e) => setNames(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="inherit">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PeopleInputDialog;