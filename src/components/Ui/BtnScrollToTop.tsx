import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


function BtnScrollToTop(){
    
    const [showButton, setShowButton] = useState(false);

    const checkScrollTop = () => {
      if (!showButton && window.pageYOffset > 1200) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 1200) {
        setShowButton(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
      return () => {
        window.removeEventListener('scroll', checkScrollTop);
      };
    }, [showButton]);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return(
        <div id='btnUp' onClick={scrollToTop} className={`p-4 bg-blue-principal fixed right-6 z-50  shadow-lg flex justify-center items-center rounded-lg hover:bg-blue-secondary cursor-pointer duration-300 transition-all  ${showButton ? 'bottom-6' : '-bottom-16'}`}>
        <FontAwesomeIcon icon={faChevronUp} size='xl' className='text-white'/>
      </div>
    );
}

export default BtnScrollToTop;