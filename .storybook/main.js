const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
        }
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.css$/,
            loader: "postcss-loader",
            options: {
                sourceMap: false,
                postcssOptions: {
                    config: path.resolve(__dirname, "../postcss.config.js")
                }
            }
        });

        return config;
    }
};
