<?php

namespace App\Http\Controllers\Web\Games;

use App\Http\Controllers\Controller;
use App\Models\Game;

class GamesController extends Controller
{
    public function games()
    {
        return view('games.games');
    }

    public function join($game_id)
    {
        if (strlen($game_id) == 36) {
            $game = Game::findOrFail($game_id);
        } else {
            $game = Game::where('code', $game_id)->firstOrFail();
        }

        switch ($game->type) {
            case "autocomplete":
                return redirect(route('games.autocomplete.player', ['gameId' => $game->id]));
                break;
            default:
                break;
        }
    }
}
