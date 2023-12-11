import Sidebar from "../components/navigation/sideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DateTime } from "luxon";

const UserOrdersPage = () => {
    const [UserOrders, setUserOrders] = useState([]);
  
    const fetchUserOrdersData = async () => {
      const response = await fetch(`http://localhost:3001/order/customer/${JSON.parse(localStorage.getItem("customer"))._id}`);
      const data = await response.json();
      setUserOrders(data);
    };
  
    useEffect(() => {
        fetchUserOrdersData();
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
              <Sidebar />
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
                        <h2>Customer Order History</h2>
                        { UserOrders ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Order Id</th>
                                  <th style={headerCellStyle}>Customer Name</th>
                                  <th style={headerCellStyle}>Customer Address</th>
                                  <th style={headerCellStyle}>Order Date</th>
                                  <th style={headerCellStyle}>Shipping Company</th>
                                  <th style={headerCellStyle}>Receipt</th>
                                  <th style={headerCellStyle}>Order Total</th>                               
                                  <th style={headerCellStyle}>Items</th>
                                </tr>
                              </thead>
                              <tbody>
                                {UserOrders.map(order => (
                                  <tr key={order._id}>
                                    <td style={cellStyle}>{order._id}</td>
                                    <td style={cellStyle}>{JSON.parse(localStorage.getItem("customer")).name}</td>
                                    <td style={cellStyle}>{order.customer_address}</td>
                                    <td style={cellStyle}>{DateTime.fromISO(order.order_date).toFormat('yyyy/MM/dd')}</td>
                                    <td style={cellStyle}>{order.shipping_company}</td>
                                    <td style={cellStyle}>{order.receipt}</td>
                                    <td style={cellStyle}>{order.order_total}</td>
                                    <td style={cellStyle}>{order.items}</td>
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


export default UserOrdersPage;