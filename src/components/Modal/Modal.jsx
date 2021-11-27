import React from "react";

export const Modal = ({children, setIsVisible}) => {

    const handleClick = (e) => {
        if(e.currentTarget === e.target) setIsVisible(false)
    }

    return (
        <div className="modal" onClick={handleClick}>
            <div className="modal__content">
                {children}
            </div>
        </div>
    );
}