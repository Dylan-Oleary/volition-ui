import { forwardRef, MouseEvent, ReactNode } from "react";
import "../../styles.css";
import clsx from "clsx";

export interface IButtonProps {
    /**
     * Label of the button
     */
    children: ReactNode;
    /**
     * Additional classes added to the button
     */
    className?: string;
    /**
     * Color to be used for the button
     */
    color?: keyof typeof ButtonColors;
    /**
     * Is the button disabled?
     */
    disabled?: boolean;
    /**
     * Function called when button is clicked
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * The size of the button
     */
    size?: keyof typeof ButtonSizes;
    /**
     * The type of the button
     */
    type?: "button" | "submit";
}

enum ButtonSizes {
    "xs" = "px-2.5 py-1.5 text-xs rounded",
    "sm" = "px-3 py-2 text-sm rounded-md leading-4",
    "md" = "px-4 py-2 text-sm rounded-md",
    "lg" = "px-4 py-2 text-base rounded-md",
    "xl" = "px-6 py-3 text-base rounded-md"
}

enum ButtonColors {
    "primary" = "text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500"
}

const Button = forwardRef<any, IButtonProps>(
    (
        {
            children,
            className = "",
            color = "primary",
            disabled = false,
            onClick = () => {},
            size = "md",
            type = "button",
            ...props
        },
        ref
    ) => {
        const classes = clsx([
            className,
            "inline-flex items-center",
            "border border-transparent",
            "font-medium shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            ButtonSizes[size],
            ButtonColors[color]
        ]);

        return (
            <button
                ref={ref}
                onClick={onClick}
                className={classes}
                disabled={disabled}
                type={type}
                {...props}
            >
                {children}
            </button>
        );
    }
);

export default Button;
export { Button };
