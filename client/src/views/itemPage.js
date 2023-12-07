import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar.js";
import Sidebar from "../components/navigation/sideBar.js";
import { Typography, Divider } from "@mui/material";

const ItemPage = () => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem("selectedItem"));
    setItem(storedItem);
    if (storedItem && storedItem._id) {
        fetch(`http://localhost:3001/item/${storedItem._id}`)
          .then((response) => response.json())
          .then((data) => setItem(data))
          .catch((error) => console.error(error));
      } else {
      console.log("No item in local storage");
    }
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
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gridColumn: "2",
              gridRow: "2",
            }}
          >
            <button onClick={() => 
              //TODO: ADD TO CART
              console.log(item)}>Add to Cart</button>

            <Divider
              sx={{
                mt: 1,
                mb: 1,
                width: "70%",
                mx: "auto",
              }}
            />
            {item && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="h4">{item.item_name}</Typography>
                <Typography variant="body1">
                  Price: ${item.item_price}
                </Typography>
                <Typography variant="body2">{item.item_description}</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ItemPage;
