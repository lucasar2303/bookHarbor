import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return(
        <footer className="w-full bg-black-principal py-5" id='contactSection'>
        <div className="max-w-7xl m-auto px-4 flex justify-between items-center flex-col-reverse md:flex-row">
          <p className="font-archivo text-sm text-gray-principal text-center  border-t-2 border-black-secondary pt-4 mt-4 md:border-none md:pt-0 md:mt-0">Desenvolvido por <span className='text-white font-archivo'>Lucas Anastácio Ribeiro</span></p>
          <div className="flex gap-5"><a href='https://www.linkedin.com/in/lucas-anastacio/' target='_blank'><FontAwesomeIcon icon={faLinkedin} size="xl" className='text-white'/></a><a href='https://github.com/lucasar2303' target='_blank'><FontAwesomeIcon icon={faGithub} size="xl" className='text-white'/></a></div>
        </div>


      </footer>
    );
};

export default Footer;