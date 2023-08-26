import './App.css';
import { AuthProvider, MyProvider } from './MyContext'
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <AuthProvider>
      <MyProvider>
        <Header />
        <Main />
        <Footer />
      </MyProvider>
    </AuthProvider>
  );
}

export default App;
