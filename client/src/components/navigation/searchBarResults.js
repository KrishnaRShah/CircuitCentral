import React, { useState } from "react";
import { Container, Divider, Button } from "@mui/material";

const SearchBarResults = ({ filteredItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    localStorage.setItem("selectedItem", JSON.stringify(item));
    console.log("Item clicked:", item.item_name);
    window.location.href = "/item";
  };

  return (
    <>
      {filteredItems.length > 0 && (
        <Container
          maxWidth="sm"
          sx={{
            borderColor: "#006d77",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: "1rem",
            margin: "0 auto",
            padding: "1rem",
            background: "#edf6f9",
            boxShadow: "0px 0px 10px 2px #bdbdbd",
          }}
        >
          {filteredItems.map((item, index) => (
            <div key={item._id} style={{ marginBottom: "0.5rem" }}>
              <Button
                variant="text"
                onClick={() => handleItemClick(item)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#006d77", fontWeight: "bold" }}>
                  {item.item_name}
                </div>
                <div style={{ color: "#83c5be", fontSize: "0.85rem" }}>
                  Price: ${item.item_price}
                </div>
              </Button>
              {index !== filteredItems.length - 1 && (
                <Divider
                  key={`divider-${index}`}
                  sx={{
                    mt: 1,
                    mb: 1,
                    width: "70%",
                    mx: "auto",
                  }}
                />
              )}
            </div>
          ))}
        </Container>
      )}
    </>
  );
};

export default SearchBarResults;
