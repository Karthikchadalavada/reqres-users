import React, { createContext, useContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  
    const [user, setUser] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [list2, setList2] = useState([]);   
    const [edited, setEdited ] = useState(false);
    const [ID, setID] = useState(null);


   
  return (
    <MyContext.Provider value={{ 
      user, setUser,
      showEditModal, setShowEditModal,
      list2, setList2,
      edited, setEdited,
      ID, setID,
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
export default ContextProvider;
