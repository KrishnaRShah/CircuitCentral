import React from "react";
import {
  Square3Stack3DIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import SidebarRow from "./sideBarRow";
import { LogoutButton } from "../buttons/logoutButton";
import { NavLink } from "react-router-dom";
import * as PropTypes from "prop-types";
import { Container } from "@mui/material";

LogoutButton.propTypes = { onClick: PropTypes.func };

function OwnerSideBar() {
  return (
    <Container className="sidebar-body">
      <div className="sidebar-row">
        
      <NavLink to={"/owner"} className="nav-link">
          <SidebarRow Icon={HomeIcon} title="Home" />
        </NavLink>

        <NavLink to={"/owner-orders"} className="nav-link">
          <SidebarRow Icon={CurrencyDollarIcon} title="Orders" />
        </NavLink>

        <NavLink to={"/owner-repairs"} className="nav-link">
          <SidebarRow Icon={WrenchScrewdriverIcon} title="Repairs" />
        </NavLink>

        <NavLink to={"/owner-profile"} className="nav-link">
          <SidebarRow Icon={UserIcon} title="Profile" />
        </NavLink>
        
        <NavLink to={"/owner-inventory"} className="nav-link">
          <SidebarRow Icon={Square3Stack3DIcon} title="Inventory" />
        </NavLink>

        <LogoutButton
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              localStorage.clear();
              if (localStorage.getItem("owner") === null) {
                console.log("Owner logged out successfully");
              }
              window.location.href = "/";
            }
          }}
        />
      </div>
    </Container>
  );
}

export default OwnerSideBar;