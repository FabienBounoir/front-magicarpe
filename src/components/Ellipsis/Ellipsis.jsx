import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

import { Icons } from "../Icons/Icons";

export const Ellipsis = ({ color }) => {
    const [isVisible, setIsVisible] = useState(false);
    const defaultColor = "#000000";
    const options = [
        {
            color: color,
            label: "Modifier",
            action: () => {console.log(document)}
        },
        {
            color: "#F04B4B",
            label: "Supprimer",
            action: () => {},
            icon: "bin"
        }
    ]

    return (
        <div className="ellipsis" onClick={() => setIsVisible(!isVisible)} >
            <Icons className="ellipsis__button" icon="settings" style={{ fill: "white", background: color, height: "1.5em", width: "1.5em", padding: ".3em", borderRadius: "50%" }} />
            <AnimatePresence>
                {isVisible &&
                    <motion.div 
                        initial={{ height: 0}} 
                        animate={{ height: "max-content" }} 
                        exit={{ height: 0 }} 
                        className="ellipsis__container"
                        ref={ref => {
                            if(ref) {
                                const { x, width } = ref.getBoundingClientRect();
                                if(x < 0) {
                                    ref.style.left = Math.abs(x) + "px";
                                    ref.style.textAlign = "left";
                                } else if(x + width > window.innerWidth) {
                                    ref.style.left = (window.innerWidth - (x + width)) + "px"
                                    ref.style.textAlign = "right";
                                } else {
                                    ref.style.left = "50%";
                                    ref.style.textAlign = "left";
                                }
                            }
                        }} 
                    >
                        <ul className="ellipsis__menu">
                            {options.map((option, index) => (
                                <motion.li
                                    className="ellipsis__option" 
                                    style={ option.color && {
                                        fill: option.color,
                                        backgroundColor: "transparent",
                                        color: option.color
                                    }}
                                    key={index}
                                    onClick={() => {
                                        option.action({...option, index});
                                        setIsVisible(false);
                                    }}
                                    >
                                    <div style={{ backgroundColor: option.color || defaultColor}} className="ellipsis__hover" />
                                    <p className="ellipsis__label">{option.label}</p>
                                    {option.icon 
                                        ? <Icons className="ellipsis__icon" icon={option.icon} />
                                        : <div className="ellipsis__icon"></div>}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                }
                </AnimatePresence>
        </div>
    );
}