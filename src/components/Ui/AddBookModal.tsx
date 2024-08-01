
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import cameraRetro from '../../assets/imgs/camera-retro-solid.svg';
import { motion } from 'framer-motion';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Flip, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

interface AddBookModalProps{
    switchModal: () => void
    fetchBooks: () => void
    listName: string
}

function AddBookModal( { switchModal, listName, fetchBooks }: AddBookModalProps) {
    const { user } = useUser();
    const userId = user ? user.uid : "null";

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([""]);
    const [authorsString, setAuthorsString] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [link] = useState("");

    const [imageError, setImageError] = useState(true);

    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAuthorsString(event.target.value);
        const newAuthors: string[] = event.target.value.split(',').map(author => author.trim());
        setAuthors(newAuthors);
    };


    const bookId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);


    const addBookToList = async (userId: string, listName: string) => {
        const db = getFirestore();
        
        const bookData = {
            bookId,
            title,
            subtitle,
            authors,
            publishedDate,
            pageCount: Number(pageCount),
            thumbnail,
            link
        };

        const bookRef = doc(db, `users/${userId}/lists/${listName}/books`, bookData.bookId);
    
        try {
            await setDoc(bookRef, {
                ...bookData,
                addedAt: new Date()
            });
            fetchBooks();
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

    useEffect(() => {
        if (thumbnail) {
            setImageError(false);
        }
    }, [thumbnail]);
    
    const handleError = () => {
        setImageError(true);
    };

    
    
    return(
        <div>
        <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut",  }}
        className='fixed top-0 w-full h-screen backdrop-blur-sm bg-black/20 z-50' onClick={switchModal}></motion.div>
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
            
            <motion.div 
            
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.3 }}
            className='bg-white p-10 rounded-lg flex gap-10 relative w-screen h-screen md:min-h-0 md:h-auto md:w-max shadow-2xl border border-gray-200 flex-col md:flex-row overflow-y-scroll md:overflow-y-hidden'>
                <FontAwesomeIcon icon={faRectangleXmark} size="xl" className='text-black-principal hover:text-black absolute top-2 right-2 md:top-5 md:right-5 cursor-pointer' onClick={switchModal}/>
                <div className='flex flex-col gap-3 border-b border-gray-300 pb-10 md:pb-0 md:pr-10 md:border-b-0 md:border-r'>
                    {!imageError ?
                    <img src={thumbnail} alt="Image Book" className="w-full md:w-52 h-96 md:h-full object-cover" onError={handleError}/>
                    :
                    <div className=' w-full md:w-52 h-96 md:h-full bg-black-principal rounded py-6 flex flex-col items-center justify-center min-w-fit'>
                        <img src={cameraRetro} alt="camera-retro" />
                        <p className='text-white font-archivo text-sm mt-4 uppercase text-center'>Adicione a imagem <br></br>abaixo</p>
                    </div>
                    }
                    <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} type="text" className='border border-gray-300 rounded-md p-2 w-full md:w-52 placeholder:font-light' placeholder='URL da imagem'/>
                </div>
                <div className='flex flex-col flex-nowrap'>
                    <span>Título *</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='border border-gray-300 rounded-md p-2 max-w-96 mb-4 placeholder:font-light' placeholder='Título do livro'/>
                    <span>Descrição</span>
                    <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} type="text" className='border border-gray-300 rounded-md p-2 max-w-96 mb-4 placeholder:font-light' placeholder='Descricão'/>
                    <span>Autores (<small>Separados por vírgula</small>)</span> 
                    <input value={authorsString} onChange={handleAuthorChange} type="text" className='border border-gray-300 rounded-md p-2 max-w-96 mb-4 placeholder:font-light' placeholder='Publicadora do livro'/>
                    <div className='flex md:gap-2 flex-col md:flex-row'>
                        <div className='flex flex-col flex-nowrap'>
                            <span>Data de publicação</span>
                            <input value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} type="date" className='border border-gray-300 rounded-md p-2 max-w-96 md:max-w-none md:w-48 mb-4 placeholder:font-light' placeholder='19/06/2024'/>
                        </div>
                        <div className='flex flex-col flex-nowrap'>
                            <span>Número de páginas</span>
                            <input value={pageCount} onChange={(e) => setPageCount(e.target.value)} type="number" className='border border-gray-300 rounded-md p-2  max-w-96 md:max-w-none md:w-48 mb-4 placeholder:font-light' placeholder='300'/>
                        </div>
                    </div>
                    <button onClick={() => addBookToList(userId, listName)} className='bg-green-principal text-white font-archivo text-md p-2 rounded-md hover:bg-green-secondary transition duration-300'>Adicionar Livro</button>
                    

                </div>
            </motion.div>
        </div>
        </div>
    )
}

export default AddBookModal