<?php

namespace App\Http\Controllers\Api\Games\Bards;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class ControllerController extends Controller
{
    public function putQuestions($game_id, Request $request)
    {
        $game = Game::findOrFail($game_id);

        $request->validate([
            'questions' => 'required|array',
            'questions.*.question' => 'required|string',
            'questions.*.type' => 'required|string'
        ]);

        $data = $game->data;
        $data->questions = $request->post('questions');
        $game->update(['data' => $data]);

        return response()->json($game, 201);
    }
}
