import React from "react";
import { icons } from "./listIcons";

const defaultIcon = {
    viewBox: "-72 0 480 480",
    d: [
        "m100.6875 0-100.6875 100.6875v379.3125h336v-480zm-4.6875 27.3125v68.6875h-68.6875zm224 436.6875h-304v-352h96v-96h208zm0 0",
        "m126.625 190.054688-22.625 22.632812-22.625-22.632812-11.3125 11.3125 22.625 22.632812-22.625 22.632812 11.3125 11.3125 22.625-22.632812 22.625 22.632812 11.3125-11.3125-22.625-22.632812 22.625-22.632812zm0 0",
        "m201.375 257.945312 22.625-22.632812 22.625 22.632812 11.3125-11.3125-22.625-22.632812 22.625-22.632812-11.3125-11.3125-22.625 22.632812-22.625-22.632812-11.3125 11.3125 22.625 22.632812-22.625 22.632812zm0 0",
        "m98.34375 330.34375 11.3125 11.3125 7.433594-7.433594c28.136718-28.0625 73.683594-28.0625 101.820312 0l7.433594 7.433594 11.3125-11.3125-7.433594-7.433594c-34.386718-34.308594-90.058594-34.308594-124.445312 0zm0 0",
    ]
};

/**
 * Composent Icon
 * 
 * @component
 * @param {{
 *  icon: keyof icons
 * }} props Propriétés de l'Icon
 * 
 * @example
 * <Icon icon="plus" width="1em" />
 */
export const Icons = ({ icon, ...props }) => {
    const displayIcon = (icon) => {
        const display = icons[icon] || defaultIcon;

        return display.d.map((d, i) => <path key={i} d={d} />);
    };

    return (
        <svg
            width="2em"
            viewBox={icons[icon] ? icons[icon].viewBox : defaultIcon.viewBox}
            style={{
                cursor: props.onClick ? "pointer" : "initial",
            }}
            {...props}
        >
            {displayIcon(icon)}
        </svg>
    );
};