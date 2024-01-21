import React, { useCallback, useEffect, useState } from "react";
import UserDataContext from "./UserDataContext"
import useLocalStorage from "../../hooks/useLocalStorage";

function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
