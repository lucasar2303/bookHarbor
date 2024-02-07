import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Signin from '../Sections/Auth/Signin';
import Signup from '../Sections/Auth/Signup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage(){
    const [authPage, setAuthPage] = useState<string>('in');



    return(
        <div className='w-full h-screen bg-black flex md:flex-row flex-col'>
            <div className="auth-section md:h-screen md:flex-1 py-5 p-2 md:p-20 flex w-full md:flex-col md:w-auto items-center md:items-start">
                <Link to={"/"} className='mx-5 md:m-0 md:w-auto'><FontAwesomeIcon icon={faCircleLeft} size="2xl" className='text-white scale-125 hover:scale-150 transition-all duration-300'/></Link>
                <h1 className='text-white font-archivoB text-2xl md:text-7xl w-full md:text-left md:w-3/4 md:mt-20'>Explore um oceano de livros</h1>

            </div>
            <div className="flex-1 bg-white max-w-3xl">
                {authPage === 'in' ? <Signin  setAuthPage={setAuthPage} /> : <Signup  setAuthPage={setAuthPage} />}
            </div>
            
        </div>
    );
}

export default AuthPage;