<?php

namespace App\Http\Controllers\Web\Games;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class GameController extends Controller
{
    abstract protected function info();
    abstract protected function controller();
    abstract protected function player();
}
