import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faList, faCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import imgBook from '../../assets/imgs/imgBookExample.png';

function BookCard(){

    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    return(

        <div className="perspective-container h-96 w-56" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`card h-full w-full duration-1000 ${isFlipped ? 'do-flip' : ''}`}>
                <div className="front absolute w-full h-full shadow-2xl border p-5 border-gray-100 rounded-xl backface-hidden">
                    <img src={imgBook} alt="Image Book" className="w-full mb-5" />
                    <h2 className='text-black-secondary font-bold font-archivo text-lg text-center'>Javascript Book</h2>
                </div>
                <div className="back absolute w-full h-full shadow-2xl border p-5 flex flex-col justify-between border-gray-100 rounded-xl backface-hidden rotate-y-180">
                    <div className=''>
                        <h3 className="font-bold font-archivo text-xl border-b-2 text-black-principal border-black-secondary pb-3 mb-3" id='nameBook'>Javascript</h3>
                        <p className="font-archivo text-md text-black-secondary mb-2" id='descriptionBook'>O Guia Definitivo</p>
                        <p className="font-archivo text-sm text-black-secondary" id='descriptionBook'>Editora: Helder Guimarães Aragão</p>
                        <p className="font-archivo text-sm text-black-secondary" id='descriptionBook'>Publicado: 01/06/2013</p>
                        <p className="font-archivo text-sm text-black-secondary" id='descriptionBook'>Número de páginas: 309</p>
                    </div>
                    <div className="">
                        <div className="flex justify-between mb-2 gap-2">
                            <button className=' shadow-xl rounded-sm bg-white p-2 flex-auto border border-gray-100 hover:opacity-40 hover:-translate-y-1 duration-300'><FontAwesomeIcon icon={faList} size="lg" /></button>
                            <button className=' shadow-xl rounded-sm bg-white p-2 flex-auto border border-gray-100 hover:opacity-40 hover:-translate-y-1 duration-300'><FontAwesomeIcon icon={faCheck} size="lg" /></button>
                            <button className=' shadow-xl rounded-sm bg-white p-2 flex-auto border border-gray-100 hover:opacity-40 hover:-translate-y-1 duration-300'><FontAwesomeIcon icon={faStar} size="sm" /></button>
                            <button className=' shadow-xl rounded-sm bg-white p-2 flex-auto border border-gray-100 hover:opacity-40 hover:-translate-y-1 duration-300'><FontAwesomeIcon icon={faPlus} size="lg" /></button>
                        </div>
                        <div className="flex justify-between gap-2">
                            <button className=' shadow-xl rounded-sm bg-black-principal text-white font-archivo p-2 flex-auto hover:opacity-80 duration-300'>Ver mais</button>
                            <button className='hidden shadow-xl rounded-sm bg-red bg-red-principal p-2 px-4 hover:opacity-80 duration-300'><FontAwesomeIcon icon={faTrash} size="xl" className='text-white'/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookCard;