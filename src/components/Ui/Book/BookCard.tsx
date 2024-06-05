import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faTrash, faList, faCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';  
import ToolTipButton from './ToolTipButton';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import imgBook from '../../../assets/imgs/imgBookExample.png';

const noWord = "Não rotulado"

interface BookCardProps {
    bookId: string;
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    pageCount: number;
    thumbnail: string;
    link?: string;
}

const formatDateToBrazilian = (dateStr:string) => {
    if(dateStr == noWord){
        return noWord
    }
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr; 
    
};



const BookCard: React.FC<BookCardProps> = ({ bookId, title, subtitle, authors, publishedDate, pageCount, thumbnail, link }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [titleWord, setTitleWord] = useState('');
    const [subtitleWord, setSubtitleWord] = useState('');
    const [authorsWord, setAuthorsWord] = useState('');
    const [dateWord, setDateWord] = useState("");
    const [pageCountWord, setPageCountWord] = useState(0);
    const { user } = useUser();
    const userId = user ? user.uid : null;
    const logged = user !== null;

    const bookData = {
        bookId: bookId,
        title: title ? title : "",
        subtitle: subtitle ? subtitle : "",
        authors: authors ? authors : [],
        publishedDate: publishedDate ? publishedDate : "",
        pageCount: pageCount ? pageCount : 0,
        thumbnail: thumbnail ? thumbnail : "",
        link: link
    };
    
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

    const addBookToList = async (userId: string, listName: string, bookData: BookCardProps) => {
        const db = getFirestore();
        const bookRef = doc(db, `users/${userId}/lists/${listName}/books`, bookData.bookId);
    
        try {
            await setDoc(bookRef, {
                ...bookData,
                addedAt: new Date()
            });
            console.log('Livro adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
        }
    };
    
    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    const addToFavorites = () => {
            if (userId) {
                addBookToList(userId, 'Favoritos', bookData);
            } else {
                console.log("Usuário não está logado");
            }
    };
    
    const addToCompleted = () => {
        if (userId) {
            addBookToList(userId, 'Concluídos', bookData);
        } else {
            console.log("Usuário não está logado");
        }
    };
    
    const addToToRead = () => {
            if (userId) {
                addBookToList(userId, 'Quero Ler', bookData);
            } else {
                console.log("Usuário não está logado");
            }
    };

    return(

        <div className="perspective-container h-96 w-56" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`card h-full w-full duration-1000 ${isFlipped ? 'do-flip' : ''}`}>
                <div className="front absolute w-full h-full shadow-2xl border p-5 border-gray-100 rounded-xl backface-hidden">
                    <img src={thumbnail ? thumbnail : imgBook} alt="Image Book" className="w-full mb-5 h-auto max-h-64 object-contain" />
                    <h2 className='text-black-secondary font-bold font-archivo text-lg text-center' >{titleWord}</h2>
                </div>
                <div className="back absolute w-full h-full shadow-2xl border p-5 flex flex-col justify-between border-gray-100 rounded-xl backface-hidden rotate-y-180">
                    <div className=''>
                        <h3 className="font-bold font-archivo text-xl border-b-2 text-black-principal border-black-secondary pb-3 mb-3" id='nameBook' title={title}>{titleWord}</h3>
                        <p className="font-archivo text-md text-black-secondary mb-2" id='subtitleBook'  title={subtitle}>{subtitleWord}</p>
                        <p className="font-archivo text-sm text-black-secondary" id='authorBook'><strong>{authors && authors.length >= 2 ? "Autores: " : "Autor: "}</strong> {authorsWord}</p>
                        <p className="font-archivo text-sm text-black-secondary" id='publishedDateBook'><strong>Publicado: </strong> {dateWord}</p>
                        {pageCount>0 && (<p className="font-archivo text-sm text-black-secondary" id='pageCountBook'><strong>Número de páginas: </strong> {pageCountWord}</p>)}
                    </div>
                    <div className="">
                    {logged && (
                        <div className="flex justify-between mb-2 gap-2">
                            <ToolTipButton dataTip="Listas" icon={faList} />
                            <ToolTipButton dataTip="Favoritar" icon={faStar} onClick={addToFavorites} />
                            <ToolTipButton dataTip="Concluído" icon={faCheck} onClick={addToCompleted} />
                            <ToolTipButton dataTip="Quero ler" icon={faPlus} onClick={addToToRead} />
                        </div>
                    )}
                        <div className="flex justify-between gap-2">
                            <a href={link} target='_blank' className='text-center text-lg shadow-xl rounded-sm bg-black-principal text-white font-archivo p-2 flex-auto hover:opacity-80 duration-300'>Ver mais <FontAwesomeIcon icon={faUpRightFromSquare} size="sm" className='text-white ml-2' /> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookCard;