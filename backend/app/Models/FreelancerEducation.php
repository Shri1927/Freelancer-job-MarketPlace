<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreelancerEducation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'school',
        'degree',
        'field_of_study',
        'start_year',
        'end_year',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
