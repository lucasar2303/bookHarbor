import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


interface MenuItemListProps {
    children: React.ReactNode;
    list: Map<string, string>;
}



const MenuItemList: React.FC<MenuItemListProps> = ({ children, list }) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout= async ()=>{
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/auth')
          } catch (error) {
            console.error('Erro ao sair: ', error);
          }
    };

    return (
        <span className={`py-4 px-2 border-b-2 border-transparent  transition duration-300 relative ${ isOpen ? 'text-blue-principal' : ''}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            {children}<FontAwesomeIcon icon={faChevronDown} size="sm" className='ml-2'/>
            <div className={`absolute z-10 right-0 bg-white border border-gray-200 shadow-md rounded py-2 md:w-32 w-full text-black-principal justify-end items-center text-end flex-col ${ isOpen ? 'flex' : 'hidden'}`}>
                {[...list.entries()].map(([title, path]) => {
                    if(path === '/logout'){
                        return (
                            <button key={title} onClick={handleLogout} className=' text-end py-2 w-full hover:bg-gray-100 px-2 md:border-none border-y border-gray-100'>{title}</button>
                        )
                    }else{
                        return (
                            <Link key={title} to={path} className='py-2 w-full hover:bg-gray-100 px-2 md:border-none border-y border-gray-100'>{title}</Link>
                        )
                    }
                })}
            </div>
        </span>
    );
};

export default MenuItemList;