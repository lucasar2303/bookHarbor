import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from "react-icons/bi";

interface BookFilterProps {
    onSearch: (searchTerm: string) => void;
  }

const BookFilter: React.FC<BookFilterProps> = ({ onSearch }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const toggleList = () => { setIsListOpen(!isListOpen); };
    const handleItemClick = () => { setIsListOpen(false); };

    const [isListOpen2, setIsListOpen2] = useState(false);
    const toggleList2 = () => { setIsListOpen2(!isListOpen2); };
    const handleItemClick2 = () => { setIsListOpen2(false); };

    const dropdownRef1 = useRef<HTMLDivElement>(null);
    const dropdownRef2 = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target as Node)) {
            setIsListOpen(false);
        }
        if (dropdownRef2.current && !dropdownRef2.current.contains(event.target as Node)) {
            setIsListOpen2(false);
        }
    };

    useEffect(() => {
        onSearch("FrontEnd")
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        
    }, []);

    // Search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

  
    return(
        <div className="flex justify-between items-start md:flex-row flex-col gap-2 font-archivo">
      {/* Dropdowns */}
            <div className="flex gap-2 items-center w-full md:w-auto">

                <div className='relative flex-1 md:flex-auto' ref={dropdownRef1}>
                    <div id="btnSelect" 
                        className="flex gap-2 py-2 items-center justify-between border text-black-principal border-gray-principal rounded-md px-2 hover:border-black-principal cursor-pointer transition-all"
                        onClick={toggleList}>
                    Ordernar por
                    <BiChevronDown size={25}/>
                    </div>

                    {isListOpen && (
                    <ul className="absolute w-full rounded border bg-white border-gray-principal mt-2 overflow-scroll overflow-x-hidden max-h-40 scrollbar-select">
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick}>Exemplo 1</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick}>Exemplo 2</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick}>Exemplo 3</li>
                        {/* Outros itens... */}
                    </ul>
                    )}
                </div>

                <div className='relative flex-1 md:flex-auto' ref={dropdownRef2}>
                    <div id="btnSelect" 
                        className="flex gap-2 py-2 items-center justify-between border text-black-principal border-gray-principal rounded-md px-2 hover:border-black-principal cursor-pointer transition-all"
                        onClick={toggleList2}>
                    Categoria
                    <BiChevronDown size={25}/>
                    </div>

                    {isListOpen2 && (
                    <ul className="absolute w-full rounded border bg-white border-gray-principal mt-2 overflow-scroll overflow-x-hidden max-h-40 scrollbar-select">
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick2}>Exemplo 1</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick2}>Exemplo 2</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={handleItemClick2}>Exemplo 3</li>
                        {/* Outros itens... */}
                    </ul>
                    )}
                </div>

            </div>

      {/* Search input */}
            <div className="flex gap-2 items-stretch w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Título do livro"
                    className="border border-gray-principal w-full md:w-auto rounded-md py-1 px-2 bg-white hover:border-gray-400 focus:outline-none focus:border-black-principal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="p-2 px-8 bg-blue-principal text-white rounded-md hover:bg-blue-secondary focus:outline-none focus:ring" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            

    </div>

    
    );
}

export default BookFilter;