import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import MenuItem from '../../Ui/MenuItem';
import logo from '../../../assets/imgs/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import MenuItemList from '../../Ui/MenuItemList';




function Menu() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const list = new Map<string, string>([
        ['Favoritos', '/list/favorites'],
        ['Quero Ler', '/list/want-read'],
        ['Concluído', '/list/concluded'],
    ]);

    const logoutItem = new Map<string, string>([
        ['Sair', '/logout']
    ])

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe  = onAuthStateChanged( auth , (user) =>{
            setCurrentUser(user);
        })

        return () => unsubscribe();
    }, []);

    const toggleMenu= ()=>{
        setIsMenuOpen(!isMenuOpen)
    };

    const handleNavigation = (href: string) => {
        // Navega para a home se não estiver já na home
        if (window.location.pathname !== '/') {
          navigate('/');
        }
        // Aguarda a navegação e depois rola para a seção
        setTimeout(() => {
          const section = document.querySelector(href);
          section?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Pode ser necessário ajustar esse timeout
    };




    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    {/* Logo e Título */}
                    <div>
                        <Link to="/" className="flex items-center py-4 px-2">
                            <img src={logo} alt="Logo" className="h-8 w-10 mr-2" />
                            <span className="font-semibold text-black-principal text-lg font-archivoB">BookHarbor</span>
                        </Link>
                    </div>

                    {/* Menu para Tela Grande */}
                    <div className="hidden md:flex items-center space-x-4 font-archivo text-black-principal">
                        {currentUser ? <MenuItemList list={list} toggleMenu={toggleMenu}>Listas</MenuItemList> : null}
                        <MenuItem href="#aboutSection" onClick={() => handleNavigation("#aboutSection")}>Sobre</MenuItem>
                        <MenuItem href="#contactSection" onClick={() => handleNavigation("#contactSection")}>Contato</MenuItem>
                        {currentUser ? (
                            <MenuItemList list={logoutItem} toggleMenu={toggleMenu}>Minha conta</MenuItemList>
                        ) : (
                            <Link to="/auth" className='py-4 px-2 hover:text-blue-principal border-b-2 border-transparent hover:border-blue-principal transition duration-300'>Entrar</Link>
                        )}
                    </div>

                    {/* Botão do Menu para Tela Pequena */}
                    <div className="flex items-center px-3 md:hidden">
                        <button onClick={toggleMenu}><FontAwesomeIcon icon={faBars} size="xl" /></button>
                    </div>

                    {/* Menu para Tela Pequena (inicialmente oculto) */}
                    <div className={`fixed top-0 left-0 w-full h-screen z-20 flex overflow-x-hidden md:hidden ${isMenuOpen ? 'visible' : 'invisible'}`}>
                        
                        <div className={`absolute bg-black-principal w-[100%] h-screen transition-all duration-300 ${isMenuOpen ? 'opacity-90' : 'opacity-0'}`} onClick={toggleMenu}></div>
                        <div className={`absolute right-0 bg-white w-[70%] h-screen flex flex-col z-10 px-3 transition-all duration-300 ${isMenuOpen ? 'right-0' : 'right-nfull'}`}>
                        <button className='self-end py-3'><FontAwesomeIcon icon={faXmark} size="xl" className=' z-10 text-black-secondary' onClick={toggleMenu}/></button>
                            {currentUser ? <MenuItemList list={list} toggleMenu={toggleMenu}>Listas</MenuItemList> : null}
                            <MenuItem href="#aboutSection" onClick={toggleMenu}>Sobre</MenuItem>
                            <MenuItem href="#contactSection"  onClick={toggleMenu}>Contato</MenuItem>
                            {currentUser ? (
                            <MenuItemList list={logoutItem} toggleMenu={toggleMenu}>Minha conta</MenuItemList>
                            ) : (
                                <Link to="/auth" className='py-4 px-2 hover:text-blue-principal border-b-2 border-transparent hover:border-blue-principal transition duration-300'>Entrar</Link>
                            )}

                        </div>


                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Menu;
