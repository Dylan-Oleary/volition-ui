import React, { FC } from "react";

interface IToggleProps {
    /**
     * Initial state of the tottle switch
     */
    active: boolean;
    /**
     * Function performed when switch is toggled
     */
    onChange: () => void;
}

const Toggle: FC<IToggleProps> = ({ active, onChange }) => {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative w-16 focus:ring  focus:outline-none h-8 rounded-full cursor-pointer ${
                active ? "bg-green-600" : "bg-gray-400"
            }`}
            tabIndex={1}
            aria-pressed={active}
        >
            <div
                className={`absolute w-6 h-6 bg-white rounded-full ease-in-out top-1 left-1 transform transisiton duration-300 ${
                    active ? "translate-x-8" : "translate-x-0"
                }`}
            ></div>
        </button>
    );
};

export default Toggle;
export { Toggle };
