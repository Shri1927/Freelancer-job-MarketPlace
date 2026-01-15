<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreelancerProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    'goal',
    'experience_level',
    'work_preference',
    'open_to_contract',
    'work_style',
    'professional_title',
    'bio',
    'hourly_rate',
    'service_fee',
    'earnings_after_fee',
    'date_of_birth',
    'country',
    'street_address',
    'city',
    'state',
    'postal_code',
    'phone'
    ];

    protected $casts = [
        'open_to_contract' => 'boolean',
        'hourly_rate'      => 'decimal:2',
        'service_fee'      => 'decimal:2',
        'earnings_after_fee' => 'decimal:2',
        'date_of_birth' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skills::class, 'freelancer_skills');
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
}
