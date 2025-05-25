import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';
import { Typography, Box, Divider } from '@mui/material';

const Table = ({ data, totalValue, numPeople, peopleNames }) => {
  const [selected, setSelected] = useState(() =>
    data.map(() => peopleNames.map(() => false))
  );
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

    const newSelected = [...selected];
    newSelected[rowIndex] = newSelected[rowIndex].map(() => newAllChecked[rowIndex]);
    setAllChecked(newAllChecked);
    setSelected(newSelected);
  };

  const columns = useMemo(() => [
    { field: 'index', headerName: 'Index', width: 100 },
    { field: 'name', headerName: 'Descrição do Item', width: 300 },
    { field: 'total_value', headerName: 'Preço Total', width: 150 },
    {
      field: 'all',
      headerName: 'Todos',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={allChecked[params.row.id] || false}
          onChange={() => handleAllChange(params.row.id)}
        />
      ),
    },
    ...peopleNames.map((name, index) => ({
      field: `person_${index}`,
      headerName: name,
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={selected[params.row.id][index] || false}
          onChange={() => handleCheckboxChange(params.row.id, index)}
        />
      ),
    })),
  ], [allChecked, peopleNames, selected]);

  const rows = useMemo(() => data.map((item, index) => ({
    id: index,
    index: index + 1,
    name: item.name,
    total_value: item.total_value,
    selected: selected[index],
    allChecked: allChecked[index],
  })), [data, selected, allChecked]);

  const totals = useMemo(() => {
    const totalsArray = peopleNames.map(() => 0);

    rows.forEach((row) => {
      const itemTotal = row.total_value;
      const checkedPeople = row.allChecked
        ? peopleNames.map((_, i) => i)
        : row.selected.map((checked, i) => (checked ? i : -1)).filter(i => i !== -1);

      if (checkedPeople.length === 0) return;

      const share = itemTotal / checkedPeople.length;
      checkedPeople.forEach(i => {
        totalsArray[i] += share;
      });
    });

    return totalsArray;
  }, [rows, peopleNames]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Itens da Nota Fiscal</Typography>

      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        autoHeight
      />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Resumo:</Typography>
      <Typography>Valor total da nota: <strong>R$ {totalValue.toFixed(2)}</strong></Typography>
      <Typography>Número de Pessoas: {numPeople}</Typography>

      <Box sx={{ mt: 1 }}>
        {totals.map((total, i) => (
          <Typography key={i}>{peopleNames[i]} deve: <strong>R$ {total.toFixed(2)}</strong></Typography>
        ))}
      </Box>
    </Box>
  );
}
export default Table;

