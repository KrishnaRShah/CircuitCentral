import OwnerSideBar from "../components/navigation/ownerSideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DateTime } from "luxon";

const OwnerRepairPage = () => {
    const [repairs, setRepairs] = useState([]);
  
    const fetchRepairsData = async () => {
      const response = await fetch("http://localhost:3001/repairRequest/all");
      const data = await response.json();
      setRepairs(data);
    };
  
    useEffect(() => {
        fetchRepairsData();
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
                        <h2>Repair Request History</h2>
                        { repairs ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Id</th>
                                  <th style={headerCellStyle}>Repair Status</th>
                                  <th style={headerCellStyle}>Estimated Cost</th>
                                  <th style={headerCellStyle}>Date</th>
                                  <th style={headerCellStyle}>Store Number</th>
                                  <th style={headerCellStyle}>Customer Id</th>
                                  <th style={headerCellStyle}>Item Id</th>
                                  <th style={headerCellStyle}>Warranty</th>
                                </tr>
                              </thead>
                              <tbody>
                                {repairs.map(r => (
                                  <tr key={r._id}>
                                    <td style={cellStyle}>{r._id}</td>
                                    <td style={cellStyle}>{r.status}</td>
                                    <td style={cellStyle}>{r.estimated_cost}</td>
                                    <td style={cellStyle}>{DateTime.fromISO(r.date).toFormat('yyyy/MM/dd')}</td>
                                    <td style={cellStyle}>{r.store_number}</td>
                                    <td style={cellStyle}>{r.customer_id}</td>
                                    <td style={cellStyle}>{r.item_id}</td>
                                    <td style={cellStyle}>{r.warranty_check}</td>
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


export default OwnerRepairPage;