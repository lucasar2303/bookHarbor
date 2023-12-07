import 'tailwindcss/tailwind.css';
import Menu from './components/Sections/Menu.tsx';
import Home from './components/Sections/Home/Home.tsx';
import BookFinderZone from './components/Sections/Home/BookFinderZone.tsx';
import AboutSection from './components/Sections/Home/AboutSection.tsx';
import Functionalities from './components/Sections/Home/Functionalities.tsx';
import Footer from './components/Sections/Footer.tsx';
import BtnScrollToTop from './components/Ui/BtnScrollToTop.tsx';

function App() {
  return (
    <div>

      <Menu/>
      <Home/>
      <BookFinderZone/>
      <AboutSection/>
      <Functionalities/>
      <Footer/>
      <BtnScrollToTop/>

    </div>
  );
}

export default App;
