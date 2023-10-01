import './App.css';
import { AuthProvider } from './Context/AuthContext';
import { ChangePageProvider } from './Context/ChangePageContext';
import { ProblemProvider } from './Context/ProblemContext';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {


  return (
    <AuthProvider>
      <ChangePageProvider>
        <ProblemProvider>
          <Header />
          <Main />
          <Footer />
        </ProblemProvider>
      </ChangePageProvider>
    </AuthProvider>
  );
}

export default App;
