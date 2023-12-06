import React from "react";

function SidebarRow({ Icon, title }) {
  return (
    <div >
      <Icon style={{ color: "#1b4965", display: "flex", alignItems: "center", padding: "0 0.1px" }} />
      <p style={{ color: "#1b4965" }}>
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
