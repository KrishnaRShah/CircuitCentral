import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import WarrantyOption from "./warrantyOption";
import cuid from "cuid";
import e from "cors";

const AddToCart = ({ item }) => {
  const [storeNumbers, setStoreNumbers] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [storeInfo, setStoreInfo] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [hold, setHold] = useState("");

  useEffect(() => {
    const fetchStoreNumbers = async () => {
      if (item && item._id) {
        try {
          const response = await fetch(
            `http://localhost:3001/hold/item/${item._id}`
          );
          const holdData = await response.json();
          const storeInfoPromises = holdData.map((hold) =>
            fetch(`http://localhost:3001/store/${hold.store_number}`).then(
              (response) => response.json()
            )
          );
          const storeInfo = await Promise.all(storeInfoPromises);
          setStoreNumbers(storeInfo);
        } catch (error) {
          console.error("Error fetching store numbers:", error);
        }
      }
    };
    fetchStoreNumbers();
  }, [item]);

  const handleChange = (event) => {
    setSelectedStore(event.target.value);
    localStorage.setItem("selectedStore", event.target.value);
    console.log("selected store: ", event.target.value);

    fetch(`http://localhost:3001/store/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        setStoreInfo(data);

        fetch(
          `http://localhost:3001/hold/item/${item._id}/store/${event.target.value}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("hold data: ", data);
            setHold(data[0]);
            setQuantity(data[0].quantity);
          })
          .catch((error) => console.error("Error fetching store data:", error));
      })
      .catch((error) => console.error("Error fetching store data:", error));
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    localStorage.setItem("quantity", event.target.value);
    console.log("quantity: ", event.target.value);
  };

  const handleCart = () => {
    console.log("selected store: ", selectedStore);
    console.log("quantity: ", quantity);
    console.log("item: ", item);
    const warrantyYears = localStorage.getItem("warrantyYears");
    console.log("warranty years: ", warrantyYears);
    const customer = JSON.parse(localStorage.getItem("customer"));
    console.log("customer: ", customer);

    const data = {
      customer_id: customer._id,
      store_number: selectedStore,
      item_number: item._id,
      quantity: quantity,
    };

    console.log("data: ", data);
    axios
      .post("http://localhost:3001/cart/", data)
      .then((response) => {
        console.log(response);
        axios
          .put(`http://localhost:3001/hold/${hold._id}`, {
            item_number: hold.item_number,
            store_number: hold.store_number,
            quantity: hold.quantity - quantity,
          })
          .then((response) => {
            console.log(response);
            //window.location.reload();
          })
          .catch((error) => {
            console.error("Error updating hold:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });

    if (warrantyYears && warrantyYears !== "") {
      const warranty_id = cuid();
      axios
        .post(`http://localhost:3001/warranty`, {
          item_num: item._id,
          customer_id: customer._id,
          warranty_id,
          activation_date: Date.now(),
          length: warrantyYears,
          store_number: selectedStore,
        })
        .then((response) => {
          console.log(response);
          localStorage.removeItem("warrantyYears");
        })
        .catch((error) => {
          console.error("Error creating warranty: ", error);
        });
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel style={{ color: "#006d77", fontWeight: "bold" }}>
          Select Store
        </InputLabel>
        <Select
          value={selectedStore}
          onChange={handleChange}
          label="Select Store"
        >
          <MenuItem value="" style={{ color: "#006d77", fontWeight: "normal" }}>
            <em>None</em>
          </MenuItem>
          {storeNumbers.map((store) => (
            <MenuItem
              key={store._id}
              value={store._id}
              style={{ color: "#006d77", fontWeight: "normal" }}
            >
              {store.location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel
          style={{
            color: !selectedStore ? "grey" : "#006d77",
            fontWeight: "bold",
          }}
        >
          Select Quantity
        </InputLabel>
        <Select
          value={quantity}
          onChange={handleQuantityChange}
          label="Select Quantity"
          disabled={!selectedStore}
          style={{
            color: !selectedStore ? "grey" : "#006d77",
            fontWeight: "normal",
          }}
        >
          <MenuItem value="" style={{ color: "#006d77", fontWeight: "normal" }}>
            <em>None</em>
          </MenuItem>
          {[...Array(quantity).keys()].map((value) => (
            <MenuItem
              key={value + 1}
              value={value + 1}
              style={{ color: "#006d77", fontWeight: "normal" }}
            >
              {value + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <WarrantyOption disabled={!selectedStore || !quantity} />
      <Button
        variant="outlined"
        disabled={!selectedStore || !quantity}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "75%",
          height: "auto",
          background: "#edf6f9",
          borderRadius: "10px",
          borderColor: !selectedStore || !quantity ? "grey" : "#006d77",
          padding: "10px",
          margin: "0 auto",
          color: !selectedStore || !quantity ? "grey" : "#006d77",
          fontWeight: "bold",
        }}
        onClick={() => handleCart()}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
