import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function ButtonWithIcon(props) {
  const { icon, text, to } = props;

  if (to) {
    return (
      <Button
        variant="contained"
        color="primary"
        style={{
          width: `${text.length * 10 + 40}px`,
          padding: `${text.length * 0.5 + 5}px`,
          borderRadius: "30px",
          fontFamily: "Helvetica",
          fontSize: "1rem",
          color: "#edf6f9",
          fontWeight: "bold",
          background: "#006d77",
          animation: "gradient 10s ease-in-out infinite",
          textTransform: "none",
        }}
        startIcon={icon}
        component={Link}
        to={to}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        width: `${text.length * 10 + 40}px`,
        padding: `${text.length * 0.5 + 5}px`,
        borderRadius: "30px",
        fontSize: "1rem",
        color: "#edf6f9",
        fontWeight: 500,
        background: "#006d77",
        animation: "gradient 10s ease-in-out infinite",
        textTransform: "none",
      }}
      startIcon={icon}
    >
      {text}
    </Button>
  );
}

export default ButtonWithIcon;
