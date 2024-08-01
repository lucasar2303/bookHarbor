import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faTrash, faCheck, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';  
import ToolTipButton from './ToolTipButton';
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';
import imgBook from '../../../assets/imgs/imgBookExample.png';
import { Flip, toast } from 'react-toastify';
import { Book } from '../../../types/book';
import { motion } from 'framer-motion';


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
    canDelete?: boolean;
    listName?: string;
    setBooks?: React.Dispatch<React.SetStateAction<Book[]>>;
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



const BookCard: React.FC<BookCardProps> = ({ bookId, title, subtitle, authors, publishedDate, pageCount, thumbnail, link, canDelete, listName, setBooks }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [titleWord, setTitleWord] = useState('');
    const [subtitleWord, setSubtitleWord] = useState('');
    const [authorsWord, setAuthorsWord] = useState('');
    const [dateWord, setDateWord] = useState("");
    const [pageCountWord, setPageCountWord] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail ? thumbnail : imgBook);
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
            toast.success(`Adicionado na lista ${listName}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
                });
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            toast.error('Algo deu errado :(', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
                });
        }
    };

    const removeBookFromList = async () => {
        const db = getFirestore();
        const bookRef = doc(db, `users/${userId}/lists/${listName}/books`, bookId);

        try {
            await deleteDoc(bookRef);
            console.log('Livro removido com sucesso!');
            // Atualiza o estado para refletir a mudança
            if(setBooks){
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            }
        } catch (error) {
            console.error('Erro ao remover livro:', error);
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

    const handleErrorImg = () => {
        setThumbnailUrl(imgBook);
    };

    return(
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            layout
        >
        <div className="perspective-container h-96 w-56" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`card h-full w-full duration-1000 ${isFlipped ? 'do-flip' : ''}`}>
                <div className="front absolute w-full h-full shadow-2xl border p-5 border-gray-200 rounded-xl backface-hidden">
                    <img src={thumbnailUrl} alt="Image Book" className="w-full mb-5 h-full max-h-64 object-cover" onError={handleErrorImg}/>
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
                            <ToolTipButton dataTip="Concluído" icon={faCheck} onClick={addToCompleted} />
                            <ToolTipButton dataTip="Quero ler" icon={faPlus} onClick={addToToRead} />
                            <ToolTipButton dataTip="Favoritar" icon={faStar} onClick={addToFavorites} />
                            
                        </div>
                    )}
                        <div className="flex justify-between gap-2">
                            <a href={link} target='_blank' className='text-center items-center text-md shadow-xl rounded-sm bg-black-principal text-white font-archivo p-2 flex-auto hover:opacity-80 duration-300'>Ver mais <FontAwesomeIcon icon={faUpRightFromSquare} size="sm" className='text-white ml-2' /> </a>
                            {canDelete && (
                                <ToolTipButton dataTip="Remover" icon={faTrash} onClick={removeBookFromList} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    );
}

export default BookCard;