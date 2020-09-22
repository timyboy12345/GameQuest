<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $fillable = [
        'id',
        'type',
        'creator_id',
        'data',
        'players',
        'state',
        'code'
    ];

    protected $casts = [
        'data' => 'object',
        'players' => 'array'
    ];
}
