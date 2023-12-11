import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';



function BookPagination(){
    return(
        <div className="flex items-center justify-center gap-2">
                <a href="#" className=" bg-white text-black-secondary rounded-full hover:bg-gray-200 w-10 h-10 flex justify-center items-center border border-gray-300">
                    <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                </a>

                <div className="rounded-full border border-gray-300 h-10 flex gap-1 md:gap-2 px-2 md:px-4">
                    <a href="#" className="px-2 my-1 bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-200 font-archivo">1</a>
                    <a href="#" className="px-2 my-1 bg-blue-principal text-white rounded-md flex items-center hover:bg-blue-secondary font-archivo">2</a>
                    <a href="#" className="px-2 my-1 bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-200 font-archivo">3</a>
                    <span className="px-2 my-1 bg-white text-gray-700 rounded-md flex items-center font-archivo">...</span>
                    <a href="#" className="px-2 my-1 bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-200 font-archivo">12</a>
                </div>

                <a href="#" className=" bg-white text-black-secondary rounded-full hover:bg-gray-200 w-10 h-10 flex justify-center items-center border border-gray-300">
                    <FontAwesomeIcon icon={faChevronRight} size="sm" />
                </a>
        </div>
    );
}

export default BookPagination;