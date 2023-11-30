import React from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar";

const MainPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", 
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
        paddingTop: "3rem", 
      }}
    >
      <div className="absolute top-0 right-0 p-4">
        <SearchBar />
      </div>{" "}
    </Box>
  );
};

export default MainPage;
