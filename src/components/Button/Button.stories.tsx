import React from "react";

import { Button, IButtonProps } from "./Button";

export default {
    title: "Component/Button",
    component: Button,
    args: {
        children: <>Button</>
    }
};

const Template = (args: IButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.storyName = "Default";
