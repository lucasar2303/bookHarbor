import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book';
import BookCard from '../components/Ui/Book/BookCard';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext';  
import { AnimatePresence } from 'framer-motion';
import AddBookModal from '../components/Ui/AddBookModal';


interface ListPageProps {
    namePage: string
}

function ListPage({ namePage }: ListPageProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const userId = user ? user.uid : null;
    const navigate = useNavigate();
    

    useEffect(() => {
        
        if (!userId) {
            console.log("Usuário não está logado.");
            navigate('/');
            return;

        }

        fetchBooks();
    }, [namePage, userId]);

    const fetchBooks = async () => {
        const db = getFirestore();
        const booksRef = collection(db, `users/${userId}/lists/${namePage}/books`);
        
        books.length = 0;
        const booksSnapshot = await getDocs(booksRef);

        if (booksSnapshot.empty) {
            console.log("Nenhum livro encontrado na lista:", namePage);
            return;
        }

        const booksList = booksSnapshot.docs.map(doc => ({
            id: doc.id,
            volumeInfo: {
                title: doc.data().title || "Sem Título",
                subtitle: doc.data().subtitle || "",
                authors: doc.data().authors || [],
                publishedDate: doc.data().publishedDate || "Data não encontrada",
                pageCount: doc.data().pageCount || 0,
                description: doc.data().description || "",
                imageLinks: {
                    thumbnail: doc.data().thumbnail || ""
                },
                previewLink: doc.data().link || "",
                infoLink: doc.data().link || ""
            }
        }));

        setBooks(booksList);
    };

    const switchModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }

    
    return (
        <div className='min-h-screen'>
            {showModal && <AddBookModal switchModal={switchModal} listName={namePage} fetchBooks={fetchBooks} /> }
            <hr></hr>

            <div className='max-w-7xl m-auto px-4 mt-12 md:mt-0 lg:mt-20'>
                    <div className='flex w-full items-center justify-between mb-3 flex-col md:flex-row'>
                        <h1 className='font-archivoB text-black-principal text-2xl md:text-3xl mb-3 md:mb-0'>{namePage}</h1>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 max-w-xs w-full md:w-auto overflow-hidden text-sm font-medium rounded-lg group text-white font-archivo bg-blue-secondary" onClick={switchModal}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-blue-secondary rounded-md w-full md:w-auto group-hover:bg-blue-principal" >
                                Adicionar livro
                            </span>
                            <FontAwesomeIcon icon={faPlus} size="lg" className='px-2' />

                        </button>
                    </div>
                    <hr></hr>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center w-full mb-16 mt-10'>
                    <AnimatePresence>
                        {books.map((book) => (
        
                            <BookCard 
                                key={book.id}
                                bookId={book.id}
                                title={book.volumeInfo.title}
                                subtitle={book.volumeInfo.subtitle}
                                authors={book.volumeInfo.authors}
                                publishedDate={book.volumeInfo.publishedDate}
                                pageCount={book.volumeInfo.pageCount}
                                thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}
                                link={book.volumeInfo.previewLink || book.volumeInfo.infoLink || ""}
                                canDelete={true}
                                listName={namePage}
                                setBooks={setBooks}
                            />
                        ))}
                    </AnimatePresence>
                    </div>
                    
                    
                    
            </div>
        </div>
    );
}

export default ListPage