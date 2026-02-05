<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\Payment;
use Carbon\Carbon;

class ClientReportController extends Controller
{
    /**
     * REPORT SUMMARY
     */
    public function summary()
    {
        $clientId = Auth::id();

        $totalProjects = Project::where('client_id', $clientId)->count();

        $activeProjects = Project::where('client_id', $clientId)
            ->where('status', 'active')
            ->count();

        $completedProjects = Project::where('client_id', $clientId)
            ->where('status', 'completed')
            ->count();

        $cancelledProjects = Project::where('client_id', $clientId)
            ->whereIn('status', ['cancelled', 'on_hold'])
            ->count();

        $totalSpent = Payment::where('client_id', $clientId)
            ->where('status', 'paid')
            ->sum('amount');

        $averageProjectCost = Project::where('client_id', $clientId)
            ->whereNotNull('amount')
            ->avg('amount');

        return response()->json([
            'total_projects'        => $totalProjects,
            'active_projects'       => $activeProjects,
            'completed_projects'    => $completedProjects,
            'cancelled_projects'    => $cancelledProjects,
            'total_spent'           => $totalSpent,
            'average_project_cost'  => round($averageProjectCost, 2)
        ]);
    }

    /**
     * ANALYTICS DATA (CHARTS)
     */
    public function analytics()
    {
        $clientId = Auth::id();

        // Monthly spending (last 6 months)
        $monthlySpending = Payment::where('client_id', $clientId)
            ->where('status', 'paid')
            ->whereBetween('created_at', [
                Carbon::now()->subMonths(5)->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Project status distribution
        $projectStatus = Project::where('client_id', $clientId)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get();

        // Monthly project creation
        $monthlyProjects = Project::where('client_id', $clientId)
            ->whereBetween('created_at', [
                Carbon::now()->subMonths(5)->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'monthly_spending'   => $monthlySpending,
            'project_status'     => $projectStatus,
            'monthly_projects'   => $monthlyProjects
        ]);
    }
}
