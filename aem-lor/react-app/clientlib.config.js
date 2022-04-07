module.exports = {
    context: __dirname,

    clientlibRoot: "./../ui.apps/src/main/content/jcr_root/apps/lor/clientlibs",

    libs: {
        name: "react-app",
        allowProxy: true,
        categories: ["lor.react"],
        serializationFormat: "xml",
        jsProcessor: ["min:gcc"],
        assets: {
            js: [
                "build/static/**/*.js"
            ],
            css: [
                "build/static/**/*.css"
            ]
        }
    }
};