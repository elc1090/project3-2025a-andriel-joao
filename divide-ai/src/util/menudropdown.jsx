import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox } from '@mui/material';

const DropdownCheckboxes = ({ rowIndex, selected, onChange, peopleNames }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        Selecionar devedores
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxHeight: 300 } }}
      >
        {peopleNames.map((name, indexCheck) => (
          <MenuItem key={indexCheck} dense disableRipple>
            <Checkbox
              checked={selected[rowIndex][indexCheck]}
              onChange={() => onChange(rowIndex, indexCheck)}
            />
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownCheckboxes;
