import { ComponentClass, FC } from "react";
import { DialogProvider, useDialog } from "./DialogContext";
import { Button } from "../components";

export default {
    title: "Context/Dialog",
    decorators: [
        (Story: ComponentClass) => (
            <DialogProvider>
                <div className="flex items-center justify-center">
                    <Story />
                </div>
            </DialogProvider>
        )
    ]
};

export const Modal = () => {
    const { openModal } = useDialog();

    return (
        <Button onClick={() => openModal("I'm in a modal")}>Open Modal</Button>
    );
};

export const Flyout = () => {
    const { openFlyout } = useDialog();

    return (
        <Button onClick={() => openFlyout("I'm in a flyout")}>
            Open Flyout
        </Button>
    );
};

export const Nested = () => {
    const { openFlyout, openModal } = useDialog();

    const content = (
        <div className="flex p-4 space-x-4 bg-white">
            <Button onClick={() => openFlyout(content)}>
                Open Nested Flyout
            </Button>
            <Button color="secondary" onClick={() => openModal(content)}>
                Open Nested Modal
            </Button>
        </div>
    );

    return <div>{content}</div>;
};

export const BeforeClose = () => {
    const { openModal } = useDialog();

    return (
        <Button
            onClick={() =>
                openModal("I will confirm before closing", {
                    beforeClose: async () => {
                        return confirm("Are you sure?");
                    }
                })
            }
        >
            Open Modal
        </Button>
    );
};

export const OnClose = () => {
    const { openModal } = useDialog();

    return (
        <Button
            onClick={() =>
                openModal("I will alert when closing", {
                    onClose: () => {
                        alert("Modal closed");
                    }
                })
            }
        >
            Open Modal
        </Button>
    );
};
