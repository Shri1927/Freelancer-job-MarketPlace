<?php

namespace App\Helpers;

use App\Models\Activity;

class ActivityLogger
{
    public static function log($userId, $type, $title, $description = null, $subject = null)
    {
        Activity::create([
            'user_id'      => $userId,
            'type'         => $type,
            'title'        => $title,
            'description'  => $description,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id'   => $subject->id ?? null,
        ]);
    }
}
