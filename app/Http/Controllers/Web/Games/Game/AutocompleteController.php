<?php

namespace App\Http\Controllers\Web\Games\Game;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Web\Games\GameController;
use Illuminate\Http\Request;

class AutocompleteController extends GameController
{
    protected function info()
    {
        return view('games/autocomplete/info');
    }

    protected function controller()
    {
        return view('games/autocomplete/controller');
    }

    protected function player()
    {
        return view('games/autocomplete/player');
    }
}
