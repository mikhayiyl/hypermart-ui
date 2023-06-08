import "./topbar.css";
import { NotificationsNone, Language, Settings, Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
export default function Topbar({ setOpen, currentuser }) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Tooltip title="menu list">
          <Menu onClick={setOpen} className="icon" />
        </Tooltip>
        <div className="topLeft">
          <span className="logo">statistics</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Link to="/" className="link">
              <Language />
            </Link>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src={currentuser.image} alt={currentuser.username} className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
