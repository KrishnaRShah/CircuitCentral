import React from "react";
import axios from "axios";
import { Typography, Button } from "@mui/material";

function ConfirmOrderButton() {
  async function handleClick() {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const response = await axios.get(`http://localhost:3001/cart/customer/${customer._id}`);
    const customerCartData = response.data;
  
    let total = 0;
    let items = [];
    let shipping_company = [];
  
    const itemPromises = customerCartData.map(async (cartItem) => {
      const itemResponse = await axios.get(`http://localhost:3001/item/${cartItem.item_number}`);
      const item = itemResponse.data;
      items.push(item.item_name);
      total += item.item_price * cartItem.quantity;
  
      const storeResponse = await axios.get(`http://localhost:3001/store/${cartItem.store_number}`);
      const store = storeResponse.data;
  
      const shippingResponse = await axios.get(`http://localhost:3001/shippingcompany/${store.shipping_company}`);
      const shippingCompany = shippingResponse.data;
      shipping_company.push(shippingCompany.name);
    });
  
    await Promise.all(itemPromises);
  
    console.log("items: ", items);
    console.log("shipping company: ", shipping_company);
    console.log("total: ", total);

    const order = {
      order_id: customer._id + Date.now(),
      customer_id: customer._id,
      customer_address: customer.shipping_address,
      order_date: Date.now(),
      shipping_company: shipping_company.join(", "),
      receipt: "fake reciept",
      order_total: total,
      items: items.join(", "),
      status: "Processing",
    };

    const orderResponse = await axios.post(`http://localhost:3001/order/`, order);
    console.log("order response: ", orderResponse);
    if (orderResponse.status === 201 ){
      alert("Order placed successfully!");
      const cartsToDelete = await axios.get(`http://localhost:3001/cart/customer/${customer._id}`);
      cartsToDelete.data.forEach(async (cart) => {
        await axios.delete(`http://localhost:3001/cart/all/${cart._id}`);
      });
    } else {
      alert("Order failed to place.");
    }
  }  

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
        onClick={() => handleClick()}
      >
        <Typography style={{ color: "#006d77" }}>Confirm</Typography>
      </Button>
    </div>
  );
}
export default ConfirmOrderButton;
