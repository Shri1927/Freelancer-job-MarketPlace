<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\ClientProfile;
use App\Models\UserSetting;

class ClientSettingsController extends Controller
{
    /**
     * GET CLIENT PROFILE + SETTINGS
     */
    public function show()
    {
        $user = Auth::user();

        $profile = ClientProfile::where('user_id', $user->id)->first();
        $settings = UserSetting::firstOrCreate(['user_id' => $user->id]);

        return response()->json([
            'user' => $user,
            'profile' => $profile,
            'settings' => $settings
        ]);
    }

    /**
     * UPDATE PROFILE
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name'         => 'required|string',
            'company_name' => 'required|string',
            'industry'     => 'nullable|string',
            'company_size' => 'nullable|string',
            'phone'        => 'nullable|string',
            'address'      => 'nullable|string',
            'city'         => 'nullable|string',
            'state'        => 'nullable|string',
            'country'      => 'nullable|string',
        ]);

        $user = Auth::user();
        $user->update(['name' => $request->name]);

        ClientProfile::updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'company_name',
                'industry',
                'company_size',
                'phone',
                'address',
                'city',
                'state',
                'country'
            ])
        );

        return response()->json(['message' => 'Profile updated']);
    }

    /**
     * UPDATE PASSWORD
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:6|confirmed'
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password incorrect'], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => 'Password updated']);
    }

    /**
     * UPDATE SETTINGS
     */
    public function updateSettings(Request $request)
    {
        $settings = UserSetting::firstOrCreate(['user_id' => Auth::id()]);

        $settings->update([
            'email_notifications' => $request->email_notifications,
            'sms_notifications'   => $request->sms_notifications
        ]);

        return response()->json(['message' => 'Settings updated']);
    }
}
