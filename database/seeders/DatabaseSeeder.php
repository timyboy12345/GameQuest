<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(5)->create()->each(function ($user) {
            Game::factory(2)->create([
                'creator_id' => $user->id
            ]);
        });

        User::factory()->create([
            'email' => 'help@gamequest.nl'
        ])->each(function ($user) {
            Game::factory(5)->create([
                'creator_id' => $user->id
            ]);
        });
    }
}
