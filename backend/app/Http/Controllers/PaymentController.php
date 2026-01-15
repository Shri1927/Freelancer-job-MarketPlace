<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ActivityLogger;

class PaymentController extends Controller
{
    /**
     * CLIENT → Make Payment (manual for now)
     */
    public function pay(Request $request, $projectId)
    {
        $project = Project::where('client_id', Auth::id())
            ->findOrFail($projectId);

        $request->validate([
            'amount' => 'required|numeric|min:1'
        ]);

        $payment = Payment::create([
            'project_id'     => $project->id,
            'client_id'      => Auth::id(),
            'freelancer_id'  => $project->freelancer_id,
            'amount'         => $request->amount,
            'currency'       => 'INR',
            'status'         => 'paid',
            'payment_method' => 'manual',
            'transaction_id' => uniqid('txn_')
        ]);

        // activity log
        ActivityLogger::log(
            Auth::id(),
            'payment_made',
            'Payment successful',
            '₹' . $request->amount . ' paid for project',
            $payment
        );

        return response()->json([
            'message' => 'Payment successful',
            'payment' => $payment
        ], 201);
    }

    /**
     * CLIENT → Payment history
     */
    public function clientPayments()
    {
        return response()->json(
            Payment::where('client_id', Auth::id())
                ->latest()
                ->get()
        );
    }

      public function earnings()
    {
        return Payment::where('freelancer_id', auth()->id())
            ->where('status', 'paid')
            ->latest()
            ->get();
    }
     public function totalEarnings()
    {
        return Payment::where('freelancer_id', auth()->id())
            ->where('status', 'paid')
            ->sum('amount');
    }

    /**
     * FREELANCER → Earnings
     */
    public function freelancerPayments()
    {
        return response()->json(
            Payment::where('freelancer_id', Auth::id())
                ->where('status', 'paid')
                ->latest()
                ->get()
        );
    }
}
