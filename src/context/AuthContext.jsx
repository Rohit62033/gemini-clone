import { createContext , useState , useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({props}){

const [user , setUser] = useState(null);
const [showAuthPopup , setShowAuthPopup] = useState(false);





  const AuthContextValue={

  }

  return(
    <AuthContext.Provider value={AuthContextValue}>{props.children}</AuthContext.Provider>
  )
}

export default AuthProvider;