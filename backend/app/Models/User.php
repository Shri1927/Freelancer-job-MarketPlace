<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationships
    public function clientProfile()
    {
        return $this->hasOne(ClientProfile::class);
    }

    public function freelancerProfile()
    {
        return $this->hasOne(FreelancerProfile::class);
    }

    public function languages()
    {
        return $this->hasMany(FreelancerLanguage::class);
    }

    public function experiences()
    {
        return $this->hasMany(FreelancerExperience::class);
    }

    public function educations()
    {
        return $this->hasMany(FreelancerEducation::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'freelancer_skills');
    }
    public function proposals()
{
    return $this->hasMany(Proposal::class, 'freelancer_id');
}

}
