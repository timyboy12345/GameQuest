# GameQuest
GameQuest is an amazing real-time gaming platform that enables you to compete with your friends in fun, mobile-friendly games. It's based on Kahoot and Jackbox Games' Party Packs.  

## Tools used
This project runs on Laravel, with the real-time games using plain old Javascript (compiled from TypeScript with Laravel Mix).

- Laravel 8
- Typescript
- SCSS (Using Tailwind.css)
- PubNub for real-time communication between devices

## Installation
The games can be played locally by downloading this repo, and executing the following steps:
1. Copy the `.env.example` file to `.env` and fill in all the empty fields.
2. Run `composer i` to install all required composer packages
3. Run `npm i` to install all required NPM packages
4. Run `npm run prod` to build the CSS and JavaScript files
5. Run `php artisan serve` to serve the files, and you're ready to go!