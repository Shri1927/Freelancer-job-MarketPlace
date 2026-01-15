<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'client_id',
        'freelancer_id',
        'amount',
        'currency',
        'status',
        'payment_method',
        'transaction_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
