import React, { createContext, useState, useEffect } from "react";
import {
  createUserAuthDocument,
  onAuthChangedStateListener,
} from "../utlis/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsuscribe = onAuthChangedStateListener((user) => {
      if (user) {
        createUserAuthDocument(user);
      }
      setCurrentUser(user);
    });

    return unsuscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
