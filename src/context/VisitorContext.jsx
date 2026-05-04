/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState(0);

  const updateVisitors = (action) => {
    if (action === 'increment') setVisitorCount(prev => prev + 1);
    if (action === 'decrement' && visitorCount > 0) setVisitorCount(prev => prev - 1);
  };

  return (
    <VisitorContext.Provider value={{ visitorCount, updateVisitors }}>
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitors = () => useContext(VisitorContext);