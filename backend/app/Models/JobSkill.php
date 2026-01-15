<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobSkill extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'skill'
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
