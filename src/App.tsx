import 'tailwindcss/tailwind.css';
import Menu from './components/Pages/Menu.tsx';
import Home from './components/Pages/Home.tsx';
import BookFinderZone from './components/Pages/BookFinderZone.tsx';

function App() {
  return (
    <div>
      <Menu/>
      <Home/>
      <BookFinderZone/>
    </div>
  );
}

export default App;
