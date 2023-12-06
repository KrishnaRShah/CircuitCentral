import React from "react";
import {
  AdjustmentsVerticalIcon,
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

function Sidebar() {
  return (
    <Container className="sidebar-body">
      <div className="sidebar-row">
        <NavLink to="/home" className="nav-link">
          <SidebarRow Icon={HomeIcon} title="Home" />
        </NavLink>

        <NavLink to={"/orders"} className="nav-link">
          <SidebarRow Icon={CurrencyDollarIcon} title="Orders" />
        </NavLink>

        <NavLink to={"/profile"} className="nav-link">
          <SidebarRow Icon={UserIcon} title="Profile" />
        </NavLink>

        <NavLink to={"/settings"} className="nav-link">
          <SidebarRow Icon={AdjustmentsVerticalIcon} title="Settings" />
        </NavLink>

        <NavLink to={"/repairrequests"} className="nav-link">
          <SidebarRow Icon={WrenchScrewdriverIcon} title="Repairs" />
        </NavLink>

        <LogoutButton
          onClick={() => {
            // get the current user and logout
            if (window.confirm("Are you sure you want to logout?")) {
              // Clean up the local storage
              localStorage.clear();
              // see if user is truly logged out
              if (localStorage.getItem("customer") === null) {
                console.log("User logged out successfully");
              }
              window.location.href = "/login";
            }
          }}
        />
      </div>
    </Container>
  );
}

export default Sidebar;