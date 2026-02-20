<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\Message;
use App\Models\Payment;
use App\Models\Proposal;
use Carbon\Carbon;

class ClientDashboardController extends Controller
{
    public function index()
    {
        $clientId = Auth::id();

        // =====================
        // DASHBOARD COUNTS
        // =====================

        $activeProjects = Project::where('client_id', $clientId)
            ->where('status', 'active')
            ->count();

        $completedProjects = Project::where('client_id', $clientId)
            ->where('status', 'completed')
            ->count();

        $inReviewProjects = Project::where('client_id', $clientId)
            ->where('status', 'in_review')
            ->count();

        $pendingActions = 0;

        $unreadMessages = 0;

        $totalSpent = Project::where('client_id', $clientId)
            ->where('status', 'completed')
            ->sum('amount');

        // =====================
        // PROJECT STATUS CHART
        // =====================

        $projectStatus = Project::where('client_id', $clientId)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        // =====================
        // SPENDING TREND (6 MONTHS)
        // =====================

        $spendingTrend = Project::where('client_id', $clientId)
            ->where('status', 'completed')
            ->whereBetween('created_at', [
                Carbon::now()->subMonths(5)->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])
            ->selectRaw("CAST(strftime('%m', created_at) AS INTEGER) as month, SUM(amount) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'summary' => [
                'active_projects'    => $activeProjects,
                'completed_projects' => $completedProjects,
                'in_review_projects' => $inReviewProjects,
                'pending_actions'    => $pendingActions,
                'unread_messages'    => $unreadMessages,
                'total_spent'        => $totalSpent
            ],
            'charts' => [
                'project_status' => $projectStatus,
                'spending_trend' => $spendingTrend
            ]
        ]);
    }
}
 