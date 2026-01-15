<?php

namespace App\Http\Controllers;

use App\Models\FreelancerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerProfileController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->validate([
            'goal'              => 'nullable|string',
            'experience_level'  => 'nullable|string',
            'work_preference'   => 'nullable|string',
            'open_to_contract'  => 'nullable|boolean',
            'work_style'        => 'nullable|string',
            'professional_title'=> 'nullable|string',
            'bio'               => 'nullable|string',
            'hourly_rate'       => 'nullable|numeric',
            'service_fee'       => 'nullable|numeric',
            'earnings_after_fee'=> 'nullable|numeric',
            'date_of_birth'     => 'nullable|date',
            'country'           => 'nullable|string',
            'street_address'    => 'nullable|string',
            'city'              => 'nullable|string',
            'state'             => 'nullable|string',
            'postal_code'       => 'nullable|string',
            'phone'             => 'nullable|string',
        ]);

        $profile = FreelancerProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            $data
        );

        return response()->json([
            'message' => 'Freelancer profile updated',
            'profile' => $profile
        ]);
    }
}
