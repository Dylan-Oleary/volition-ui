import React, { useState } from "react";
import { Story } from "@storybook/react";

import { IRangeSliderProps, RangeSlider } from "./RangeSlider";

export default {
    title: "Inputs/RangeSlider",
    component: RangeSlider,
    argTypes: {
        minRange: {
            description: `The minimum range value for the slider.  
            If passed, the value must be less than the \`maxRange\` prop
            `
        },
        onChange: {
            type: { required: true }
        },
        value: {
            table: {
                disable: true
            }
        }
    }
};

export const Default: Story<IRangeSliderProps> = (args) => {
    const [value, setValue] = useState<number>(args.minRange);

    const updateValue: (newValue: number) => void = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className="pb-8">
            <RangeSlider
                maxRange={args.maxRange}
                minRange={args.minRange}
                onChange={updateValue}
                value={value}
                valueLabel={
                    <div>
                        {value} year{value === 1 ? "" : "s"}
                    </div>
                }
            />
        </div>
    );
};
Default.args = {
    maxRange: 100,
    minRange: 0,
    value: 50
};
