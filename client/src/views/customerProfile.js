import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Sidebar from "../components/navigation/sideBar";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState();
  
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/customer/${JSON.parse(localStorage.getItem("customer"))._id}`);
        const data = await response.json();
        setCustomer(data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
        fetchCustomerData();
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
                      <h2>Customer Profile</h2>
                      {customer ? (
                        <div>
                        <p>Email: {customer.email}</p>
                        <p>Name: {customer.name}</p>
                        <p>Password: {customer.password}</p>
                        <p>Username: {customer.username}</p>
                        <p>Unique_Id: {customer.unique_id}</p>
                        <p>Id: {customer._id}</p>
                        </div>
                      ) : (
                        <div>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        </div>
                      )}
                      
            </div>
        </Box>
      );
};


export default CustomerProfile;