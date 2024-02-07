import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/api/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
    setAuthPage: (page: string) => void;
}


const Signin: React.FC<AuthPageProps> = ({ setAuthPage }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [accountLogged, setAccountLogged] = useState<boolean>(false);
    const navigate = useNavigate();
    

    const handleSwitchToSignup = () => {
        setAuthPage('up');
    };

    const handleGoogleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) =>{
            console.log('Usuário Logado com sucesso'+ result.user.displayName);
            setAccountLogged(true)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        })
        .catch((error) => {
            setError(true);
            setErrorMsg(getErrorMessage(error.code));
        })
    }

    const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        setError(false);
        setErrorMsg("");
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email || !password) {
            setError(true);
            setErrorMsg('Por favor, preencha todos os campos.');
            return;
        }
        if (!emailRegex.test(email)) {
            setError(true);
            setErrorMsg('Por favor, insira um e-mail válido.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Usuário Logado com sucesso' + userCredential.user.displayName);
            setAccountLogged(true)
            setTimeout(() => {
                navigate('/');
            }, 1500);
          })
          .catch((error) => {
            setError(true);
            setErrorMsg(getErrorMessage(error.code));
          });
    };


    const getErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/user-not-found':
            return 'Não existe conta de usuário correspondente a este e-mail.';
            case 'auth/wrong-password':
            return 'Senha incorreta. Por favor, tente novamente.';
            case 'auth/weak-password':
            return 'A senha é muito fraca. Escolha uma senha mais forte.';
            default:
            return 'Ocorreu um erro desconhecido. Por favor, tente novamente.';
        }
    };


    return(
    <div className="w-full h-full flex items-center mt-2 md:mt-0 fade-in">
        
        <div className=' w-10/12 md:w-8/12 m-auto bg-white'>
            <h2 className=' font-archivoB text-2xl md:text-4xl mb-8 md:mb-16 text-black-principal'>BookHarbor</h2>
    
            <span className='text-black-secondary'>Email</span>
            <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2 mb-5'>
                <FontAwesomeIcon icon={faEnvelope} className='text-gray-principal mr-2'/>
                <input type="email" placeholder='Seu endereço de email' name='email' id='email' className='w-1/2'  value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <span className='text-black-secondary'>Senha</span>
            <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2'>
                <FontAwesomeIcon icon={faLock} className='text-gray-principal mr-2'/>
                <input type="password" placeholder='Sua senha' name='password' id='password' className='w-1/2' maxLength={16} value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <div className="mt-2 flex justify-between text-black-secondary">
            <div className='flex items-center'><input type="checkbox" /><span className='ml-2 text-black-secondary'>Lembrar-me</span></div>
            <a href='' className='hover:text-blue-secondary text-black-secondary'>Esqueceu a senha?</a>
            </div>

            {error && <p className=" text-md mt-4 text-center text-red-500 center bg-red-100 rounded">{errorMsg}</p>}
            {accountLogged && <p className=" text-md mt-4 text-center text-green-800 center bg-green-100 rounded">Usuário logado ! Você será redirecionado...</p>}

            <button id='btnSubmit' className='w-full mt-5 bg-black-principal hover:bg-blue-third  transition-all duration-300 text-white text-xl rounded p-2' onClick={handleSignIn}>Entrar</button>
            <button id='btnGoogle' className='w-full mt-2 border-2 b-gray-principal text-black-secondary rounded p-1 transition-all duration-300' onClick={handleGoogleSignIn} ><FontAwesomeIcon icon={faGoogle} className='text-red-google mr-2'/>Entrar com Google</button>
            <p className='w-full text-end mt-2 text-black-secondary text-sm'>Não tem conta? <span onClick={handleSwitchToSignup} className='text-blue-secondary hover:underline text-sm cursor-pointer'>Criar conta</span></p>
        </div>

        
    </div>
    )
};

export default Signin;