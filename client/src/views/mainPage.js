import React, {useState} from "react";
import { Box } from "@mui/system";

const MainPage = () => {

    return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
            background: "#a8dadc",
            animation: "gradient 5s ease infinite",
            "@keyframes gradient": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "50%": {
                backgroundPosition: "100% 50%",
              },
              "100%": {
                backgroundPosition: "0% 50%",
              },
            },
          }}
        />
    );
}


export default MainPage;