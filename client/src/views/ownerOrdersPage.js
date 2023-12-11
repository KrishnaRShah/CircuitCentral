import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DateTime } from "luxon";

const OwnerOrdersPage = () => {
    const [orders, setOrders] = useState([]);
   
    const fetchOrdersData = async () => {
      const response = await fetch("http://localhost:3001/order/all");
      const data = await response.json();
      setOrders(data);
    };
  
    useEffect(() => {
        fetchOrdersData();
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
                        <h2>Order History</h2>
                        { orders ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Id</th>
                                  <th style={headerCellStyle}>Customer Id</th>
                                  <th style={headerCellStyle}>Customer Address</th>
                                  <th style={headerCellStyle}>Order Date</th>
                                  <th style={headerCellStyle}>Shipping Company</th>
                                  <th style={headerCellStyle}>Receipt</th>
                                  <th style={headerCellStyle}>Order Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map(o => (
                                  <tr key={o._id}>
                                    <td style={cellStyle}>{o._id}</td>
                                    <td style={cellStyle}>{o.customer_id}</td>
                                    <td style={cellStyle}>{o.customer_address}</td>
                                    <td style={cellStyle}>{DateTime.fromISO(o.order_date).toFormat('yyyy/MM/dd')}</td>
                                    <td style={cellStyle}>{o.shipping_company}</td>
                                    <td style={cellStyle}>{o.receipt}</td>
                                    <td style={cellStyle}>{o.order_total}</td>
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


export default OwnerOrdersPage;