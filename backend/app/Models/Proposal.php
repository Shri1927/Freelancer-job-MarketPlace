<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'freelancer_id',
        'cover_letter',
        'bid_amount',
        'delivery_time',
        'status',
    ];

    public function job()
{
    return $this->belongsTo(Job::class, 'job_id');
}

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }
    public function project()
{
    return $this->hasOne(Project::class);
}
}
