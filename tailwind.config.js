const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/components/**/*.tsx"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: colors.blue
            }
        }
    },
    variants: {
        extend: {}
    }
};
