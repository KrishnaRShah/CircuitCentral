import React from "react";
import { Typography, Link } from "@mui/material";

const TextWithLink = ({ text, link, onClick, ...other }) => (
  <Typography
    variant="body2"
    color="textSecondary"
    align="center"
    sx={{
      padding: "10px",
      color: "#8e8e8e",
      "& a": {
        color: "#1b4965",
        fontWeight: "600",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    }}
    onClick={onClick}
    {...other}
  >
    <span style={{ fontWeight: "bold" }}>{text}</span> <Link to={link}>{link}</Link>
  </Typography>
);

export default TextWithLink;
