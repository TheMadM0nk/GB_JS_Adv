const path = require('path');

module.exports = {
    mode: "development",
    entry: ['./public/js/SearchComponent.js', './public/js/CartComponent.js', './public/js/ProductComponent.js', './public/js/ErrorComponent.js', './public/js/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};