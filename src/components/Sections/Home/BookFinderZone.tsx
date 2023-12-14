import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import BookFilter from '../../Ui/Book/BookFilter.tsx';
import BookCard from '../../Ui/Book/BookCard.tsx';
import BookPagination from '../../Ui/Book/BookPagination.tsx';
import { searchBooks } from '../../../services/api/booksApi.ts';
import { Book } from '../../../types/book.ts';
import imgBook from '../../../assets/imgs/imgBookExample.png';
import notFound from '../../../assets/imgs/not-found.svg';

const BookFinderZone: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
  
    const handleSearch = (searchTerm: string, sortOrder: string, typeOption: string) => {
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
        });
    };
    return(
        <div className="max-w-7xl m-auto px-4 mt-20 md:mt-0 lg:mt-10" id='bookFinderZone'>
            <BookFilter onSearch={handleSearch} totalResults={totalResults}/>
            
            
            {/* Outros elementos do componente */}
            {totalResults > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center w-full mb-16'>
                {books.map((book, index) => (

                    <BookCard 
                        key={`${book.id}-${index}`}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        authors={book.volumeInfo.authors}
                        publishedDate={book.volumeInfo.publishedDate}
                        pageCount={book.volumeInfo.pageCount}
                        thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : imgBook}
                        // Passe outras propriedades necessárias para BookCard
                    />
                ))}
            </div>
            ) : (
            <div className="w-full flex items-center flex-col my-24 md:my-48 gap-6">
                <img src={notFound} alt="" className='w-full max-w-xs md:max-w-md '/>
                <h2 className="text-gray-principal font-archivoB text-7xl">Oops!</h2>
                <p className="font-archivo text-gray-principal text-xl max-w-sm text-center" >Infelizmente não conseguimos encontrar o livro que você procura :(</p>
            </div>
            )}


            <BookPagination />

            <p className='w-full text-center mt-10 font-archivo'>Não encontrou seu livro ? Adicione um diretamente em <a className='text-blue-principal hover:text-blue-secondary cursor-pointer'>sua lista</a></p>

        </div>
    );
}

export default BookFinderZone;

