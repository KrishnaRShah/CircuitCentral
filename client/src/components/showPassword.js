import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { getFormControlSX, getInputAdornmentStyles } from "./oneIconTextField.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PasswordTextField = ({
  id,
  label,
  icon,
  error,
  helperText,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={error}
      sx={getFormControlSX("#1b4965")}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment {...getInputAdornmentStyles("#1b4965")}>
            {icon}
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
