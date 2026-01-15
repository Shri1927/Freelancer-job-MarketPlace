<?php

namespace App\Http\Controllers;

use App\Models\FreelancerExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerExperienceController extends Controller
{
    // Add new experience
    public function store(Request $request)
    {
        $request->validate([
            'title'             => 'required|string',
            'company'           => 'required|string',
            'location'          => 'nullable|string',
            'start_date'        => 'required|date',
            'end_date'          => 'nullable|date',
            'currently_working' => 'boolean',
            'description'       => 'nullable|string',
        ]);

        $exp = FreelancerExperience::create([
            'user_id'           => Auth::id(),
            'title'             => $request->title,
            'company'           => $request->company,
            'location'          => $request->location,
            'start_date'        => $request->start_date,
            'end_date'          => $request->end_date,
            'currently_working' => $request->currently_working ?? false,
            'description'       => $request->description,
        ]);

        return response()->json(['experience' => $exp]);
    }

    // Delete experience
    public function destroy($id)
    {
        $exp = FreelancerExperience::where('user_id', Auth::id())->findOrFail($id);
        $exp->delete();

        return response()->json(['message' => 'Experience removed successfully']);
    }
}
