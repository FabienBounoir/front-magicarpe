import React from "react";

export const Input = ({placeholder, value, onChange, error, type = undefined}) => {
    return (
        <div className="input">
            <input className="input__value" type={type ? type : "text"} value={value} onChange={({currentTarget}) => onChange(currentTarget.value)} placeholder={placeholder}/>
            <label className="input__placeholder">{error}</label>
        </div>
    )
}