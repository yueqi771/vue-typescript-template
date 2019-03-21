const path = require('path');
const webpack = require('webpack');
const config = {
	apiUrl: ''
}

module.exports = {
    publicPath: "/",
    outputDir: "output",
    runtimeCompiler: true,
    configureWebpack: {
		resolve: {
			alias: {
                '@components': path.resolve(__dirname, './src/components'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@views': path.resolve(__dirname, './src/views'),
                '@static': path.resolve(__dirname, './src/static'),
                '@interface': path.resolve(__dirname, './src/interface'),
			}
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.apiUrl': JSON.stringify(config.apiUrl),
            })
        ]
    },

    devServer: {
        port: 7007,
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:3000/",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
        },
	},
	lintOnSave: true,
}
