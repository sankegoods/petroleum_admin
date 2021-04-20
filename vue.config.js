module.exports = {

    configureWebpack: {

        // other webpack options to merge in ...

    },

    // devServer Options don't belong into `configureWebpack`

    devServer: {

        public: '127.0.0.1:8080',

        hot: true,

        disableHostCheck: true,
        // port: 5050

    }



};