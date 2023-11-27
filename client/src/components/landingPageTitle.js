import React from "react";
import { Typography } from "@mui/material";

/**
 * This is the title component of the landing page
 * @returns {JSX.Element}
 * @constructor
 */
export function LandingPageTitle() {
  const title = "Empower Your Build";
  const subtitle = ["Join", "Circuit Central", "today."];

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          color: "#006d77",
          fontWeight: "800",
          marginBottom: "1px",
          marginTop: "1px",
          padding: "30px",
          fontSize: "3.0rem",
          lineHeight: "1.5",
          textShadow: "1.5px 1.5px 1.5px #028090",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        style={{
          color: "#83c5be",
          fontWeight: "lighter",
          marginBottom: "10px",
          padding: "30px",
          fontSize: "2rem",
          lineHeight: "1.2",
        }}
      >
        {subtitle[0]}{" "}
        <span
          style={{
            color: "#83c5be",
            fontWeight: "bold",
          }}
        >
          {subtitle[1]}
        </span>{" "}
        {subtitle[2]}
      </Typography>
    </div>
  );
}
