import { useEffect, useState } from "react";

interface IWindowDimensions {
    width: number;
    height: number;
}

const useWindowSize: () => IWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions>(
        {
            height: window?.innerHeight || null,
            width: window?.innerWidth || null
        }
    );

    /**
     * Handles re-sizing of the window and sets the new window dimensions
     */
    const handleWindowResize: () => void = () => {
        const height = window.innerHeight;
        const width = window.innerWidth;

        setWindowDimensions({ height, width });
    };

    useEffect(() => {
        if (window) {
            window.addEventListener("resize", handleWindowResize);
        }

        return () => window?.removeEventListener("resize", handleWindowResize);
    }, []);

    return windowDimensions;
};

export default useWindowSize;
export { useWindowSize };
