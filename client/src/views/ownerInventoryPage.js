import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

const OwnerInventoryPage = () => {
    const [items, setItems] = useState([]);
  
    const fetchItemsData = async () => {
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