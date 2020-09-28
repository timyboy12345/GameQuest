<?php

use App\Http\Controllers\Web\Auth\LoginController;
use App\Http\Controllers\Web\Auth\LogoutController;
use App\Http\Controllers\Web\Auth\RegisterController;
use App\Http\Controllers\Web\Games\Game\AutocompleteController;
use App\Http\Controllers\Web\Games\GamesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('join/{game_id}', [GamesController::class, 'join'])->name('games.join');

Route::prefix('games')->name('games.')->group(function () {
    Route::get('', [GamesController::class, 'games'])->name('games');

    Route::name('autocomplete.')->middleware('auth')->prefix('autocomplete')->group(function () {
        Route::get('', [AutocompleteController::class, 'info'])->name('info');
        Route::get('controller', [AutocompleteController::class, 'controller'])->name('controller');
        Route::get('player', [AutocompleteController::class, 'player'])->name('player');
    });
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'login'])->name('login');
    Route::post('login', [LoginController::class, 'loginPost']);

    Route::get('register', [RegisterController::class, 'register'])->name('register');
    Route::post('register', [RegisterController::class, 'registerPost']);
});

Route::middleware('auth')->prefix('settings')->namespace('Settings')->name('settings.')->group(function () {
    Route::get('', [\App\Http\Controllers\Web\Settings\SettingsController::class, 'settings'])->name('settings');
});

Route::get('logout', [LogoutController::class, 'logout'])->middleware('auth')->name('logout');
