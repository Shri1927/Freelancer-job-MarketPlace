<?php

namespace App\Http\Controllers;

use App\Models\FreelancerEducation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerEducationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'school'          => 'required|string',
            'degree'          => 'nullable|string',
            'field_of_study'  => 'nullable|string',
            'start_year'      => 'nullable|integer',
            'end_year'        => 'nullable|integer',
            'description'     => 'nullable|string',
        ]);

        $data['user_id'] = Auth::id();

        $edu = FreelancerEducation::create($data);

        return response()->json([
            'message' => 'Education added successfully',
            'education' => $edu
        ], 201);
    }

    public function destroy($id)
    {
        $edu = FreelancerEducation::where('user_id', Auth::id())
            ->findOrFail($id);

        $edu->delete();

        return response()->json(['message' => 'Education deleted']);
    }
}
