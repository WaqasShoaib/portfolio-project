import React, { createContext, useContext, useState, useEffect } from 'react';

const PageTitleContext = createContext();

export const PageTitleProvider = ({ children }) => {
  const [title, setTitle] = useState('MyPortfolio');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(PageTitleContext);
