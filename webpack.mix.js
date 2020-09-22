const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.disableSuccessNotifications();

mix
    .js('resources/js/app.js', 'public/js')
    .ts('resources/js/games/autocomplete/controller/controller.ts', 'public/js/games/autocomplete/controller.js')
    .ts('resources/js/games/autocomplete/player/player.ts', 'public/js/games/autocomplete/player.js')
    .sourceMaps(false, 'inline-source-map')
    .sass('resources/sass/main.scss', 'public/css')
    .sass('resources/sass/games/autocomplete.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    });

if (mix.inProduction()) {
    mix.version();
}
