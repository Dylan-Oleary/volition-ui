const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
    purge: ["./src/components/**/*.tsx"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                success: "var(--color-success)",
                info: "var(--color-info)",
                warning: "var(--color-warning)",
                error: "var(--color-error)"
            }
        }
    },
    variants: {
        extend: {}
    }
};
