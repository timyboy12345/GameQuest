<?php

namespace App\Http\Controllers\Web\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function settings() {
        $games = Auth::user()->games()->orderBy('created_at')->take(10)->get();
        $playedGames = null;

        return view('settings.settings', compact(['games']));
    }
}
