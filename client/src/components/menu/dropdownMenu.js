import React, { useEffect, useRef, useState } from "react";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
export default function DropdownMenu({
  items,
  handleMonitorOption,
  handleMouseOption,
  handleKeyboardOption,
}) {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMonitorClick = () => {
    setIsOpen(false);
    handleMonitorOption(items);
  };

  const handleMouseClick = () => {
    setIsOpen(false);
    handleMouseOption(items);
  };

  const handleKeyboardClick = () => {
    setIsOpen(false);
    handleKeyboardOption(items);
  };

  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <button
        onClick={handleButtonClick}
        style={{
          background: "#edf6f9",
          color: "#1b4965",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FilterAltOutlinedIcon style={{ color: "#1b4965" }} />
        Filter By
      </button>
      {isOpen && (
        <div>
          <button
            onClick={handleMouseClick}
            style={{
              background: "#edf6f9",
              border: "none",
              color: "#1b4965",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MouseOutlinedIcon style={{ color: "#1b4965" }} />
            Mouse
          </button>
          <button
            onClick={handleKeyboardClick}
            style={{
              background: "#edf6f9",
              border: "none",
              color: "#1b4965",
              display: "flex",
              alignItems: "center",
            }}
          >
            <KeyboardAltOutlinedIcon style={{ color: "#1b4965" }} />
            Keyboard
          </button>
          <button
            onClick={handleMonitorClick}
            style={{
              background: "#edf6f9",
              border: "none",
              color: "#1b4965",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MonitorOutlinedIcon style={{ color: "#1b4965" }} />
            Monitor
          </button>
        </div>
      )}
    </div>
  );
}
