import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { CommunityDataProvider } from './Context/CommunityDataContext';
import { ProblemProvider } from './Context/ProblemContext';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {


  return (
    <AuthProvider>
        <CommunityDataProvider>
          <ProblemProvider>
            <Header />
            <Main />
            <Footer />
          </ProblemProvider>
        </CommunityDataProvider>
    </AuthProvider>
  );
}

export default App;
