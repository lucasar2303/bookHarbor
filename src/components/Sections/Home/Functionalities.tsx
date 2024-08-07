import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faBook } from '@fortawesome/free-solid-svg-icons';

function Functionalities(){
    return(
       
      <div className='w-full bg-white py-20' id='functionSection'>
      <div className="max-w-7xl m-auto px-4 flex items-center flex-col">
        <h2 className="text-2xl md:text-4xl font-archivo font-bold text-black-principal text-center uppercase">Funcionalidades</h2>
        <hr className="w-36 mt-10 border-blue-secondary border-b-4 mb-16"></hr>
        <div className="flex justify-between w-full items-center gap-14 md:flex-row flex-col">

          <div className="shadow-2xl border border-gray-200 flex-1 p-5 max-w-sm rounded-lg hover:-translate-y-3 duration-300">
            <div className='p-8 rounded-xl bg-blue-principal w-1 h-1 flex items-center justify-center -translate-y-10'><FontAwesomeIcon icon={faSearch} size="xl" className='text-white'/></div>
            <h3 className="text-2xl text-blue-principal font-bold font-archivo">Busca Literária</h3>
            <p className='text-sm md:text-md font-archivo mt-5 h-36'>No BookHarbor, você tem acesso a uma pesquisa literária avançada, permitindo a localização rápida e eficaz de livros, utilizando a biblioteca do Google Book API.</p>
          </div>
          <div className="shadow-2xl border border-gray-200 flex-1 p-5 max-w-sm rounded-lg hover:-translate-y-3 duration-300">
            <div className='p-8 rounded-xl bg-blue-principal w-1 h-1 flex items-center justify-center  -translate-y-10'><FontAwesomeIcon icon={faUserPlus} size="xl" className='text-white'/></div>
            <h3 className="text-2xl text-blue-principal font-bold font-archivo">Cadastro de usuário</h3>
            <p className='text-sm md:text-md font-archivo mt-5 h-36'>Cadastro de usuários, proporcionando a você a oportunidade de criar uma conta personalizada para aproveitar recursos exclusivos e personalizar sua jornada literária.</p>
          </div>
          <div className="shadow-2xl border border-gray-200 flex-1 p-5 max-w-sm rounded-lg hover:-translate-y-3 duration-300">
            <div className='p-8 rounded-xl bg-blue-principal w-1 h-1 flex items-center justify-center  -translate-y-10'><FontAwesomeIcon icon={faBook} size="xl" className='text-white'/></div>
            <h3 className="text-2xl text-blue-principal font-bold font-archivo">Livros Customizados</h3>
            <p className='text-sm md:text-md font-archivo mt-5 h-36'>A funcionalidade permite a criação de livros personalizados dentro das listas existentes, como 'Favoritos' e 'Concluídos', com a capacidade de adicionar imagens customizadas para cada livro.</p>
          </div>

        </div>
      </div>
    </div>
    );
};

export default Functionalities