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
import { motion } from 'framer-motion';

function App() {

  const renderListPage = (namePage: string, key: string) => (
    <>
      <Menu />
      <ListPage key={key} namePage={namePage} />
      <Footer />
    </>
  );

  return (
    <UserProvider>
    <Router>
    <ToastContainer />
      <div>

        <Routes>

          {/* Rota para a página inicial */}
          <Route path="/" element={
            <>
            <motion.div
                        initial={{ opacity: 0, y: -50, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: 1}}
                        layout
                        >
              <Menu/>
              </motion.div>
              <Home />
              <Footer/>
            </>
          } />

          {/* Rota para a página de autenticação */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/list/favorites" element={renderListPage("Favoritos", "favorites")} />
          <Route path="/list/want-read" element={renderListPage("Quero Ler", "want-read")} />
          <Route path="/list/concluded" element={renderListPage("Concluídos", "concluded")} />

        </Routes>

        <BtnScrollToTop />
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
