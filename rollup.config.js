import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
    input: "./src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript(),
        postcss({
            config: {
                path: "./postcss.config.js"
            },
            extensions: [".css"],
            minimize: true,
            inject: {
                insertAt: "top"
            }
        })
    ],
    external: ["react", "react-dom"]
};
