function loader(sorce) {
    console.log(sorce);
    return {
        postcssPlugin: "postcss-pxtorem",
        Once(css) {
            console.log(css);
        },
    };
}
export default loader
