<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Payment;
class DashboardController extends Controller
{
    /**
     * CLIENT DASHBOARD SUMMARY
     */
    public function clientDashboard()
    {
        $clientId = Auth::id();

        $activeProjects = Project::where('client_id', $clientId)
            ->where('status', 'active')
            ->count();

        $completedProjects = Project::where('client_id', $clientId)
            ->where('status', 'completed')
            ->count();

        $inReviewProjects = Project::where('client_id', $clientId)
            ->where('status', 'in_review')
            ->count();

        $totalSpent = Payment::where('client_id', Auth::id())
            ->where('status', 'paid')
            ->sum('amount');

        // Pending actions = projects in review
        $pendingActions = $inReviewProjects;

        return response()->json([
            'stats' => [
                'active_projects'   => $activeProjects,
                'completed_projects'=> $completedProjects,
                'in_review_projects'=> $inReviewProjects,
                'pending_actions'   => $pendingActions,
                'total_spent'       => $totalSpent,
                'unread_messages'   => 0 // placeholder (Phase 4)
            ]
        ]);
    }

    public function projectStatusChart()
    {
        $clientId = Auth::id();

        $data = Project::select('status', DB::raw('COUNT(*) as total'))
            ->where('client_id', $clientId)
            ->groupBy('status')
            ->get();

        return response()->json($data);
    }

    public function spendingTrend()
    {
        $clientId = Auth::id();

        $data = Project::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->where('client_id', $clientId)
            ->where('status', 'completed')
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get();

        return response()->json($data);
    }

    public function recentProjects()
    {
        $projects = Project::with(['freelancer'])
            ->where('client_id', Auth::id())
            ->latest()
            ->limit(5)
            ->get();

        return response()->json($projects);
    }
}