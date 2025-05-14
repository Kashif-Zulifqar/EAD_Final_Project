import { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create a Context Provider Component
export function StateManager({ children }) {
  const [signstate, setSignstate] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("Guest"); // <-- Add this line

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signstate,
        setSignstate,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
