import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

const OwnerProfilePage = () => {
    const [owner, setOwner] = useState();
  
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/storeOwner/${JSON.parse(localStorage.getItem("storeOwner"))._id}`);
        const data = await response.json();
        setOwner(data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
        fetchOwnerData();
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
                      <h2>Store Owner Profile</h2>
                      {owner ? (
                        <div>
                        <p>Email: {owner.email}</p>
                        <p>Name: {owner.name}</p>
                        <p>Password: {owner.password}</p>
                        <p>Username: {owner.username}</p>
                        <p>Unique_Id: {owner.unique_id}</p>
                        <p>Id: {owner._id}</p>
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


export default OwnerProfilePage;