<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerSkillController extends Controller
{
    public function addSkill(Request $request)
    {
        $request->validate([
            'skill_id' => 'required|exists:skills,id'
        ]);

        $user = Auth::user();
        $user->skills()->syncWithoutDetaching([$request->skill_id]);

        return response()->json(['message' => 'Skill added successfully']);
    }

    public function removeSkill($skill_id)
    {
        $user = Auth::user();
        $user->skills()->detach($skill_id);

        return response()->json(['message' => 'Skill removed successfully']);
    }
}
