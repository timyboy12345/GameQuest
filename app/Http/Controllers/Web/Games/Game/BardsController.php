<?php

namespace App\Http\Controllers\Web\Games\Game;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Web\Games\GameController;
use Illuminate\Http\Request;

class BardsController extends GameController
{
    protected function info()
    {
        return view('games.bards.info');
    }

    protected function controller()
    {
        return view('games.bards.controller');
    }

    protected function player()
    {
        return view('games.bards.player');
    }
}
