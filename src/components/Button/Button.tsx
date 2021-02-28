import React, { FC } from "react";
import "../../styles.css";

interface IButtonProps {
    type?: "submit" | "button";
}

const Button: FC<IButtonProps> = ({ children = "Button", type = "button" }) => {
    return (
        <button type={type} className="p-4 bg-blue-500">
            {children}
        </button>
    );
};

export default Button;
export { Button };
