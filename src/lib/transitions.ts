export interface ITransition {
    enter: string;
    enterFrom: string;
    enterTo: string;
    leave: string;
    leaveFrom: string;
    leaveTo: string;
}

export const slideInLeft: ITransition = {
    enter: "transition ease-in-out duration-300 transform",
    enterFrom: "translate-x-full",
    enterTo: "translate-x-0",
    leave: "transition ease-in-out duration-300 transform",
    leaveFrom: "translate-x-0",
    leaveTo: "translate-x-full"
};

export const slideInRight: ITransition = {
    enter: "transition ease-in-out duration-300 transform",
    enterFrom: "-translate-x-full",
    enterTo: "translate-x-0",
    leave: "transition ease-in-out duration-300 transform",
    leaveFrom: "translate-x-0",
    leaveTo: "-translate-x-full"
};

export const fadeInOut: ITransition = {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0"
};

export const fadeScaleInOut: ITransition = {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95"
};
