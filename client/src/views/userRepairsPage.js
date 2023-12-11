import Sidebar from "../components/navigation/sideBar";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { DateTime } from "luxon";
import { addYears, parseISO } from 'date-fns';
import axios from "axios";

const UserRepairsPage = () => {
    const [CustomerRepairs, setCustomerRepairs] = useState([]);
    const [CustomerWarranties, setCustomerWarranties] = useState([]);
    const [items, setItems] = useState([]);
  
    const fetchCustomerRepairsData = async () => {
        const response = await fetch(`http://localhost:3001/repairRequest/customer/${JSON.parse(localStorage.getItem("customer"))._id}`);
        const data = await response.json();
        setCustomerRepairs(data);
    };

    const fetchItemsData = async () => {
        const response = await fetch(`http://localhost:3001/item/all`);
        const data = await response.json();
        setItems(data);
    };

    const fetchCustomerWarranties = async () => {
        const response = await fetch(`http://localhost:3001/warranty/customer/${JSON.parse(localStorage.getItem("customer"))._id}`);
        const data = await response.json();     
        const filteredWarranties = data.filter((obj) => addYears(parseISO(obj.activation_date), obj.length) > new Date());
        setCustomerWarranties(filteredWarranties);
    };

    const createRepairRequest = async (warranty) => {
      const newRepairRequestData = {
        request_id: warranty.customer_id + Math.floor(Math.random() * 1000),
        status: "processing",
        estimated_cost: Math.floor(Math.random() * 50),
        date: new Date(),
        store_number: "6574c6a5d54bd56b7fe830f1",
        customer_id: warranty.customer_id,
        item_id: warranty.item_num,
        warranty_check: "true",
      };

      axios
        .post("http://localhost:3001/repairrequest/", newRepairRequestData)
        .then(function (result) {
          if (result.status === 200) {
            console.log(result);
          }
        })
        .catch((err) => {
          if (err.res) {
            console.log(err.res.data);
          }
        });
      
        const response = await fetch(`http://localhost:3001/warranty/${warranty._id}`, {method: 'DELETE'});
        const data = await response.json();

        fetchCustomerRepairsData();
        fetchCustomerWarranties();
    };
  
    useEffect(() => {
        fetchCustomerRepairsData();
        fetchItemsData();
        fetchCustomerWarranties();
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
                        <h2>Customer Repair Requests</h2>
                        { CustomerRepairs || items ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Repair Request Id</th>
                                  <th style={headerCellStyle}>Customer Name</th>
                                  {/* <th style={headerCellStyle}>Item Name</th> */}
                                  <th style={headerCellStyle}>Repair Status</th>
                                  <th style={headerCellStyle}>Estimated Cost</th>
                                  <th style={headerCellStyle}>Date</th>
                                  <th style={headerCellStyle}>Store Number</th>
                                  
                                  
                                  <th style={headerCellStyle}>Warranty</th>
                                </tr>
                              </thead>
                              <tbody>
                                {CustomerRepairs.map(r => (
                                  <tr key={r._id}>
                                    <td style={cellStyle}>{r._id}</td>
                                    <td style={cellStyle}>{JSON.parse(localStorage.getItem("customer")).name}</td>
                                    {/* <td style={cellStyle}>{items.find(obj => {return obj._id === r.item_id}).item_name}</td> */}
                                    <td style={cellStyle}>{r.status}</td>
                                    <td style={cellStyle}>{r.estimated_cost}</td>
                                    <td style={cellStyle}>{DateTime.fromISO(r.date).toFormat('yyyy/MM/dd')}</td>
                                    <td style={cellStyle}>{r.store_number}</td>                                                             
                                    <td style={cellStyle}>{r.warranty_check}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p>Loading...</p>
                        )}

                        <h2>Customer Available Warranties</h2>
                        { CustomerWarranties ? (
                          <div>
                            <table style={tableStyle}>
                              <thead>
                                <tr>
                                  <th style={headerCellStyle}>Warranty Id</th>
                                  <th style={headerCellStyle}>Customer Name</th>
                                  <th style={headerCellStyle}>Item Number</th>
                                 {/* <th style={headerCellStyle}>Item Name</th> */}
                                  <th style={headerCellStyle}>Activation Date</th>                              
                                  <th style={headerCellStyle}>Warranty Length</th>
                                  <th style={headerCellStyle}>Submit Repair Request?</th>
                                </tr>
                              </thead>
                              <tbody>
                                {CustomerWarranties.map(warranty => (
                                  <tr key={warranty._id}>
                                    <td style={cellStyle}>{warranty.warranty_id}</td>
                                    <td style={cellStyle}>{JSON.parse(localStorage.getItem("customer")).name}</td>
                                    <td style={cellStyle}>{warranty.item_num}</td>
                                    {/* <td style={cellStyle}>{items.find(obj => {return obj._id === r.item_id}).item_name}</td> */}
                                    <td style={cellStyle}>{DateTime.fromISO(warranty.activation_date).toFormat('yyyy/MM/dd')}</td>
                                    <td style={cellStyle}>{warranty.length + " years"}</td>
                                    <td style={cellStyle}><button onClick={() => createRepairRequest(warranty)}>Create Repair Request</button></td>                                   
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


export default UserRepairsPage;