import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import SearchBar from "../components/navigation/searchBar";
import { Container, Divider, Typography } from '@mui/material';
import { Dropdown } from "bootstrap";

const MainPage = () => {

  const [items, setItems] = useState([])
  const [types, setTypes] = useState([])

  const fetchItemData = () => {
    fetch("http://localhost:3001/item/all")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setItems(data)

        const uniqueTypes = [... new Set(data.map(a => a.type))];
        setTypes(uniqueTypes)
      })
  }

  useEffect(() => {
    fetchItemData()
  }, [])

  const handleRepairButtonClick = async () =>{
    //will eventually open up a page that displays repair request stuff
    console.log("repair button clicked");
    console.log(types)
  };

  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", 
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        background: "#a8dadc",
        animation: "gradient 5s ease infinite",
        "@keyframes gradient": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        paddingTop: "3rem", 
      }}
    >
      <div className="nav-menu" id="nav-menu">
        <div className="company-logo" id="company-logo">
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              position: "relative",
              display: "inline-block",
              fontSize: "2.25rem",
              fontWeight: "700",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              marginBlockStart: "0.67em",
              marginBlockEnd: "0.67em",
              background: "linear-gradient(300deg, #1b4965,#94d2bd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animate: "gradient 5s ease-in-out infinite",
              "@keyframes gradient": {
                "0%": {
                  backgroundPosition: "0% 50%",
                },
                "50%": {
                  backgroundPosition: "100% 50%",
                },
                "100%": {
                  backgroundPosition: "0% 50%",
                },
              },
            }}
          >
            Circuit Central 
          </Typography>       
        </div>
        <div className="repair-button-container" id="repair-button-body">
          <button onClick={handleRepairButtonClick} className="repair-button">Repair Requests</button>
        </div>       
        <div className="search-bar">
          <SearchBar />
        </div>{" "}
      </div>

      <div className="main-body" id="main-body">
        <div id="main-body-filter">
          <select>
            {types ? types.map((type) => {
              return <option>{type}</option>;
              }) 
              : null
            }          
          </select>
        </div>

        {items.map((item, index) => (
          <div className="item-body">
            <div style={{ color: '#006d77', fontWeight: 'bold' }}>{item.item_name}</div>
            <div style={{ color: '#006d77', fontWeight: 'bold' }}>Price: ${item.item_price}</div>
          </div>         
        ))}
      </div>
 
    </Box>
  );
};

export default MainPage;
