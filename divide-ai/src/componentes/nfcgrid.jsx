import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Paper, Stack } from '@mui/material';

const NFCDataGrid = ({ data, totalValue, numPeople, peopleNames}) => {
  const [selected, setSelected] = useState(() =>
    data.map(() => peopleNames.map(() => false))
  );
  const [items, setItems] = useState(data);
  const [allChecked, setAllChecked] = useState(data.map(() => false));
  
  useEffect(() => {
    setSelected(data.map(() => peopleNames.map(() => false)));
    setAllChecked(data.map(() => false));
  }, [data, totalValue, numPeople, peopleNames]);

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
    newSelected[rowIndex] = newSelected[rowIndex].map(() => newAllChecked[rowIndex]);
    setSelected(newSelected);
  };

  const calculateTotals = () => {
    const totals = peopleNames.map(() => 0);
    
    items.forEach((item, index) => {
      const itemTotal = item.totalValue;
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
      checkedPeople.forEach(personIndex => {
        totals[personIndex] += share;
      });
    });
  
    return totals;
  };

  const totals = calculateTotals();

  return (
    <div>
      <List>
        {data.map((item, index) => (
          <ListItem key={index}>
            <Accordion>
              <AccordionSummary>
                <strong>{item.name}</strong>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Paper>
                    <strong>{item.totalValue}</strong>
                  </Paper>
                  <Paper>
                    <strong>{item.quantity}</strong>
                  </Paper>
                  <Paper>
                    <Checkbox
                      checked={allChecked[index] || false}
                      onChange={() => handleAllChange(index)}
                    />
                    <strong>Todos</strong>
                  </Paper>
                  <Paper>
                    {peopleNames.map((name, indexCheck) => (
                      <Box>
                        <Checkbox
                          checked={selected[index][indexCheck] || false} // Garante que checked seja sempre booleano
                          onChange={() => handleCheckboxChange(index, indexCheck)}
                        />
                        {name}
                      </Box>
                    ))}
                  </Paper>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
      <div>
        <p>Valor total: {totalValue}</p>
        <p>Número de Pessoas: {numPeople}</p>
        {totals.map((total, index) => (
          <p key={index}>{peopleNames[index]} deve: R$ {total.toFixed(2)}</p>
        ))}
      </div>
    </div>
  );
};
export default NFCDataGrid;