import { createContext, useState, useEffect, useRef } from "react";
import api from "../api/axios";

export const Context = createContext();

const ContextProvider = (props) => {


  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const stored = localStorage.getItem("prevPrompts");
    return stored ? JSON.parse(stored) : [];
  });

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [open, setOpen] = useState(false);          // Mobile sidebar overlay
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [extended, setExtended] = useState(false);

  const timeoutsRef = useRef([]);
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (!isMobile) setExtended(false);

  }, [isMobile]);


  useEffect(() => {

    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));

  }, [prevPrompts]);

  useEffect(() => {
    return () => clearAllTimeouts(); //  cleanup when provider unmounts
  }, []);

  const animateResponseText = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 30 * index);
  }
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    clearAllTimeouts();
    setResultData("");
    setLoading(true);
    setShowResult(true);


    const finalPrompt = prompt ?? input;

    // Save prompt if it doesn't already exist
    setPrevPrompts(prev => {
      if (prev.includes(finalPrompt)) return prev;
      return [...prev, finalPrompt];
    });

    setRecentPrompt(finalPrompt);

    let response;

    try {
      const { data } = await api.post("api/chat", { message: finalPrompt })
      response = data.reply;
    } catch {
      response = "something went wrong. Please try again."
    } finally {
      setLoading(false)
    }

    const finalResponseArray = response.split(/(\s+)/);

    for (let i = 0; i < finalResponseArray.length; i++) {
      const nextWord = finalResponseArray[i];
      animateResponseText(i, nextWord);
    }

    setInput("");
  }


  const contextValue = {

    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    extended,
    setExtended,
    open,
    setOpen,
    isMobile,

  }
  return (

    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;