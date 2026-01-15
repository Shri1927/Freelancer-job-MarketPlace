<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Conversation extends Model
{
    protected $fillable = [
        'project_id',
        'client_id',
        'freelancer_id'
    ];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
