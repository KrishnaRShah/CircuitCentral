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
      <div>
      <h1>Store Data</h1>
      {store ? (
        <div>
          <p><strong>Store Number:</strong> {store[0].store_number}</p>
          {storeOwner ? (
            
            <p><strong>Store Owner:</strong> {storeOwner.username}</p>
          ) : ( <p>Loading...</p>)}

          <p><strong>Location:</strong> {store[0].location}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

                
                 
                    
                      
                    
                    

      </Box>
    );
};

export default OwnerPage;
