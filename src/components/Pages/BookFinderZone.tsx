import 'tailwindcss/tailwind.css';
import BookFilter from '../Ui/BookFilter.tsx';
import BookCard from '../Ui/BookCard.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BookFinderZone(){

    return(
        <div className="max-w-7xl m-auto px-4 mb-60 mt-20 md:mt-0">
            <BookFilter />
            <hr className="my-4 md:my-8 border-t border-gray-principal" />
            <div className="flex justify-between w-full items-center mb-10">
                <button className="flex gap-2 items-center rounded shadow-white hover:-translate-y-1 transition-all duration-300"><span className='text-black-secondary'>Limpar filtros</span> <FontAwesomeIcon icon={faXmark} className='text-blue-secondary text-xl' /></button>
                <span className='text-black-secondary'>285 Resultados</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-between w-full'>
                
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>

        </div>
    );
}

export default BookFinderZone;