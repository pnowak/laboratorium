module.exports = {
    entry: __dirname + '/index.js',
    output: {
        path: __dirname + '/dist', 
        filename: '/bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        // Nice colored output
        colors: true
    }
};