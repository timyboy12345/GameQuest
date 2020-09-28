<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Game::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => $this->faker->uuid,
            'type' => $this->faker->randomElement(['autocomplete']),
            'state' => $this->faker->randomElement(['queue', 'playing', 'finished']),
            'code' => $this->faker->asciify("******")
        ];
    }
}
