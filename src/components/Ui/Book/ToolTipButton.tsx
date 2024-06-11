import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ToolTipButtonProps {
    dataTip: string;
    icon: IconDefinition;
    text?: string;
    onClick?: () => void; 
}

const ToolTipButton: React.FC<ToolTipButtonProps> = ({ dataTip, icon, text, onClick  }) => {
    return (
        <button className="shadow-xl rounded-sm bg-white p-2 flex-auto border border-gray-100 hover:-translate-y-1 duration-300
                            relative
                            before:content-[attr(data-tip)]
                            before:absolute
                            before:px-3 before:py-1
                            before:left-1/2 before:bottom-4
                            before:w-max before:max-w-xs
                            before:-translate-x-1/2 before:-translate-y-full
                            before:bg-black before:text-white
                            before:rounded-md before:opacity-0
                            before:transition-all hover:before:opacity-100
                            after:content-['']
                            after:absolute
                            after:left-1/2
                            after:bottom-8
                            after:border-8
                            after:border-transparent
                            after:border-t-black
                            after:-translate-x-1/2
                            after:opacity-0
                            after:transition-all hover:after:opacity-100"
                            
              data-tip={dataTip}
              onClick={onClick}
              >
                
            <FontAwesomeIcon icon={icon} size="lg" />
            {text}
        </button>
    );
};

export default ToolTipButton;
