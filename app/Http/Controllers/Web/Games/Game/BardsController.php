<?php

namespace App\Http\Controllers\Web\Games\Game;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Web\Games\GameController;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BardsController extends GameController
{
    protected function info()
    {
        return view('games.bards.info');
    }

    protected function controller()
    {
        $game = new Game();

        $game->id = Str::uuid()->toString();
        $game->type = 'bards';
        $game->creator_id = Auth::id();
        $game->data = ['name' => 'Testspel'];
        $game->state = 'queue';
        $game->code = strtoupper(Str::random(5));

        $game->save();

        return response()->json($game, 201);
    }

    protected function player()
    {
        return view('games.bards.player');
    }
}
