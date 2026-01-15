<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\Proposal;
use App\Models\Payment;
use App\Models\FreelancerProfile;
use App\Models\FreelancerSkill;
use App\Models\FreelancerLanguage;
use App\Models\FreelancerExperience;
use App\Models\FreelancerEducation;

class FreelancerDashboardController extends Controller
{
    public function overview()
    {
        $userId = Auth::id();

        // 💰 Total Earnings (PAID)
        $totalEarnings = Payment::where('freelancer_id', $userId)
            ->where('status', 'paid')
            ->sum('amount');

        // 💰 Available Balance (same for now)
        $availableBalance = $totalEarnings;

        // ⏳ Pending Earnings (active projects)
        $pendingEarnings = Project::where('freelancer_id', $userId)
            ->where('status', 'active')
            ->sum('budget');

        // 📂 Active Jobs
        $activeJobs = Project::where('freelancer_id', $userId)
            ->whereIn('status', ['active', 'on_hold'])
            ->count();

        // 📤 Proposals Sent
        $proposalsSent = Proposal::where('freelancer_id', $userId)->count();

        // ⭐ Average Rating (mock for now)
        $averageRating = 4.9;

        // 📊 Profile Completion
        $profileCompletion = $this->profileCompletion($userId);

        return response()->json([
            'total_earnings'     => $totalEarnings,
            'available_balance' => $availableBalance,
            'pending_earnings'  => $pendingEarnings,
            'active_jobs'       => $activeJobs,
            'proposals_sent'    => $proposalsSent,
            'average_rating'    => $averageRating,
            'profile_completion'=> $profileCompletion
        ]);
    }

    /**
     * Profile completion calculator
     */
    private function profileCompletion($userId)
    {
        $score = 0;
        $total = 6;

        if (FreelancerProfile::where('user_id', $userId)->exists()) $score++;
        if (FreelancerSkill::where('user_id', $userId)->exists()) $score++;
        if (FreelancerLanguage::where('user_id', $userId)->exists()) $score++;
        if (FreelancerExperience::where('user_id', $userId)->exists()) $score++;
        if (FreelancerEducation::where('user_id', $userId)->exists()) $score++;

        // profile photo (optional)
        // if (Auth::user()->avatar) $score++;

        return round(($score / $total) * 100);
    }
}
