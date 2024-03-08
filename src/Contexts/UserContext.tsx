import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loginVisible: boolean;
  setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  handleLogin: () => {},
  loginVisible: true,
  setLoginVisible: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: "1s09fg76hs-07ds9fh7d-a9s76ggs5",
    name: "Eras",
    email: "eras@eras.work",
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loginVisible, setLoginVisible] = useState<boolean>(true);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        handleLogin,
        loginVisible,
        setLoginVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
