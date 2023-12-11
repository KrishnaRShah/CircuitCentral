import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

export function LogoutButton(props) {
  return (
    <div>
      <button onClick={props.onClick} style={{background: "#ffffff"}}>
        <span style={{ color: "#1b4965" }}>Logout</span>
        <ArrowLeftOnRectangleIcon style={{ color: "#1b4965" }} />
      </button>
    </div>
  );
}

// import { Button } from "@mui/material";

// export function LogoutButton(props) {
//   return (
//     <div>
//       <Button onClick={props.onClick} style={{background: "#ffffff"}}>
//         <span style={{ color: "#1b4965" }}>Logout</span>
//         <ArrowLeftOnRectangleIcon style={{ color: "#1b4965" }} />
//       </Button>
//     </div>
//   );
// }
