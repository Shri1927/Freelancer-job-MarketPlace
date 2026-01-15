<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    protected $fillable = [
        'freelancer_id',
        'amount',
        'method',
        'fee',
        'status',
        'reference_id'
    ];

}
