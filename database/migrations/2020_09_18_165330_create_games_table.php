<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->uuid('creator_id');
            $table->string('state')->default('queue');
            $table->string('code', 10);

            $table->json('players')->default('[]');
            $table->json('data')->default('{}');

            $table->foreign('creator_id')->references('id')->on('users');

            $table->timestamps();
            $table->dateTime('started_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
