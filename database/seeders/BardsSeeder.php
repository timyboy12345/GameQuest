<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Seeder;

class BardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)->create()->each(function ($user) {
            Game::factory(5)->create([
                'creator_id' => $user->id,
                'type' => 'bards',
                'state' => 'queue'
            ]);
        });
    }
}
