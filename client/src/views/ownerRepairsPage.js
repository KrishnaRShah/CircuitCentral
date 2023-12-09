import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

const OwnerRepairPage = () => {
    const [orders, setOrders] = useState([]);
  
    const fetchRepairsData = async () => {
      const response = await fetch("http://localhost:3001/repairRequest/all");
      const data = await response.json();
      setOrders(data);
    };
  
    useEffect(() => {
        fetchRepairsData();
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
        </Box>
      );
};


export default OwnerRepairPage;