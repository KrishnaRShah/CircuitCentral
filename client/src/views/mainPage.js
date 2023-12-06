import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar.js";
import Sidebar from "../components/navigation/sideBar.js";
import { Typography } from "@mui/material";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const fetchItemData = () => {
    fetch("http://localhost:3001/item/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);

        const uniqueTypes = [...new Set(data.map((a) => a.type))];
        setTypes(uniqueTypes);
      });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridTemplateRows: "auto 1fr",
        width: "100%",
        minHeight: "100vh",
        background: "#a8dadc",
        paddingTop: "3rem",
      }}
    >
      <div style={{ paddingLeft: "1rem" }}>
        <div
          className="sidebar-body"
          style={{ gridColumn: "1", gridRow: "1 / span 2" }}
        >
          <Sidebar />
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gridColumn: "2",
          gridRow: "1 / span 2",
        }}
      >
        <div
          className="nav-menu"
          id="nav-menu"
          style={{ gridColumn: "2", gridRow: "1", zIndex: "1" }}
        >
          <div className="company-logo" id="company-logo">
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                position: "relative",
                display: "inline-block",
                fontSize: "2.25rem",
                fontWeight: "700",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                marginBlockStart: "0.67em",
                marginBlockEnd: "0.67em",
                background: "linear-gradient(300deg, #1b4965,#94d2bd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animate: "gradient 5s ease-in-out infinite",
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
            >
              Circuit Central
            </Typography>
          </div>
          <div className="search-bar">
            <SearchBar />
          </div>{" "}
        </div>
        <div
          className="main-body"
          id="main-body"
          style={{ gridColumn: "2", gridRow: "2" }}
        >
          {/* TODO: make filter into dropdown menu
          <DropdownMenu
            items={items}
            handleMonitorOption={handleMonitorOption}
            handleMouseOption={handleMouseOption}
            handleKeyboardOption={handleKeyboardOption}
          /> */}
          <div id="main-body-filter">
            <select onChange={handleTypeChange}>
              {types
                ? types.map((type) => {
                    return <option value={type}>{type}</option>;
                  })
                : null}
            </select>
          </div>
          {items
            .filter((item) => !selectedType || item.type === selectedType)
            .map((item, index) => (
              <div className="item-body" key={index}>
                <div style={{ color: "#006d77", fontWeight: "bold" }}>
                  {item.item_name}
                </div>
                <div style={{ color: "#006d77", fontWeight: "bold" }}>
                  Price: ${item.item_price}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Box>
  );
};

export default MainPage;
