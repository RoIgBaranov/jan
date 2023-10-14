import React, { useContext } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom';
import ProblemList from './ProblemList'
import ProposeProblem from './ProposeProblem';

import Login from './Login';
import SignUp from './SignUp';
import About from './About';
import AuthContext from '../Context/AuthContext';
import ProfilePage from './ProfilePage';
import ProblemInfo from './ProblemInfo';
import CommunitiesList from './CommunitiesList';
import ProposeCommunity from './ProposeCommunity';
import CommunityInfo from './CommunityInfo';


const Main = () => {

  const { isLoggedIn } = useContext(AuthContext);
  


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/problems" />} />
      <Route path='/problems' exact element={<ProblemList />} />
      <Route path='/propose' element={isLoggedIn ? <ProposeProblem /> : <Login />} />
      <Route path="/login" element={isLoggedIn ? <ProblemList/> : <Login />} />
      <Route path='/signUp' element={isLoggedIn ? <ProblemList />: <SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path='/problems/:problem' element={<ProblemInfo />} />
      <Route path="/communities" element={<CommunitiesList />} />
      <Route path="/communities/add" element={<ProposeCommunity/>}/>
      <Route path="/communities/:community" element={<CommunityInfo/>}/>
    </Routes>
  )
}





export default Main