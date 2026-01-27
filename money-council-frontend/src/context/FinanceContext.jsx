import { createContext, useContext, useState } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(null);
  const [inputData, setInputData] = useState(null);

  return (
    <FinanceContext.Provider
      value={{ analysis, setAnalysis, inputData, setInputData }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);