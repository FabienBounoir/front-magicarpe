import React from "react";

export const Input = ({placeholder, value, onChange, type = undefined}) => {
    return (
        <div className="input">
            <input className="input__value" type={type ? type : "text"} value={value} onChange={({currentTarget}) => onChange(currentTarget.value)} />
            <label className="input__placeholder">{placeholder}</label>
        </div>
    )
}