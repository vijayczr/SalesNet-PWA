import React, { useCallback, useEffect, useState } from "react";
import UserDataContext from "./UserDataContext/UserDataContext";

function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState();

  const updateUserData = useCallback((newData) => {
    setUserData((prevData) => {
      let updatedData = { ...prevData, ...newData }
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });
  }, []);

  useEffect(() => {
    let storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData)
      } catch (error) {
        console.log('Error in setting localstore data to context')
      }
    }
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
