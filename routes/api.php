<?php

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Nubs\RandomNameGenerator\All;

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
        Route::get('', function () {
            $games = Auth::user()->games()->paginate();
            return response()->json($games);
        });

        Route::get('game/{game_id}', function ($game_id) {
            $game = Game::findOrFail($game_id);
            return response()->json($game);
        });

        Route::post('game', function (Request $request) {
            $request->validate([
                'type' => 'required|string|in:autocomplete'
            ]);

            $game = new Game();
            $game->fill($request->only(['type']));
            $game->id = Str::uuid()->toString();
            $game->creator_id = $request->user()->id;
            $game->code = Str::random(6);

            $generator = All::create();
            $name = $generator->getName();
            $game->data = ['name' => $name];

            $game->save();

            return response()->json($game);
        });
    });
});
