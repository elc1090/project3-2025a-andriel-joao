import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import DropdownCheckboxes from "../util/menudropdown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { backendServerUrl } from "../config/backendIntegration";

const NFCDataGrid = ({ data, totalValue, numPeople, peopleNames }) => {
  const updateItems = (items, selected) => {
    let row = 0;
    for (let item of items) {
      const selectedPeople = [];
      for (let i = 0; i < selected.length; i++) {
        if (selected[row][i]) {
          selectedPeople.push(peopleNames[i]);
        }
      }
      axios.put(
        backendServerUrl + "/item",
        {
          id: item.id,
          payers: selectedPeople,
        },
        { withCredentials: true }
      );
      row++;
    }
  };

  const [selected, setSelected] = useState(
    data.map((item) =>
      peopleNames.map((person) => item.payers.includes(person))
    )
  );
  const [items, setItems] = useState(data);
  const [allChecked, setAllChecked] = useState(
    data.map((item) => item.payers.length === peopleNames.length)
  );

  const handleCheckboxChange = (rowIndex, personIndex) => {
    const newSelected = [...selected];
    newSelected[rowIndex][personIndex] = !newSelected[rowIndex][personIndex];
    setSelected(newSelected);
  };

  const handleAllChange = (rowIndex) => {
    const newAllChecked = [...allChecked];
    newAllChecked[rowIndex] = !newAllChecked[rowIndex];
    setAllChecked(newAllChecked);

    const newSelected = [...selected];
    // Atualizar todos os checkboxes da linha quando "Todos" for clicado
    newSelected[rowIndex] = newSelected[rowIndex].map(
      () => newAllChecked[rowIndex]
    );
    setSelected(newSelected);
  };

  const calculateTotals = () => {
    const totals = peopleNames.map(() => 0);

    items.forEach((item, index) => {
      const itemTotal = item.value;
      // Verificar se há pessoas selecionadas
      const checkedPeople = [];
      for (let i = 0; i < peopleNames.length; i++) {
        if (selected[index][i]) {
          checkedPeople.push(i);
        }
      }

      // Se não houver pessoas selecionadas, ignore este item
      if (checkedPeople.length === 0) {
        return;
      }
      // Dividir o valor total igualmente entre as pessoas selecionadas
      const share = itemTotal / checkedPeople.length;
      // Atualizar o total para cada pessoa
      checkedPeople.forEach((personIndex) => {
        totals[personIndex] += share;
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  return (
    <div>
      <List sx={{maxHeight: '100vh', overflowY: 'auto'}}>
        {data.map((item, index) => (
          <ListItem key={index}>
            <Accordion
              sx={{
                width: 400,
                backgroundColor: selected[index].some(Boolean)
                  ? "#0045A4"
                  : "#006bff",
                transition: "background-color 0.3s ease",
              }}
            >
              <AccordionSummary>
                <strong style={{ fontFamily: "'Roboto'", color: "white" }}>
                  {item.name}
                </strong>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
                <Stack direction="column" spacing={2} alignItems="center">
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", mr: 4 }}>
                      <p
                        style={{
                          fontFamily: "'Roboto'",
                          fontSize: 15,
                          color: "#006bff",
                        }}
                      >
                        Preço Un/Kg: <strong>{item.value} R$</strong>
                      </p>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <p
                        style={{
                          fontFamily: "'Roboto'",
                          fontSize: 15,
                          color: "#006bff",
                        }}
                      >
                        Quantidade: <strong>{item.quantity}</strong>
                      </p>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", mr: 5 }}>
                      <Checkbox
                        sx={{
                          color: "#006bff",
                          "&.Mui-checked": {
                            color: "#006bff",
                          },
                        }}
                        checked={allChecked[index] || false}
                        onChange={() => handleAllChange(index)}
                      />
                      <Box sx={{ mt: 1.3 }}>
                        <p
                          style={{
                            fontFamily: "'Roboto'",
                            fontSize: 15,
                            color: "#006bff",
                          }}
                        >
                          Todos pagam
                        </p>
                      </Box>
                    </Box>
                    <DropdownCheckboxes
                      rowIndex={index}
                      selected={selected}
                      onChange={handleCheckboxChange}
                      peopleNames={peopleNames}
                    />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
        <ListItem sx={{ position: "sticky", bottom: 80, backgroundColor: "#f0f0f0" }}>
          <div>
            <p>Valor total: {totalValue}</p>
            <p>Número de Pessoas: {numPeople}</p>
            {totals.map((total, index) => (
              <p key={index}>
                {peopleNames[index]} deve: R$ {total.toFixed(2)}
              </p>
            ))}
          </div>
          <div>
            <button onClick={() => updateItems(items, selected)}>
              Salvar itens
            </button>
          </div>
        </ListItem>
      </List>
    </div>
  );
};
export default NFCDataGrid;
