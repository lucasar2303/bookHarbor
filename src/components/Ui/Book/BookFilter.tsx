import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from "react-icons/bi";

interface BookFilterProps {
    onSearch: (searchTerm: string, sortOrder: string, typeOption:string) => void;
    totalResults: number;
    
  }
  
const BookFilter: React.FC<BookFilterProps> = ({ onSearch, totalResults  }) => {
    const [sortOrder, setSortOrder] = useState('relevance');
    const [typeOption, setTypeOption] = useState('all');
    const [searchTerm, setSearchTerm] = useState('Clean code');

    // Switch placeholder Select Order

    type OrderType = 'relevance' | 'newest' | 'standard';
    const orderLabels: Record<OrderType, string> = {
        'relevance': 'Relevância',
        'newest': 'Mais Recente',
        'standard': 'Ordenar por' 
    };
    const [orderSelect, setOrderSelect] = useState(orderLabels['standard'])

    // Switch placeholder Select Type

    type TypeType = 'all' | 'books' | 'magazines' | 'standard';
    const typeLabels: Record<TypeType, string> = {
        'standard': 'Tipo',
        'all': 'Todos',
        'books': 'Livros',
        'magazines': 'Revistas'
    };
    const [typeSelect, setTypeSelect] = useState(typeLabels['standard'])

    // Reset Filter

    const resetFilter = () => {
        const defaultSortOrder = 'relevance';
        const defaultTypeOption = 'all';
        const defaultSearchTerm = 'Clean Code';
        

        setSearchTerm(defaultSearchTerm);
        setSortOrder(defaultSortOrder);
        setTypeOption(defaultTypeOption);
        setOrderSelect(orderLabels['standard']);
        setTypeSelect(typeLabels['standard']);

        onSearch(defaultSearchTerm, defaultSortOrder, defaultTypeOption);
        setSearchTerm('');


        
    };

    // Button Order
    
    const [isListOpen, setIsListOpen] = useState(false);
    const toggleList = () => { setIsListOpen(!isListOpen); };
    const handleItemClick = (order: string) => {
        setOrderSelect(orderLabels[order as OrderType]);        
        setSortOrder(order);
        setIsListOpen(false);
    };

    // Button Select Type
    
    const [isListOpen2, setIsListOpen2] = useState(false);
    const toggleList2 = () => { setIsListOpen2(!isListOpen2); };
    const handleItemClick2 = (type: string) => {
        setTypeSelect(typeLabels[type as TypeType]);  
        setTypeOption(type);
        setIsListOpen2(false);
    };

    // Dropdown Select's

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
        setSearchTerm('')
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        
    }, []);

    // Search when toggle Order and Type

    useEffect(() => {
        handleSearch()
        
    }, [sortOrder, typeOption]);

    // Search

    const handleSearch = () => {
        onSearch(searchTerm, sortOrder, typeOption);
    };
     
    return(
        <div>
        <div className="flex justify-between items-start md:flex-row flex-col gap-2 font-archivo">
      {/* Dropdowns */}
            <div className="flex gap-2 items-center w-full md:w-auto">

                <div className='relative flex-1 md:flex-auto' ref={dropdownRef1}>
                    <div id="btnSelect" 
                        className="flex gap-2 py-2 items-center justify-between border text-black-principal border-gray-principal rounded-md px-2 hover:border-black-principal cursor-pointer transition-all"
                        onClick={toggleList}>
                    {orderSelect}
                    <BiChevronDown size={25}/>
                    </div>

                    {isListOpen && (
                    <ul className="absolute w-full rounded border bg-white border-gray-principal mt-2 overflow-scroll overflow-x-hidden max-h-40 scrollbar-select z-30">
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer"
                            onClick={() => handleItemClick("relevance")}>Relevância</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer"
                            onClick={() => handleItemClick("newest")}>Mais recente</li>
                        {/* Outros itens... */}
                    </ul>
                
                    )}
                </div>

                <div className='relative flex-1 md:flex-auto' ref={dropdownRef2}>
                    <div id="btnSelect" 
                        className="flex gap-2 py-2 items-center justify-between border text-black-principal border-gray-principal rounded-md px-2 hover:border-black-principal cursor-pointer transition-all"
                        onClick={toggleList2}>
                    {typeSelect}
                    <BiChevronDown size={25}/>
                    </div>

                    {isListOpen2 && (
                    <ul className="absolute w-full rounded border bg-white border-gray-principal mt-2 overflow-scroll overflow-x-hidden max-h-40 scrollbar-select z-30">
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={() => handleItemClick2("all")}>Todos</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={() => handleItemClick2("books")}>Livros</li>
                        <li className="py-1 px-2 text-black-secondary hover:bg-blue-principal hover:text-white cursor-pointer" onClick={() => handleItemClick2("magazines")}>Revistas</li>
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
    <hr className="my-4 md:my-8 border-t border-gray-principal" />
    <div className="flex justify-between w-full items-center mb-10">
        <button onClick={resetFilter} className="flex gap-2 items-center rounded shadow-white hover:-translate-y-1 transition-all duration-300 text-sm flex-row-reverse md:flex-row md:text-base active:scale-50"><span className='text-black-secondary'>Limpar filtros</span> <FontAwesomeIcon icon={faXmark} className='text-blue-secondary text-xl' /></button>
        <span className='text-black-secondary text-right text-sm md:text-base flex-1 '>{totalResults > 0 ? `${totalResults} Livros encontrados` : 'Nenhum livro encontrado'} </span>
    </div>
    </div>

    
    );
}

export default BookFilter;