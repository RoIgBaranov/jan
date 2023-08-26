import React, { useContext } from 'react'
import ProblemList from './ProblemList'
import ProposeProblem from './ProposeProblem';
import MyContext from '../MyContext';
import Login from './Login';

const Main = () => {

  const { currentPage } = useContext(MyContext);


  switch (currentPage) {
    case 'main':
      return <ProblemList />
    case 'propose':
      return <ProposeProblem />
    case 'login':
      return <Login />
    default:
      <ProblemList />;
  }
}

export default Main