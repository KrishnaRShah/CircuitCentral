import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchBar from "../components/navigation/searchBar.js";
import Sidebar from "../components/navigation/sideBar.js";
import { Typography, Divider, Button } from "@mui/material";
import RemoveFromCartButton from "../components/buttons/removeFromCartButton.js";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [warrantyInfo, setWarrantyInfo] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getCartInfo = async () => {
      const customer = JSON.parse(localStorage.getItem("customer"));
      if (!customer) {
        throw new Error("No customer in local storage");
      }
      try {
        const response = await fetch(
          `http://localhost:3001/cart/customer/${customer._id}`
        );
        const customerCartData = await response.json();
        if (customerCartData.length === 0) {
          setIsEmpty(true);
        }
        console.log("customer cart data: ", customerCartData);
        if (!isEmpty) {
          setCartData(customerCartData);
          const itemPromises = customerCartData.map((cart) =>
            fetch(`http://localhost:3001/item/${cart.item_number}`).then(
              (response) => response.json()
            )
          );
          const itemInfo = await Promise.all(itemPromises);
          console.log("item info: ", itemInfo);
          setItems(itemInfo);

          const warrantyPromises = customerCartData.map((cart) =>
            fetch(
              `http://localhost:3001/warranty/item_number/${cart.item_number}/customer/${customer._id}`
            ).then((response) => response.json())
          );
          const warrantyInfo = await Promise.all(warrantyPromises);
          console.log("warranty info: ", warrantyInfo);
          setWarrantyInfo(warrantyInfo);
        }
      } catch (error) {
        console.error("Error fetching store numbers:", error);
      }
    };
    getCartInfo();
  }, [isEmpty]);

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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {items.map((item, index) => {
                console.log("warrantyInfo: ", warrantyInfo);
                const warrantyForItem = warrantyInfo
                .filter((warranty) => warranty !== null)
                .find(
                  (warranty) =>
                    cartData[index].item_number === warranty.item_num
                );
                const warrantyIdForItem = warrantyForItem
                  ? warrantyForItem._id
                  : "";
                const warrantyLengthForItem = warrantyForItem
                  ? `${warrantyForItem.length} Years`
                  : "None";

                console.log("warrantyIdForItem: ", warrantyIdForItem);

                return (
                  <div
                    key={index}
                    style={{
                      flexBasis: "30%",
                      marginBottom: "10px",
                      marginRight: "1%",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="item-body"
                      style={{
                        width: "100%",
                        background: "none",
                        border: "1px solid #add8e6",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ color: "#006d77", fontWeight: "bold" }}>
                        {item.item_name}
                      </div>
                      <Divider />
                      <div style={{ color: "#006d77", fontWeight: "normal" }}>
                        Quantity: {cartData[index].quantity}
                      </div>
                      <div style={{ color: "#006d77", fontWeight: "normal" }}>
                        Price: $
                        {(item.item_price * cartData[index].quantity).toFixed(
                          2
                        )}
                      </div>
                      <div style={{ color: "#006d77", fontWeight: "normal" }}>
                        Warranty Length: {warrantyLengthForItem}
                      </div>
                      <RemoveFromCartButton
                        cart={{
                          _id: cartData[index]._id,
                          item_number: cartData[index].item_number,
                          quantity: cartData[index].quantity,
                          store_number: cartData[index].store_number,
                        }}
                        warranty={warrantyIdForItem} 
                      />
                    </div>
                  </div>
                );
              })}
              <Button
                variant="outlined"
                style={{
                  width: "75%",
                  height: "auto",
                  background: "#edf6f9",
                  borderRadius: "10px",
                  borderColor: "#006d77",
                  padding: "10px",
                  margin: "10px",
                }}
                onClick={() => (window.location.href = "/checkout")}
              >
                <Typography style={{ color: "#006d77", fontWeight: "bold" }}>
                  Checkout
                </Typography>
              </Button>
            </div>
          </div>
        </div>
        <div style={{ padding: "1rem" }}></div>
      </div>
    </Box>
  );
};

export default CartPage;
