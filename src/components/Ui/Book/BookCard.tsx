import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faList, faCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const noWord = "Não rotulado"

interface BookCardProps {
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    pageCount: number;
    thumbnail: string;
    // Inclua outras propriedades conforme necessário
}

const formatDateToBrazilian = (dateStr:string) => {
    if(dateStr == noWord){
        return noWord
    }
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr; // Retorna a data original se ela não estiver no formato esperado
    
};



const BookCard: React.FC<BookCardProps> = ({ title, subtitle, authors, publishedDate, pageCount, thumbnail }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [titleWord, setTitleWord] = useState('');
    const [subtitleWord, setSubtitleWord] = useState('');
    const [authorsWord, setAuthorsWord] = useState('');
    const [dateWord, setDateWord] = useState("");
    const [pageCountWord, setPageCountWord] = useState(0);

    useEffect(() => {
        
        setPageCountWord(pageCount ? pageCount : 0)
        setTitleWord(title ? (title.length > 33 ? title.substring(0, 30) + "..." : title) : noWord);
        setSubtitleWord(subtitle ? (subtitle.length > 63 ? subtitle.substring(0, 60) + "..." : subtitle) : '');

        const processAuthors = (): string => {
            if (!authors || authors.length === 0) {
                return noWord;
            } else {
                const authorsList = authors.length >= 2 ? authors.slice(0, 2).join(", ") : authors[0];
                return authorsList.length > 38 ? authorsList.substring(0, 35) + "..." : authorsList;
            }
        }; 
        setAuthorsWord(processAuthors());

        setDateWord(formatDateToBrazilian(publishedDate ? publishedDate : noWord));
    

    }, [title, subtitle, authors, publishedDate, pageCount, thumbnail]);

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
                    <img src={thumbnail} alt="Image Book" className="w-full mb-5 h-auto max-h-64 object-contain" />
                    <h2 className='text-black-secondary font-bold font-archivo text-lg text-center'>{titleWord}</h2>
                </div>
                <div className="back absolute w-full h-full shadow-2xl border p-5 flex flex-col justify-between border-gray-100 rounded-xl backface-hidden rotate-y-180">
                    <div className=''>
                        <h3 className="font-bold font-archivo text-xl border-b-2 text-black-principal border-black-secondary pb-3 mb-3" id='nameBook'>{titleWord}</h3>
                        <p className="font-archivo text-md text-black-secondary mb-2" id='subtitleBook'>{subtitleWord}</p>
                        <p className="font-archivo text-sm text-black-secondary" id='authorBook'><strong>{authors && authors.length >= 2 ? "Autores: " : "Autor: "}</strong> {authorsWord}</p>
                        <p className="font-archivo text-sm text-black-secondary" id='publishedDateBook'><strong>Publicado: </strong> {dateWord}</p>
                        <p className="font-archivo text-sm text-black-secondary" id='pageCountBook'><strong>Número de páginas: </strong> {pageCountWord}</p>
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