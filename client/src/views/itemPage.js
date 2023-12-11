import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar.js";
import Sidebar from "../components/navigation/sideBar.js";
import { Typography, Divider } from "@mui/material";
import AddToCart from "../components/menu/addToCart.js";

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([null]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem("selectedItem"));
    setItem(storedItem);

    const fetchItemData = () => {
      if (storedItem && storedItem.type) {
        fetch(`http://localhost:3001/item/type?keyword=${storedItem.type}`)
          .then((response) => response.json())
          .then((data) => setSimilarItems(data));
      }
    };
    if (storedItem && storedItem._id) {
      fetch(`http://localhost:3001/item/${storedItem._id}`)
        .then((response) => response.json())
        .then((data) => setItem(data));

      fetchItemData();
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
        <div style={{ padding: "1rem" }}></div>
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
            <div style={{ padding: "10px" }}></div>

            <AddToCart item={item} />
            <div style={{ padding: "10px" }}></div>

            <Divider
              sx={{
                mt: 1,
                mb: 1,
                width: "70%",
                mx: "auto",
              }}
            />
            {item && (
              <div
                style={{
                  textAlign: "center",
                  color: "#006d77",
                  fontWeight: "bold",
                }}
              >
                <Typography style={{ fontSize: "30px", fontWeight: "800" }}>
                  {item.item_name}
                </Typography>
                <Typography style={{ fontSize: "25px" }}>
                  Price: ${item.item_price}
                </Typography>
                <Typography style={{ fontSize: "20px" }}>
                  {item.item_description}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div style={{ padding: "10px" }}></div>

        <div
          className="main-body"
          id="main-body"
          style={{ gridColumn: "2", gridRow: "3" }}
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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {item && (
                <div style={{ padding: "10px" }}>
                  <Typography
                    style={{
                      fontSize: "30px",
                      fontWeight: "800",
                      textAlign: "center",
                      color: "#006d77",
                    }}
                  >
                    Similar Items...
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {similarItems &&
                      similarItems !== null &&
                      similarItems
                        .filter(
                          (similar) => similar && similar._id !== item._id
                        )
                        .map((similar, index) => (
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
                                setSelectedItem(similar);
                                localStorage.setItem(
                                  "selectedItem",
                                  JSON.stringify(similar)
                                );
                                console.log("Item clicked:", similar.item_name);
                                window.location.href = "/item";
                              }}
                            >
                              <div
                                style={{ color: "#006d77", fontWeight: "bold" }}
                              >
                                {similar.item_name}
                              </div>
                              <div
                                style={{ color: "#006d77", fontWeight: "bold" }}
                              >
                                Price: ${similar.item_price}
                              </div>
                            </button>
                          </div>
                        ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ padding: "10px" }}></div>

      </div>
    </Box>
  );
};

export default ItemPage;
