import React from "react";
import { Typography, Button } from "@mui/material";
import axios from "axios";

function RemoveFromCartButton({ cart, warranty }) {
  const handleRemove = async () => {
    console.log("cart: ", cart);
    try {
      const response = await axios.delete(
        `http://localhost:3001/cart/all/${cart._id}`
      );
      console.log("response: ", response);
      try {
        const holdIdResponse = await axios.get(
          `http://localhost:3001/hold/item/${cart.item_number}/store/${cart.store_number}`
        );
        console.log("hold response: ", holdIdResponse);

        try {
          const data = {
            item_number: cart.item_number,
            store_number: cart.store_number,
            quantity: (holdIdResponse.data[0].quantity) + cart.quantity,
          };
          console.log("holdIdres.quantity: ", holdIdResponse.quantity)
          console.log("holdIdres.data.quantity: ", holdIdResponse.data[0].quantity);
          console.log("cart quantity: ", cart.quantity);
          console.log("data: ", data);
          const holdsResponse = await axios.put(
            `http://localhost:3001/hold/${holdIdResponse.data[0]._id}`,
            data
          );
          console.log("holds response: ", holdsResponse);
        } catch (error) {
          console.error("Error deleting from cart:", error);
        }
      } catch (error) {
        console.error("Error finding hold._id:", error);
      }
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
    axios
      .delete(`http://localhost:3001/warranty/${warranty}`)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.error("Error deleting warranty:", error);
      });
    window.location.reload();
    
  };

  return (
    <div>
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
        onClick={() => handleRemove()}
      >
        <Typography style={{ color: "#006d77" }}>Remove</Typography>
      </Button>
    </div>
  );
}
export default RemoveFromCartButton;
