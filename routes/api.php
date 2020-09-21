<?php

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('games')->group(function () {
        Route::get('', function() {
            $games = Auth::user()->games()->paginate();
            return response()->json($games);
        });

        Route::get('game/{game_id}', function($game_id) {
            $game = Game::findOrFail($game_id);
            return response()->json($game);
        });
    });
});
