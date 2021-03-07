import React, { FC } from "react";
import { ClassNames } from "@44north/classnames";

interface IToggleProps {
    /**
     * Initial state of the tottle switch
     */
    active: boolean;
    /**
     * Whether the switch can be toggled
     */
    disabled?: boolean;
    /**
     * Function performed when switch is toggled
     */
    onChange: () => void;
}

const Toggle: FC<IToggleProps> = ({ active, disabled = false, onChange }) => {
    const handleClick = () => {
        if (!disabled) onChange();
    };

    const bgClasses = new ClassNames([
        "flex",
        "items-center",
        "w-14",
        "focus:ring",
        "focus:outline-none",
        "h-8",
        "p-1",
        "rounded-full ",
        "ease-in-out",
        "transform",
        "transisiton",
        "duration-300",
        "cursor-pointer "
    ]);
    const switchClasses = new ClassNames([
        "w-6",
        "h-6",
        "rounded-full",
        "ease-in-out",
        "transform",
        "transisiton",
        "duration-300"
    ]);

    if (disabled) {
        bgClasses.add("bg-gray-100 border");
        switchClasses.add("bg-gray-300 ");
        if (active) {
            bgClasses.add("border-gray-100");
        } else {
            bgClasses.add("border-gray-300");
        }
    } else {
        switchClasses.add("bg-white");
        if (active) {
            bgClasses.add("bg-primary");
        } else {
            bgClasses.add("bg-gray-300");
        }
    }

    if (active) {
        switchClasses.add("translate-x-full");
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={bgClasses.list()}
            aria-pressed={active}
        >
            <div className={switchClasses.list()}></div>
        </button>
    );
};

export default Toggle;
export { Toggle };
