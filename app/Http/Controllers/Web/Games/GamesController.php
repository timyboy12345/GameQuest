<?php

namespace App\Http\Controllers\Web\Games;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function games() {
        return view('games.games');
    }
}
