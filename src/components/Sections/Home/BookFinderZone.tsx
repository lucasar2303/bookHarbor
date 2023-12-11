import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import BookFilter from '../../Ui/Book/BookFilter.tsx';
import BookCard from '../../Ui/Book/BookCard.tsx';
import BookPagination from '../../Ui/Book/BookPagination.tsx';
import { searchBooks } from '../../../services/api/booksApi.ts';
import { Book } from '../../../types/book.ts';
import imgBook from '../../../assets/imgs/imgBookExample.png';

const BookFinderZone: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
  
    const handleSearch = (searchTerm: string) => {
      searchBooks(searchTerm)
        .then(data => {
          setBooks(data.items || []);
        })
        .catch(error => {
          console.error("Erro na busca:", error);
          // Lidar com o erro conforme necessário
        });
    };
    return(
        <div className="max-w-7xl m-auto px-4 mt-20 md:mt-0" id='bookFinderZone'>
            <BookFilter onSearch={handleSearch} />
            <hr className="my-4 md:my-8 border-t border-gray-principal" />

            {/* Outros elementos do componente */}

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center w-full mb-16'>
                {books.map(book => (

                    <BookCard 
                        key={book.id}
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


            <BookPagination />

            <p className='w-full text-center mt-10 font-archivo'>Não encontrou seu livro ? Adicione um diretamente em <a className='text-blue-principal hover:text-blue-secondary cursor-pointer'>sua lista</a></p>

        </div>
    );
}

export default BookFinderZone;

