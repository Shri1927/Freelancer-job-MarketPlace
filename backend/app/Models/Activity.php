<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'description',
        'subject_type',
        'subject_id'
    ];

    public function subject()
    {
        return $this->morphTo();
    }
}
