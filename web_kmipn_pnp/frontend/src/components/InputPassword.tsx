'use client'

import { faEye, faEyeSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function InputPassword({ value, onChange, className }:
    { value: string | number | readonly string[], onChange: React.ChangeEventHandler<HTMLInputElement>, className?: string }) {
    const [inputType, setInputType] = useState<"password" | "text">('password')
    let icon: IconDefinition = inputType === "password" ? faEye : faEyeSlash;
    const handleChangeType = () => {
        setInputType((prev) => (prev === "password" ? "text" : "password"))
    }
    return (
        <div className="form-control relative">
            <input
                required
                name="password"
                value={value}
                placeholder="********"
                type={inputType}
                onChange={onChange}
                className={`input max-w-full pe-10 ${className}`} />
            <FontAwesomeIcon icon={icon} className="absolute cursor-pointer top-3 right-5" onClick={handleChangeType} />
        </div>
    );
}