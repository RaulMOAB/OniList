import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function ValidationAlert() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button
        type="button"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="mt-1"
      >
        <IoAlertCircleOutline className="text-lg text-red-600 inline-block" />{" "}
        <span className="align-middle">Requeriments</span>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }} style={{ fontSize: 13 }}>
          <ul>
            <li>{"\u00A0"} - 1 number</li>
            <li>{"\u00A0"} - 1 lowercase</li>
            <li>{"\u00A0"} - 1 uppercase</li>
            <li>{"\u00A0"} - 1 symbol</li>
          </ul>
        </Typography>
      </Popover>
    </>
  );
}
