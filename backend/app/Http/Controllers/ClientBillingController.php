<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Payment;
use App\Models\Project;
use Carbon\Carbon;

class ClientBillingController extends Controller
{
    /**
     * BILLING OVERVIEW (TOP CARDS)
     */
    public function overview()
    {
        $clientId = Auth::id();

        // Total spent (paid payments)
        $totalSpent = Payment::where('client_id', $clientId)
            ->where('status', 'paid')
            ->sum('amount');

        // This month spent
        $thisMonthSpent = Payment::where('client_id', $clientId)
            ->where('status', 'paid')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('amount');

        // Pending amount
        $pendingAmount = Payment::where('client_id', $clientId)
            ->where('status', 'pending')
            ->sum('amount');

        // Total paid projects
        $projectsPaid = Payment::where('client_id', $clientId)
            ->where('status', 'paid')
            ->distinct('project_id')
            ->count('project_id');

        return response()->json([
            'total_spent'       => $totalSpent,
            'this_month_spent'  => $thisMonthSpent,
            'pending_amount'    => $pendingAmount,
            'projects_paid'     => $projectsPaid
        ]);
    }

    /**
     * PAYMENTS LIST
     */
    public function payments()
    {
        $payments = Payment::with(['project', 'project.freelancer'])
            ->where('client_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($payments);
    }
}
