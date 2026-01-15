<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_id',
        'client_id',
        'freelancer_id',
        'proposal_id',
        'title',
        'description',
        'status',
        'progress',
        'amount',
        'deadline'
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function freelancer()
    {
        return $this->belongsTo(User::class, 'freelancer_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function files()
{
    return $this->hasMany(ProjectFile::class);
}

}
