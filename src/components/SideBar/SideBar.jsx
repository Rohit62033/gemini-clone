import React, { useContext } from "react";
import './SideBar.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const SideBar = () => {

  const { prevPrompts,extended, setExtended, open, isMobile , setOpen, onSent,
    setRecentPrompt} = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`
        sidebar
        ${extended ? "extended" : "collapsed"}
        ${open ? "active" : ""}
      `}
    >

      <div className="top">

        {/* DESKTOP MENU ICON ONLY */}
        {!isMobile && (
          <img
            onClick={() => setExtended(prev => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt="menu"
          />
        )}

        {/* MOBILE CLOSE BUTTON */}
{isMobile && (
  <img
    className="menu"
    src={assets.menu_icon}
    onClick={() => setOpen(false)}
  />
)}

        <div className="new-chat">
          <img src={assets.plus_icon} alt="new-chat" />
          {(extended || isMobile )? <p>New Chat</p> : null}
        </div>

         {(extended || isMobile) && (
          <div className="recent">
            <p className="recent-tittle">Recent</p>

            {prevPrompts.length === 0 && (
              <p className="empty">No history yet</p>
            )}

            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-history"
              >
                <img src={assets.message_icon} alt="icon" />
                <p>{item.slice(0, 18)}</p>
              </div>
            ))}
          </div>
        )}


      </div>

      <div className="bottom">
        <div className="bottom-item recent-history">
          <img src={assets.question_icon} alt="QIcon" />
          {extended || isMobile ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-history">
          <img src={assets.history_icon} alt="AIcon" />
          {extended || isMobile ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-history">
          <img src={assets.setting_icon} alt="SIcon" />
          {extended || isMobile ? <p>Setting</p> : null}
        </div>
      </div>

    </div>
  );
};

export default SideBar;
