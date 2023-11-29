import 'tailwindcss/tailwind.css';
import BookFilter from '../Ui/BookFilter.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BookFinderZone(){

    return(
        <div className="max-w-7xl m-auto px-4 mb-60 mt-20 md:mt-0">
            <BookFilter />
            <hr className="my-4 md:my-8 border-t border-gray-principal" />
            <div className="flex justify-between w-full items-center">
                <button className="flex gap-2 items-center rounded shadow-white hover:-translate-y-1 transition-all duration-300"><span className='text-black-secondary'>Limpar filtros</span> <FontAwesomeIcon icon={faXmark} className='text-blue-secondary text-xl' /></button>
                <span className='text-black-secondary'>28500 Resultados</span>
            </div>


        </div>
    );
}

export default BookFinderZone;