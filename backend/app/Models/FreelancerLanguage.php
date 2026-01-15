<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreelancerLanguage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'language_name',
        'proficiency',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
