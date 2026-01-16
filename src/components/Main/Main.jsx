import React, { useContext, useRef, useEffect, } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import './Main.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


const Main = () => {
  const { onSent, recentPrompt, loading, resultData, setInput, input, showResult, isMobile,
    setOpen,
    open
  } = useContext(Context);

  const resultRef = useRef(null);
  const isUserAtBottom = () => {
    const el = resultRef.current;
    if (!el) return false;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 50;
  };


  useEffect(() => {
    const el = resultRef.current;
    if (!el) return;

    if (isUserAtBottom()) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [resultData]);



  return (
    <div className="main" >
      <div className="nav">
        <div className="logo">
          {isMobile && (
            <img
              className="menu-btn"
              src={assets.menu_icon}
              alt="menu"
              onClick={() => setOpen(true)}   // <-- IMPORTANT
            />
          )}
          <p>Gemini</p></div>
        <img className="user-icon" src={assets.user_icon} alt="" />

        {isMobile && open && (
          <div className="overlay" onClick={() => setOpen(false)} />
        )}
      </div>

      <div className="main-container">

        {!showResult
          ? <>
            <div className="greet">
              <p><span>Hello, Rohit</span></p>
              <p>How can I help you?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beatiful places to see on an upcomping road trip</p>
                <img src={assets.compass_icon} ></img>
              </div>
              <div className="card">
                <p>Breifly summarize this concept :ubran planning</p>
                <img src={assets.bulb_icon} ></img>
              </div>
              <div className="card">
                <p>Braintorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} ></img>
              </div>
              <div className="card">
                <p>Improve the readablity of the following code</p>
                <img src={assets.code_icon} ></img>
              </div>
            </div>
          </>
          : <div className="result">
            <div className="result-tittle">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data" ref={resultRef}>
              <img src={assets.gemini_icon} alt="" />
              {
                loading
                  ? <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                  : <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {resultData}
                    </ReactMarkdown>
                  </div>
              }

            </div>
          </div>}



        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value)
              }
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const trimmed = input.trim();
                  if (!trimmed) return;
                  onSent(trimmed);
                  setInput("");
                }
              }}
              value={input}
              type="text" name="" placeholder="Ask anything" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => {
                onSent();
                setInput("");
              }} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes, so double-check it.
          </p>
        </div>
      </div>



    </div>
  )
}

export default Main;