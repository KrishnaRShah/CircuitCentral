import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import axios from "axios";


const initialValues = {
  item_number: "",
  item_price: 0,
  item_description: "",
  item_name: "",
  type: "",
  quantity: 0,
};

const OwnerInventoryPage = () => {
    const [items, setItems] = useState([]);
    const [addItemVisible, setAddItemVisible] = useState();

    
  
    const fetchItemsData = async () => {
      console.log("fetch")
      const response = await fetch("http://localhost:3001/item/all");
      const data = await response.json();
      setItems(data);
    };
  
    useEffect(() => {
        fetchItemsData();
    }, []);

    
    const tableStyle = {
      borderCollapse: 'collapse',
      width: '100%',
    };
  
    const cellStyle = {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    };
  
    const headerCellStyle = {
      ...cellStyle,
      backgroundColor: '#f2f2f2',
    };

    const removeItem = async (_id) => {
      const response = await fetch(`http://localhost:3001/item/${_id}`, {method: 'DELETE'});
      const data = await response.json();
      fetchItemsData();
    };

    const addItem = async () => {
      setAddItemVisible(!addItemVisible);
    };


    const { touched, errors, handleSubmit, handleChange, values } = useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        axios
        .post("http://localhost:3001/item/", values)
        .then(function (result) {
          console.log(result)
          if (result.status === 201) {
            fetchItemsData();
          }
        })
        .catch((err) => {
          if (err.res) {
            console.log(err.res.data);
          }
        });
        
      }
    });
  
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
              <OwnerSideBar />
            </div>
          </div>
                  <div style={{
                      background: "#edf6f9",
                      borderRadius: "25px",
                      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                      display: "flex",
                      width: "fit-content",
                      padding: "50px",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      height: "fit-content",
                  }}>
                        <h2>Inventory</h2>
                        <button style={{margin: "10px auto", width: "fit-content"}} onClick={addItem}>Add Item</button>
                        { addItemVisible ? (
                          <div>
                            <form onSubmit={handleSubmit}>
                              <div>
                                <label>Item Number:</label>
                                <input type="number" name="item_number" value={values.item_number} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Item Price:</label>
                                <input type="number" name="item_price" value={values.item_price} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Item Description:</label>
                                <input type="text" name="item_description" value={values.item_description} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Item Name:</label>
                                <input type="text" name="item_name" value={values.item_name} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Item Type:</label>
                                <input type="text" name="type" value={values.type} onChange={handleChange} />
                              </div>
                              <div>
                                <label>Item Quantity:</label>
                                <input type="number" name="quantity" value={values.quantity} onChange={handleChange} />
                              </div>
                              
                              <div>
                                <button type="submit">Submit</button>
                              </div>
                            </form>
                            </div>
                        ) : (
                          <div>
                            </div>
                        )}
                        { items ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Id</th>
                                  <th style={headerCellStyle}>Item Number</th>
                                  <th style={headerCellStyle}>Item Price</th>
                                  <th style={headerCellStyle}>Item Description</th>
                                  <th style={headerCellStyle}>Item Name</th>
                                  <th style={headerCellStyle}>Type</th>
                                  <th style={headerCellStyle}>Quantity</th>
                                  <th style={headerCellStyle}>Remove Item?</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map(i => (
                                  <tr key={i._id}>
                                    <td style={cellStyle}>{i._id}</td>
                                    <td style={cellStyle}>{i.item_number}</td>
                                    <td style={cellStyle}>{i.item_price}</td>
                                    <td style={cellStyle}>{i.item_description}</td>
                                    <td style={cellStyle}>{i.item_name}</td>
                                    <td style={cellStyle}>{i.type}</td>
                                    <td style={cellStyle}>{i.quantity}</td>
                                    <td style={cellStyle}><button onClick={() => removeItem(i._id)}>Remove Item</button></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p>Loading...</p>
                        )}
                        
              </div>
          </Box>
      );
};


export default OwnerInventoryPage;