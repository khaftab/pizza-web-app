module.exports = {
    // plugins: ['postcss-preset-env']
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano')
    ]
}