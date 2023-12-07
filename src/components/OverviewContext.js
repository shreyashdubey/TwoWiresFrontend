import React, { createContext, useContext, useState } from 'react';

const OverviewContext = createContext();

export const OverviewProvider = ({ children }) => {
  const [isOverviewSaved, setIsOverviewSaved] = useState(false);

  const setOverviewSaved = (value) => {
    setIsOverviewSaved(value);
    console.log(isOverviewSaved)
  };

  return (
    <OverviewContext.Provider value={{ isOverviewSaved, setOverviewSaved }}>
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = () => {
  return useContext(OverviewContext);
};
