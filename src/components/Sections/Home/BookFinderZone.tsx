import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import BookFilter from '../../Ui/Book/BookFilter.tsx';
import BookCard from '../../Ui/Book/BookCard.tsx';
import { searchBooks } from '../../../services/api/booksApi.ts';
import { Book } from '../../../types/book.ts';
import notFound from '../../../assets/imgs/not-found.svg';
import imgLoading from '../../../assets/imgs/loading.svg';
import { getAuth } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';

const BookFinderZone: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [totalResults, setTotalResults] = useState<number>(1);
    const [loadingOn, setLoadingOn] = useState<boolean>(false)
    const [logged, setLogged] = useState<boolean>(false)
    const auth = getAuth()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLogged(!!user);
        });

        return unsubscribe;
    }, []);
  
    const handleSearch = (searchTerm: string, sortOrder: string, typeOption: string) => {
        setLoadingOn(true)
      searchBooks(searchTerm, sortOrder, typeOption)
        .then(data => {
          setBooks(data.items || []);
          setTotalResults(data.totalItems);
        })
        .catch(error => {
          console.error("Erro na busca:", error);
          setBooks([]);
          setTotalResults(0);
          // Lidar com o erro conforme necessário
        })
        .finally(() => {
            setLoadingOn(false); // Desativar o indicador de carregamento
        });
    };
    return(
        <div className="max-w-7xl m-auto px-4 mt-20 md:mt-0 lg:mt-10" id='bookFinderZone'>
            <BookFilter onSearch={handleSearch}/>
            
            
            {loadingOn ? (
                    <div className="w-full flex justify-center items-center flex-col h-80 my-20 gap-1">
                        <img src={imgLoading} alt="" className='md:w-44 boat'/>
                        <div className="overflow-hidden w-56 flex gap-2 rounded-full">
                            <div className="water-wrap flex gap-2">
                                <div className='rounded-full bg-blue-secondary h-1 w-20'></div>
                                <div className='rounded-full bg-blue-secondary h-1 w-32'></div>
                                <div className='rounded-full bg-blue-secondary h-1 w-10'></div>
                            </div>
                            <div className="water-wrap flex gap-2">
                                <div className='rounded-full bg-blue-secondary h-1 w-20'></div>
                                <div className='rounded-full bg-blue-secondary h-1 w-32'></div>
                                <div className='rounded-full bg-blue-secondary h-1 w-10'></div>
                            </div>
                        </div>
                        <p className='text-gray-principal font-archivo font-semibold uppercase text-xl my-2'>Procurando...</p>
                    </div>
            ):(
                totalResults > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center w-full mb-16'>
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
                            />
                        ))}
                        </AnimatePresence>
                    </div>
                    ) : (
                    <div className="w-full flex items-center flex-col my-24 md:my-48 gap-6">
                        <img src={notFound} alt="" className='w-full max-w-xs md:max-w-md '/>
                        <h2 className="text-gray-principal font-archivoB text-7xl">Oops!</h2>
                        <p className="font-archivo text-gray-principal text-xl max-w-sm text-center" >Infelizmente não conseguimos encontrar o livro que você procura :(</p>
                    </div>
                    )
            )}            
            

            {!loadingOn?(
                <p className='w-full text-center mt-10 font-archivo'>Não encontrou seu livro ? Adicione um diretamente em sua lista</p>

            ):(
                <br />
            )}
            {logged}

        </div>
    );
}

export default BookFinderZone;

