import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../../services/api/firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
    setAuthPage: (page: string) => void;
}


const Signup: React.FC<AuthPageProps> = ({ setAuthPage }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [accountCreated, setAccountCreated] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const handleSwitchToSignin = () => {
        setAuthPage('in');
    };

    const handleGoogleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) =>{
            console.log('Usuário registrado com sucesso'+ result.user.displayName);
            setAccountCreated(true)
            setTimeout(() => {
                navigate('/');
            }, 2000);
            
        })
        .catch((error) => {
            setError(true);
            setErrorMsg(getErrorMessage(error.code));
        })
    }

    const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Previne o comportamento padrão do botão
        setError(false);
        setErrorMsg("");
    
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Usuário registrado com sucesso' + userCredential.user.displayName);
            setAccountCreated(true)
            setTimeout(() => {
                navigate('/');
            }, 2000);
          })
          .catch((error) => {
            setError(true);
            setErrorMsg(getErrorMessage(error.code));
          });
    };

    const getErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
            return 'Este e-mail já está sendo usado por outra conta.';
            case 'auth/invalid-email':
            return 'O formato do e-mail é inválido.';
            case 'auth/weak-password':
            return 'A senha é muito fraca. Escolha uma senha mais forte.';
            default:
            return 'Ocorreu um erro desconhecido. Por favor, tente novamente.';
        }
    };
      

    return(
    <div className="w-full h-full flex items-center mt-2 md:mt-0 fade-in">
        {!accountCreated &&
        <div className=' w-10/12 md:w-8/12 m-auto bg-white'>
            <h2 className=' font-archivoB text-2xl md:text-4xl mb-8 md:mb-16 text-black-principal'>BookHarbor</h2>

            <span className='text-black-secondary'>Email</span>
            <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2 mb-5'>
                <FontAwesomeIcon icon={faEnvelope} className='text-gray-principal mr-2'/>
                <input type="email" placeholder='Seu endereço de email' id='email' className='w-full' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <span className='text-black-secondary'>Senha</span>
            <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2'>
                <FontAwesomeIcon icon={faLock} className='text-gray-principal mr-2'/>
                <input type="password" placeholder='Sua senha' id='password' maxLength={16} className='w-full' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            {error && <p className=" text-md mt-4 text-center text-red-500 center bg-red-100 rounded">{errorMsg}</p>}

            <button id='btnSubmit' className='w-full mt-10 bg-black-principal hover:bg-blue-third  transition-all duration-300 text-white text-xl rounded p-2'  onClick={handleSignUp}>Criar conta</button>
            <button id='btnGoogle' className='w-full mt-2 border-2 b-gray-principal text-black-secondary rounded p-1 transition-all duration-300' onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} className='text-red-google mr-2'/>Entrar com Google</button>
            <p className='w-full text-end mt-2 text-black-secondary text-sm' onClick={handleSwitchToSignin}>Já tem conta? <span onClick={handleSwitchToSignin} className='text-blue-secondary hover:underline text-sm cursor-pointer'>Entrar</span></p>
        </div>}
        
        {accountCreated &&
        <div className=" m-auto flex justify-center items-center bg-white shadow-xl p-4 rounded-3xl border border-gray-200">
            <FontAwesomeIcon icon={faCheck} size='2xl' className='text-blue-principal mr-2'/>
            <h2 className="text-2xl w-full m-2 text-blue-secondary font-archivo text-center">Conta criada com sucesso!</h2>
        </div>}
    </div>

    )
}

export default Signup;