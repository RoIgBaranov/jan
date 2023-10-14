import React, { createContext, useState, useContext } from 'react';

const CommunityDataContext = createContext();

export const CommunityDataProvider = ({ children }) => {
  const [communityData, setCommunityData] = useState(null);

  return (
    <CommunityDataContext.Provider value={{ communityData, setCommunityData }}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export const useCommunityData = () => {
  return useContext(CommunityDataContext);
};