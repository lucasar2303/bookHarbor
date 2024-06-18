import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Sections/Application/Menu';
import Home from './pages/Home';
import Footer from './components/Sections/Application/Footer';
import BtnScrollToTop from './components/Ui/BtnScrollToTop';
import AuthPage from './pages/AuthPage';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListPage from './pages/ListPage';

function App() {
  
  return (
    <UserProvider>
    <Router>
    <ToastContainer />
      <div>

        <Routes>

          {/* Rota para a página inicial */}
          <Route path="/" element={
            <>
              <Menu/>
              <Home />
              <Footer/>
            </>
          } />

          {/* Rota para a página de autenticação */}
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/list/favorites" element={
            <>
            <Menu/>
            <ListPage namePage="Favoritos" />
            <Footer/>
            </>
          } />

          <Route path="/list/want-read" element={
            <>
            <Menu/>
            <ListPage namePage="Quero ler" />
            <Footer/>
            </>
          } />

          <Route path="/list/concluded" element={
            <>
            <Menu/>
            <ListPage namePage="Concluídos" />
            <Footer/>
            </>
          } />

        </Routes>

        <BtnScrollToTop />
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
