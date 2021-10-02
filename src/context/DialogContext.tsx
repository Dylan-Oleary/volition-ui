import React, {
    Component,
    createContext,
    Fragment,
    MutableRefObject,
    ReactNode,
    useContext
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { fadeInOut, fadeScaleInOut, slideInLeft } from "../lib/transitions";

type DialogType = "flyout" | "modal";

interface IDialogOptions {
    /**
     * Called before the dialog closes. Return false to prevent closing
     */
    beforeClose?: () => Promise<boolean>;
    /**
     * A ref to an element that should receive focus first
     */
    initialFocus?: MutableRefObject<HTMLElement>;
    /**
     * Called when the dialog is closed
     */
    onClose?: () => void;
}

export interface IDialogConfig {
    /**
     * Content of the dialog
     */
    content: ReactNode;
    /**
     * Display the dialog
     */
    isOpen: boolean;
    /**
     * Dialog options
     */
    options: IDialogOptions;
    /**
     * Type of dialog to display
     */
    type: DialogType;
}

interface IDialogState {
    /**
     * Array of current dialogs
     */
    dialogs: IDialogConfig[];
}

interface IDialogContext {
    dialogs: IDialogConfig[];
    openDialog: (
        type: DialogType,
        content: ReactNode,
        options: IDialogOptions
    ) => void;
    closeDialog: (index?: number) => Promise<boolean>;
}

const DialogContext = createContext<IDialogContext>({
    dialogs: [],
    openDialog: () => {},
    closeDialog: async () => true
});

class DialogProvider extends Component {
    _closeToIndex: number = -1;
    _currentIndex: number = -1;

    updateDialogs = async (dialogs: IDialogConfig[]) => {
        return new Promise((resolve) => {
            this.setState({ dialogs }, () => {
                resolve(undefined);
            });
        });
    };

    openDialog = async (
        type: DialogType,
        content: ReactNode,
        options: IDialogOptions = {}
    ) => {
        await this.updateDialogs([
            ...this.state.dialogs,
            {
                content,
                isOpen: true,
                options,
                type
            }
        ]);

        this._currentIndex = this.state.dialogs.length - 1;
    };

    closeDialog = async (index: number = this.state.dialogs.length - 1) => {
        const thisDialog = this.state.dialogs[index];

        if (!thisDialog) {
            return false;
        }

        if (thisDialog.options.beforeClose) {
            const shouldClose = await thisDialog.options.beforeClose();

            if (!shouldClose) {
                this._closeToIndex = -1;

                return false;
            }
        }

        await this.updateDialogs([
            ...this.state.dialogs.slice(0, index),
            {
                ...thisDialog,
                isOpen: false
            }
        ]);

        this._currentIndex = this.state.dialogs.length - 1;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await this.updateDialogs([
                    ...this.state.dialogs.slice(0, index)
                ]);

                resolve(undefined);
            }, 200);
        });

        if (this._closeToIndex !== -1) {
            const prevIndex = index - 1;
            if (prevIndex > this._closeToIndex) {
                if (this.state.dialogs[prevIndex].isOpen) {
                    this.closeDialog(prevIndex);
                }
            } else if (this._closeToIndex === index) {
                this._closeToIndex = -1;
            }
        }

        if (thisDialog.options.onClose) {
            thisDialog.options.onClose();
        }

        return true;
    };

    closeToIndex = (index: number) => {
        this._closeToIndex = index;
    };

    renderDialog(index: number = 0) {
        const dialogs = this.state.dialogs;
        const thisDialog = dialogs[index];

        if (!thisDialog) {
            return null;
        }

        const { content, isOpen, options, type } = thisDialog;

        const total = dialogs.length - 1;
        const offset = total - index;

        const filteredDialogs = dialogs.filter(
            (dialog) => dialog.type === type
        );
        const filteredTotal = filteredDialogs.length - 1;
        const filteredIndex = filteredDialogs.indexOf(thisDialog);
        const filteredOffset = filteredTotal - filteredIndex;

        const offsetPx = 15;
        const offsetSyles =
            type === "flyout"
                ? {
                      right: `${filteredOffset * offsetPx}px`
                  }
                : {
                      marginLeft: `-${filteredOffset * offsetPx}px`,
                      marginTop: `${filteredOffset * offsetPx}px`
                  };

        return (
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    initialFocus={options.initialFocus}
                    className="relative z-10"
                    onClose={() => {
                        this.closeDialog();
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        {...(type === "modal" ? fadeScaleInOut : slideInLeft)}
                    >
                        <div
                            style={offsetSyles}
                            className={clsx(
                                "fixed bg-white z-20 shadow-xl transition-all",
                                {
                                    "inset-y-0 right-0": type === "flyout",
                                    "transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2":
                                        type === "modal"
                                }
                            )}
                        >
                            <div>{content}</div>

                            <Transition show={offset > 0} appear {...fadeInOut}>
                                <div
                                    style={{ opacity: 0.5 + offset * 0.05 }}
                                    className="absolute inset-0 transition duration-500 bg-gray-800 cursor-pointer hover:bg-opacity-50"
                                    onClick={() => {
                                        this.closeToIndex(index);
                                    }}
                                />
                            </Transition>
                        </div>
                    </Transition.Child>

                    {dialogs[index + 1] && this.renderDialog(index + 1)}

                    {/** Fixes focus trap error if no focusable elements inside <Dialog /> */}
                    <button
                        className="absolute w-0 h-0 opacity-0"
                        aria-hidden="true"
                        onClick={() => {
                            this.closeDialog();
                        }}
                    />
                </Dialog>
            </Transition>
        );
    }

    state: IDialogState = {
        dialogs: []
    };

    render() {
        return (
            <DialogContext.Provider
                value={{
                    dialogs: this.state.dialogs,
                    openDialog: this.openDialog,
                    closeDialog: this.closeDialog
                }}
            >
                {this.props.children}

                <Transition
                    show={this.state.dialogs[0]?.isOpen || false}
                    {...fadeInOut}
                    className="fixed inset-0 bg-gray-800 bg-opacity-50"
                />

                {this.renderDialog()}
            </DialogContext.Provider>
        );
    }
}

const useDialog = () => {
    const { openDialog, closeDialog } = useContext(DialogContext);

    return {
        openModal: (content: ReactNode, options: IDialogOptions = {}) =>
            openDialog("modal", content, options),
        closeModal: (index?: number) => closeDialog(index),
        openFlyout: (content: ReactNode, options: IDialogOptions = {}) =>
            openDialog("flyout", content, options),
        closeFlyout: (index?: number) => closeDialog(index)
    };
};

export default DialogContext;
export { DialogContext, DialogProvider, useDialog };
