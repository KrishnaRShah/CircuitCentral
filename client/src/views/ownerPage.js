import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import OwnerSideBar from "../components/navigation/ownerSideBar.js";

const OwnerPage = () => {
  const [store, setStore] = useState();
  const [storeOwner, setOwner] = useState();

  const fetchStoreData = async () => {
    try {
      const response = await fetch("http://localhost:3001/store/all");
      const data = await response.json();
      setStore(data);
      const r = await fetch(`http://localhost:3001/storeowner/${data[0].store_owner}`);
      const d = await r.json();
      setOwner(d);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchStoreData();
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
                      <h2>Store Information</h2>
                      {store ? (
                        <div>
                        <p>Store Number: {store[0].store_number}</p>
                        {storeOwner ? (
                          
                          <p>Store Owner: {storeOwner.name}</p>
                        ) : (
                          <p>Loading...</p>
                        )}
                        <p>Location: {store[0].location}</p>
                        </div>
                      ) : (
                        <div>
                        <p>Loading...</p>
                        <p>Loading...</p>
                        </div>
                      )}
                      
            </div>
        </Box>
    );
};

export default OwnerPage;
