<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreelancerExperience extends Model
{
    use HasFactory;
    protected $table = 'freelancer_experiences';

    protected $fillable = [
         'user_id',
        'title',
        'company',
        'location',
        'start_date',
        'end_date',
        'currently_working',
        'description',
    ];

    protected $casts = [
        'currently_working' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
