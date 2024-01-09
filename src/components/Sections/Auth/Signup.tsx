import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


interface AuthPageProps {
    setAuthPage: (page: string) => void;
}


const Signup: React.FC<AuthPageProps> = ({ setAuthPage }) => {
    // ... lógica do componente ...

    const handleSwitchToSignin = () => {
        setAuthPage('in');
    };
    return(
    <div className="w-full h-full flex items-center mt-2 md:mt-0 fade-in">
        <div className=' w-10/12 md:w-8/12 m-auto bg-white'>
            <h2 className=' font-archivoB text-2xl md:text-4xl mb-8 md:mb-16 text-black-principal'>BookHarbor</h2>
            <form action="">
                <span className='text-black-secondary'>Email</span>
                <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2 mb-5'>
                    <FontAwesomeIcon icon={faEnvelope} className='text-gray-principal mr-2'/>
                    <input type="email" placeholder='Seu endereço de email' name='email' id='email' className='w-1/2'/>
                </div>

                <span className='text-black-secondary'>Senha</span>
                <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2'>
                    <FontAwesomeIcon icon={faLock} className='text-gray-principal mr-2'/>
                    <input type="password" placeholder='Sua senha' name='password' id='password' className='w-1/2'/>
                </div>

                <button type='submit' id='btnSubmit' className='w-full mt-16 bg-black-principal hover:bg-blue-third  transition-all duration-300 text-white text-xl rounded p-2'>Criar conta</button>
                <button type='submit' id='btnGoogle' className='w-full mt-2 border-2 b-gray-principal text-black-secondary rounded p-1 transition-all duration-300'><FontAwesomeIcon icon={faGoogle} className='text-red-google mr-2'/>Faça Login no Google</button>
                <p className='w-full text-end mt-2 text-black-secondary text-sm' onClick={handleSwitchToSignin}>Já tem conta? <span onClick={handleSwitchToSignin} className='text-blue-secondary hover:underline text-sm cursor-pointer'>Entrar</span></p>

            </form>
        </div>
    </div>
    )
}

export default Signup;