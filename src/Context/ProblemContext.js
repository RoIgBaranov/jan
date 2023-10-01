import React from "react";
const ProblemContext = React.createContext();

export const ProblemProvider = ({ children }) => {
  const [selectedProblem, setSelectedProblem] = React.useState();

  return (
    <ProblemContext.Provider value={{ selectedProblem, setSelectedProblem }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemContext;