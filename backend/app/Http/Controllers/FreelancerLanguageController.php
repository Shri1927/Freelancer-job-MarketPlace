<?php

namespace App\Http\Controllers;

use App\Models\FreelancerLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerLanguageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'language_name' => 'required|string',
            'proficiency'   => 'required|string'
        ]);

        $lang = FreelancerLanguage::create([
            'user_id'        => Auth::id(),
            'language_name'  => $request->language_name,
            'proficiency'    => $request->proficiency
        ]);

        return response()->json(['language' => $lang]);
    }
}
