<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    // table name changed to avoid conflict with Laravel queue 'jobs' table
    protected $table = 'job_posts';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'budget',
        'duration',
        'category',
        'experience_level',
        'status',
    ];

    public function skills()
    {
        return $this->hasMany(JobSkill::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function proposals()  
    {
        return $this->hasMany(Proposal::class, 'job_id');
    }

}
