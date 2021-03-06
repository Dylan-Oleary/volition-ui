import React, { FC, ReactNode, useRef } from "react";
import PropTypes from "prop-types";

interface IRangeSliderProps {
    /**
     * The label used for the slider control button
     */
    buttonLabel?: ReactNode | string;
    /**
     * The maximum range value for the slider
     */
    maxRange?: number;
    /**
     * The minimum range value for the slider
     */
    minRange?: number;
    /**
     * A change handler that is passed the updated value
     */
    onChange: (value: number) => void;
    /**
     * The current value
     */
    value: number;
    /**
     * The label used to display the value or any other header information
     */
    valueLabel?: ReactNode | string;
}

const RangeSlider: FC<IRangeSliderProps> = ({
    buttonLabel = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3 text-gray-300"
        >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
    ),
    maxRange = 100,
    minRange = 0,
    onChange = () => null,
    value = 0,
    valueLabel = null
}) => {
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const fillBarPercentage = Math.floor(
        ((value - minRange) / (maxRange - minRange)) * 100
    );

    /**
     * Updates the current value input value
     *
     * @param mouseXValue The x-axis value of the captured mouse action
     */
    const updateValue: (event: React.MouseEvent | MouseEvent) => void = (
        event
    ) => {
        const mouseXValue =
            event.clientX - sliderWrapperRef.current.getBoundingClientRect().x;
        const newFillBarPercentage = Math.floor(
            (mouseXValue / sliderWrapperRef.current.offsetWidth) * 100
        );

        if (
            Math.floor(newFillBarPercentage) > -1 &&
            Math.floor(newFillBarPercentage) < 101
        ) {
            onChange(convertPercentageToValue(newFillBarPercentage));
        }
    };

    /**
     * Initializes the slider
     *
     * @param event The mouse event
     */
    const initSlider: (event: React.MouseEvent | MouseEvent) => void = (
        event
    ) => {
        updateValue(event);

        document.addEventListener("mousemove", handleSliderDrag);
        document.addEventListener("mouseup", releaseSlider);
    };

    /**
     * Handles the dragging of the slider
     *
     * @param event The mouse event
     */
    const handleSliderDrag: (event: React.MouseEvent | MouseEvent) => void = (
        event
    ) => {
        updateValue(event);
    };

    /**
     * Removes the `mousemove` event listener
     */
    const releaseSlider = () => {
        document.removeEventListener("mousemove", handleSliderDrag);
    };

    /**
     * Converts a percentage value to its realized value
     *
     * @param percentage The percentage to convert
     */
    const convertPercentageToValue: (percentage: number) => number = (
        percentage
    ) => {
        return Math.floor(
            (percentage / 100) * (maxRange - minRange) + minRange
        );
    };

    return (
        <div className="w-full">
            {valueLabel && <div className="mb-4">{valueLabel}</div>}
            <div
                className="h-full rounded-lg cursor-pointer"
                onMouseDown={initSlider}
            >
                <div
                    className="flex items-center h-1 bg-gray-200 rounded-full"
                    ref={sliderWrapperRef}
                >
                    <div
                        className="flex items-center justify-end h-full bg-blue-800 rounded-full"
                        style={{
                            width: `${fillBarPercentage}%`
                        }}
                    ></div>
                    <div className="right-0 z-10 flex items-center justify-center w-6 h-6 -ml-2 overflow-hidden text-xs bg-white rounded-full shadow-lg cursor-move">
                        {buttonLabel}
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-1">
                <IntervalMark label={minRange} className="items-start" />
                <IntervalMark label={maxRange} className="items-end" />
            </div>
        </div>
    );
};

const IntervalMark = ({ className, label }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="w-0.5 h-1 bg-gray-200"></div>
            <div className="text-gray-600">{label}</div>
        </div>
    );
};

RangeSlider.propTypes = {
    maxRange: PropTypes.number,
    minRange: ({ maxRange, minRange }, propName, componentName) => {
        if (typeof minRange !== "number") {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Expected a number, but received a ${typeof minRange}`
            );
        } else if (minRange >= maxRange) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. ${propName} must be less than maxRange: ${maxRange}`
            );
        }
    },
    onChange: PropTypes.func.isRequired,
    value: ({ maxRange, minRange, value }, propName, componentName) => {
        if (!value) {
            return new Error(`Missing prop ${propName} is required`);
        } else if (typeof value !== "number") {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. Expected a number, but received a ${typeof value}`
            );
        } else if (value > maxRange || value < minRange) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}. ${propName} must be less than or equal to maxRange: ${maxRange} and greater than or equal to minRange: ${minRange}`
            );
        }
    }
};

export default RangeSlider;
export { IRangeSliderProps, RangeSlider };
