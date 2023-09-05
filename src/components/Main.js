import React, { useContext } from 'react'
import ProblemList from './ProblemList'
import ProposeProblem from './ProposeProblem';
import MyContext from '../Context/MyContext';
import Login from './Login';
import SignUp from './SignUp';
import About from './About';

const Main = () => {

  const { currentPage } = useContext(MyContext);


  switch (currentPage) {
    case 'main':
      return <ProblemList />
    case 'propose':
      return <ProposeProblem />
    case 'login':
      return <Login />
    case 'signUp':
      return <SignUp />
    case 'about':
      return <About />
    default:
      <ProblemList />;
  }
}

export default Main