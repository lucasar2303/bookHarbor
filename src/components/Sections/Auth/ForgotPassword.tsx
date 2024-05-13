import { faCircleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { auth } from "../../../services/api/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

interface AuthPageProps {
    setAuthPage: (page: string) => void;
}

function ForgotPasswordForm( { setAuthPage }: AuthPageProps) {
    const [email, setEmail] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleSwitchToSignin = () => {
        setAuthPage('in');
    }

    const handleSendForgotPassword = () => {
        setError(false)
        if (!email) {
            setError(true);
            setErrorMsg('Por favor, insira seu e-mail.');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('E-mail de redefinição de senha enviado.');
            // Você pode adicionar qualquer ação após o envio do e-mail aqui.
        })
        .catch((error) => {
            setError(true);
            setErrorMsg(getPasswordResetErrorMessage(error.code));
            // Trate o erro aqui, como mostrar uma mensagem para o usuário.
        });
    }

    const getPasswordResetErrorMessage = (errorCode: string): string => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'Não existe conta de usuário correspondente a este endereço de e-mail.';
            case 'auth/invalid-email':
                return 'O endereço de e-mail fornecido é inválido.';
            case 'auth/too-many-requests':
                return 'Bloqueamos todas as solicitações deste dispositivo devido a atividades incomuns. Tente novamente mais tarde.';
            case 'auth/network-request-failed':
                return 'Falha de rede. Por favor, verifique sua conexão com a internet e tente novamente.';
            default:
                return 'Ocorreu um erro ao tentar redefinir a senha. Por favor, tente novamente.';
        }
    };
    

    return (
        <div className="w-full h-full flex items-center mt-2 md:mt-0 fade-in">
        
        <div className=' w-10/12 md:w-8/12 m-auto bg-white'>
            <h2 className=' font-archivoB text-2xl md:text-4xl mb-8 md:mb-16 text-black-principal'>BookHarbor</h2>
    
            <span className='text-black-secondary text-center'>Insira o e-mail da sua conta para que possamos enviar um e-mail para redefinir sua senha</span>
            <div className=' border-2 b-gray-secondary rounded-sm p-2 flex items-center mt-2 mb-5'>
                <FontAwesomeIcon icon={faEnvelope} className='text-gray-principal mr-2'/>
                <input type="email" placeholder='Seu endereço de email' name='email' id='email' className='w-1/2'  value={email} onChange={e => setEmail(e.target.value)}/>
            </div>


            {error && <p className=" text-md mt-4 text-center text-red-500 center bg-red-100 rounded">{errorMsg}</p>}

            <button id='btnSubmit' className='w-full mt-5 bg-black-principal hover:bg-blue-third  transition-all duration-300 text-white text-xl rounded p-2' onClick={handleSendForgotPassword}>Enviar email</button>
            <p className='text-end m-auto mt-5 text-black-secondary text-md hover:text-blue-secondary cursor-pointer flex items-center text-lg' onClick={handleSwitchToSignin}><FontAwesomeIcon icon={faCircleLeft} className='text-black-principal mr-2'/> Voltar</p>
        </div>

        
    </div>
    );
}

export default ForgotPasswordForm;