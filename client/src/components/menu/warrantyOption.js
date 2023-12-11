import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const WarrantyOption = ({disabled}) => {
  const [open, setOpen] = useState(false);
  const [warrantyYears, setWarrantyYears] = useState("");

  const handleChange = (event) => {
    setWarrantyYears(Number(event.target.value) || "");
    console.log("warranty years: ", Number(event.target.value));
  };

  const handleClickOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWarranty = () => {
    setOpen(false);
    console.log("warranty years: ", warrantyYears);

    localStorage.setItem("warrantyYears", warrantyYears);
  };

  return (
    <div>
      <Button
        style={{
          width: "75%",
          height: "auto",
          background: "#edf6f9",
          borderRadius: "10px",
          borderColor: "#006d77",
          padding: "10px",
          margin: "10px",
          color: disabled ? "grey" : "#006d77",
          fontWeight: "bold",
        }}
        onClick={handleClickOpen}
      >
        Add a Warranty
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            color: "#006d77",
            fontWeight: "bold",
          }}
        >
          Select Length
        </DialogTitle>
        <DialogContent>
          <FormControl style={{
                color: "#006d77",
                fontWeight: "normal",
                borderColor: "#006d77",
              }}fullWidth>
            <InputLabel style={{
                color: "#006d77",
                fontWeight: "normal",
                borderColor: "#006d77",
              }}>Select</InputLabel>
            <Select
              value={warrantyYears}
              onChange={handleChange}
              input={<OutlinedInput label="Warranty Years" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem
                style={{
                  color: "#006d77",
                  fontWeight: "normal",
                }}
                value={1}
              >
                1 Year
              </MenuItem>
              <MenuItem
                style={{
                  color: "#006d77",
                  fontWeight: "normal",
                }}
                value={2}
              >
                2 Years
              </MenuItem>
              <MenuItem
                style={{
                  color: "#006d77",
                  fontWeight: "normal",
                }}
                value={3}
              >
                3 Years
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button style={{
                color: "#006d77",
                fontWeight: "normal",
              }} onClick={handleClose}>Cancel</Button>
          <Button style={{
                color: "#006d77",
                fontWeight: "normal",
              }}onClick={handleWarranty}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WarrantyOption;
