import React, { FC, useState } from "react";

import { Toggle } from "./Toggle";

export default {
    title: "Example/Toggle",
    component: Toggle
};

export const Default: FC<{}> = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <div>
            <Toggle
                active={isActive}
                onChange={() => {
                    setIsActive(!isActive);
                }}
            />
        </div>
    );
};
