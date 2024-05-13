import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Sections/Application/Menu';
import Home from './pages/Home';
import Footer from './components/Sections/Application/Footer';
import BtnScrollToTop from './components/Ui/BtnScrollToTop';
import AuthPage from './pages/AuthPage';

function App() {
  
  return (
    <Router>
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

        </Routes>

        <BtnScrollToTop />
      </div>
    </Router>
  );
}

export default App;
