<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * CLIENT → ACTIVITY TIMELINE
     */
    public function index()
    {
        $activities = Activity::where('user_id', Auth::id())
            ->latest()
            ->limit(50)
            ->get();

        return response()->json($activities);
    }
}
