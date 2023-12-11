import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar.js";
import Sidebar from "../components/navigation/sideBar.js";
import { Typography, Divider } from "@mui/material";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  //TODO: add current cart of customer to the nav bar using this:
  //const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem("customer")));

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
          style={{ gridColumn: "2", gridRow: "1", zIndex: "1", width: "77%" }}
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
        <div style={{ padding: "1rem" }}></div>
        <div
          className="main-body"
          id="main-body"
          style={{ gridColumn: "2", gridRow: "2",  }}
        >
          {/* TODO: make filter into dropdown menu
          <DropdownMenu
            items={items}
            handleMonitorOption={handleMonitorOption}
            handleMouseOption={handleMouseOption}
            handleKeyboardOption={handleKeyboardOption}
          /> */}
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gridColumn: "2",
              gridRow: "2",
            }}
          >
            <Divider
              sx={{
                mt: 1,
                mb: 1,
                width: "70%",
                mx: "auto",
              }}
            />
            <div id="main-body-filter">
              <select onChange={handleTypeChange}>
                {types
                  ? types.map((type) => {
                      return <option value={type}>{type}</option>;
                    })
                  : null}
              </select>
            </div>
            <Divider
              sx={{
                mt: 1,
                mb: 1,
                width: "70%",
                mx: "auto",
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {items
                .filter((item) => !selectedType || item.type === selectedType)
                .map((item, index) => (
                  <div
                    key={index}
                    style={{
                      flexBasis: "30%",
                      marginBottom: "10px",
                      marginRight: "1%",
                      textAlign: "center",
                    }}
                  >
                    <button
                      className="item-body"
                      style={{
                        width: "100%",
                        background: "none",
                        border: "1px solid #add8e6",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onClick={() => {
                        setSelectedItem(item);
                        localStorage.setItem("selectedItem", JSON.stringify(item)); 
                        console.log("Item clicked:", item.item_name);
                        window.location.href = "/item";
                      }}
                    >
                      <div style={{ color: "#006d77", fontWeight: "bold" }}>
                        {item.item_name}
                      </div>
                      <div style={{ color: "#006d77", fontWeight: "bold" }}>
                        Price: ${item.item_price}
                      </div>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div style={{ padding: "1rem" }}></div>
      </div>
    </Box>
  );
};

export default MainPage;
