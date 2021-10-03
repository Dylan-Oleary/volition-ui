const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{ts|tsx}"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                secondary: colors.fuchsia
            }
        }
    },
    variants: {
        extend: {}
    }
};
