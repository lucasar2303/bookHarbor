import 'tailwindcss/tailwind.css';
import bghome from '../assets/imgs/bg-home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import BookFinderZone from '../components/Sections/Home/BookFinderZone';
import AboutSection from '../components/Sections/Home/AboutSection';
import Functionalities from '../components/Sections/Home/Functionalities';
import { motion } from 'framer-motion';


function Home(){

    return(
        <div>
            <div
            
            className='flex justify-center w-full h-screen max-w-7xl m-auto flex-col md:flex-row mt-10 px-4 text-center md:text-left pt-20'>
                
                    <div className='mt-0 md:mt-10 md:pr-2 lg:mt-20 lg:pr-10'>

                        <motion.h1
                        initial={{ opacity: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut"}}
                        layout
                        className='text-black-principal text-4xl md:text-7xl mb-10'>
                            Navegue por uma maré de livros
                        </motion.h1>

                        <motion.div
                        initial={{ opacity: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1}}>
                            <a href='#bookFinderZone'>
                            <button className="relative flex w-full md:w-11/12 lg:w-10/12 py-2 px-4 mb-5 rounded text-xl items-center justify-between overflow-hidden bg-blue-principal text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:-translate-x-10 before:bg-blue-secondary before:opacity-80 before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56">
                                <span className="text-left text-xl relative">Encontre seu livro </span>
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </button>
                            </a>
                        </motion.div>

                        <motion.p 
                        initial={{ opacity: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: 1 }}
                        className='text-black-principal text-sm md:text-base w-full md:w-5/6  lg:w-3/4'>
                            A leitura frequente auxilia no aprimoramento da formulação de seus próprios pensamentos. A plataforma <strong className='text-blue-principal'>BookHarbor</strong> está sempre disponível para orientá-lo na escolha de um livro para desfrutar momentos de lazer.
                        </motion.p> 


                    
                    </div>
                    <motion.img
                    initial={{ opacity: 0, y: 0, scale: 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 1}}
                    src={bghome}
                    alt="Background"
                    className="mt-5 md:mt-0 w-full md:w-1/2 h-5/6 object-cover">
                    </motion.img>
                
            </div>
            <BookFinderZone/>
            <AboutSection/>
            <Functionalities/>
        </div>
    );
}

export default Home;
