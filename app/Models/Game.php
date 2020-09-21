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
        'state',
        'code'
    ];

    protected $casts = [
        'data' => 'json'
    ];
}
