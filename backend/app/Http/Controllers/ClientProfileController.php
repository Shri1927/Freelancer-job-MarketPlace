<?php

namespace App\Http\Controllers;

use App\Models\ClientProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientProfileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string',
            'industry'     => 'required|string',
            'company_size' => 'required|string',
        ]);

        $profile = ClientProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'company_name' => $request->company_name,
                'industry'     => $request->industry,
                'company_size' => $request->company_size,
            ]
        );

        return response()->json([
            'message' => 'Client profile saved successfully',
            'profile' => $profile
        ]);
    }
}
