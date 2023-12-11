import 'tailwindcss/tailwind.css';

function AboutSection(){
    return(
        <div className='w-full bg-black-principal py-20 mt-16' id='aboutSection'>
        <div className="max-w-7xl m-auto px-4 flex items-center flex-col">
          <h2 className="text-2xl md:text-4xl font-archivo font-bold text-white text-center uppercase">Sobre o projeto</h2>
          <hr className="w-36 mt-10 border-blue-secondary border-b-4 mb-10"></hr>
          <p className="text-white text-md md:text-2xl px-5 md:px-32 lg:px-56 text-center leading-loose font-archivo">O BookHarbor representa um projeto de estudo inovador, impulsionado por tecnologias líderes do setor, como React, Firebase e a API do Google Books. A plataforma foi concebida com o propósito de oferecer aos usuários uma experiência completa de descoberta literária e interação com seus livros favoritos.</p>
        </div>
      </div>
    );
};

export default AboutSection;