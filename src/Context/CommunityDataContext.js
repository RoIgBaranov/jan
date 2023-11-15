import React, { createContext, useState  } from 'react';

const CommunityDataContext = createContext();

export const CommunityDataProvider = ({ children }) => {
  const [communityData, setCommunityData] = useState(null);
  const [communitiesData, setCommunitiesData] = useState([]);

  return (
    <CommunityDataContext.Provider value={{ communityData, setCommunityData, communitiesData, setCommunitiesData }}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export default CommunityDataContext;