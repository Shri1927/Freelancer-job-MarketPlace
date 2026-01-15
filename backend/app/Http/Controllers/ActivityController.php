<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    public function index()
    {
        return response()->json(
            Activity::where('user_id', Auth::id())
                ->latest()
                ->limit(20)
                ->get()
        );
    }
}
